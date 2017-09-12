import { Component, OnInit } from '@angular/core';
import { ModalController, ViewController } from 'ionic-angular';

import { BookListComponent } from '../../book.module/book-list.component/book-list.component';
import { HomeService } from '../home.service/home.service';

@Component({
  selector: 'page-category-list',
  templateUrl: 'category-list.component.html'
})
export class CategoryListComponent implements OnInit{

  categoryList : any[];

  constructor(public modalCtrl: ModalController, private viewCtrl : ViewController, private homeService : HomeService) {

  }
  ngOnInit(){
    this.categoryList = this.homeService.getCategoryList();
  }

  public openCategoryWiseBookList(key){
    console.log(key);
    let bookListModal = this.modalCtrl.create(BookListComponent, {type : "Category", key : key});
    bookListModal.present();
  }

  public closeCategoryList(){
    this.viewCtrl.dismiss();
  }

}
