import { Component, OnInit } from '@angular/core';
import { NavController, Events, ModalController } from 'ionic-angular';

import { SettingsComponent } from '../settings.component/settings.component';
import { BookDetailsComponent } from '../../book.module/book-details.component/book-details.component';
import { User } from '../../auth.module/user.model/user.model';
import { ProfileService } from '../profile.service/profile.service';

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.component.html'
})
export class ProfileComponent implements OnInit{

  userData = new User();
  favouriteBookList : any[];
  highlightBookList : any[];
  listType = 0;
  
  constructor(public navCtrl: NavController, private profileService : ProfileService, private event : Events, private modalController : ModalController) {
    
  }

  ngOnInit(){
    this.loadData();
    this.event.subscribe('Data : Loaded', (data) => {
      console.log("Profile Event Received");
      this.loadData();
    });
  }

  private loadData(){
    if(this.profileService.getUserData() != undefined){
      this.userData = this.profileService.getUserData();
    }
    if(this.profileService.getFavouriteBookList() != undefined){
      this.favouriteBookList = this.profileService.getFavouriteBookList();
    }
    if(this.profileService.getHighlightBookList() != undefined){
      this.highlightBookList = this.profileService.getHighlightBookList();
    }
  }

  public getMembership(){
    if(this.userData != undefined){
      return this.userData.membership + " member";
    }else{
      return "";
    }
  }

  public openProfileSettings(){
    this.navCtrl.push(SettingsComponent);
  }

  public showBookList(type){
    this.listType = type;
  }

  public openBook(key){
    let bookDetail = this.modalController.create(BookDetailsComponent, {key : key});
    bookDetail.present();
  }

  public getFavouriteListSize(){
    if(this.favouriteBookList != undefined){
      return this.favouriteBookList.length;
    }else{
      return 0;
    }
  }

  public getHighlightListSize(){
    if(this.highlightBookList != undefined){
      return this.highlightBookList.length;
    }else{
      return 0;
    }
  }

  public getAuthorNameByKey(key){
    if(this.profileService.getAuthorByKey(key) != undefined){
      return this.profileService.getAuthorByKey(key).name;
    }else{
      return "";
    }
  }

  public removeFromFavourite(event, key){
    event.stopPropagation();
    this.profileService.removeFromFavourite(key);
  }

}
