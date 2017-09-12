import { Component, OnInit } from '@angular/core';
import { NavController, ViewController, } from 'ionic-angular';

import { User } from '../user.model/user.model';
import { AuthService } from '../auth.service/auth.service';
import { TabComponent } from '../../../pages/tab.module/tab.component/tab.component';
import { SpinnerComponent } from '../../common.module/spinner.component/spinner.component';

@Component({
  selector: 'page-user-category',
  templateUrl: 'user-category.component.html'
})
export class UserCategoryComponent implements OnInit{

  user = new User();
  categoryList = [];
  languageList = [];
  userCategory = [];
  currentDate : any;

  constructor(private navCtrl: NavController, private viewCtrl : ViewController, private auth : AuthService, private spinner : SpinnerComponent) {
    
  }

  ngOnInit(){
    this.spinner.showSpinner();
    this.auth.getStaticCategoryList().then(categoryListData => {
      if(categoryListData != undefined){
        this.categoryList = this.getCheckedList(categoryListData);
      }
      this.auth.getStaticLanguageList().then(languageListData => {
        if(languageListData != undefined){
          this.languageList = languageListData;
        }
        this.auth.getDate().then(date => {
          this.spinner.hideSpinner();
          this.currentDate = date;
        }).catch(error => {
          this.spinner.hideSpinner();
          console.log(error.message);
        });
      }).catch(error => {
        this.spinner.hideSpinner();
        console.log(error.message);
      });
    }).catch(error => {
      this.spinner.hideSpinner();
      console.log(error.message);
    });
  }

  public checkChanged(category){
    if(this.checkCategoryList(category.$key) != undefined){
      this.userCategory.splice(this.userCategory.indexOf(category), 1);
    }else{
      if(this.userCategory.length == 3){
        if(category.checked == true){
          var item = this.userCategory[2];
          this.userCategory.pop();
          this.userCategory.push(category);
          this.categoryList[this.categoryList.indexOf(item)].checked = false;
        }
      }else{
        this.userCategory.push(category);
      }
    }
  }

  public saveUserCategory(){
    this.spinner.showSpinner();
    this.user.email = this.auth.getRedirectResult().email;
    this.user.language = this.getLanguageKey("English");
    this.user.category = this.getUserCategory();
    this.user.membership = this.getUserMembership();
    this.auth.addUser(this.user, this.auth.getRedirectResult().uid).then(success => {
      console.log("User Added");
      this.spinner.hideSpinner();
      this.auth.startDataObserver(this.auth.getRedirectResult().uid);
      this.navCtrl.setRoot(TabComponent);
    }).catch(error => {
      console.log("User Add Failed "+error.message);
      this.spinner.hideSpinner();
    });
  }

  private getCheckedList(list){
    var dataList = [];
    if(list.length>0){
      for(var i = 0; i < list.length; i++){
        list[i].checked = false;
        dataList.push(list[i]);
      }
    }
    return dataList;
  }

  private checkCategoryList(id){
    return this.userCategory.find(category => category.$key == id);
  }

  private getUserCategory(){
    var category = {categoryOne : "", categoryTwo : "", categoryThree : ""};
    category.categoryOne = this.userCategory[0].$key;
    category.categoryTwo = this.userCategory[1].$key;
    category.categoryThree = this.userCategory[2].$key;
    return category;
  }

  private getLanguageKey(name){
    return this.languageList.find(language => language.name == name).$key;
  }

  private getUserMembership(){
    return {id : 1, name : "Trial", startDate : this.currentDate, endDate : this.currentDate, bookLeft : 1, status : 1};
  }

}
