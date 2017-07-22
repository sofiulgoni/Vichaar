import { Component, OnInit } from '@angular/core';
import { NavController, ViewController } from 'ionic-angular';

import { BookListComponent } from '../../book.module/book-list.component/book-list.component';
import { HomeService } from '../home.service/home.service';

@Component({
  selector: 'page-category-list',
  templateUrl: 'category-list.component.html'
})
export class CategoryListComponent implements OnInit{

  categoryList : any[];

  constructor(public navCtrl: NavController, private viewCtrl : ViewController, private homeService : HomeService) {

  }
  ngOnInit(){
    this.categoryList = this.homeService.getCategoryList();
  }

  public openCategoryWiseBookList(key){
    this.navCtrl.push(BookListComponent, {type : "Category", key : key});
    console.log(key);
  }

  public closeCategoryList(){
    this.viewCtrl.dismiss();
  }

}
