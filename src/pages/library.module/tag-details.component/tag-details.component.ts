import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';

import { LibraryService } from '../library.service/library.service';
import { BookDetailsComponent } from '../../book.module/book-details.component/book-details.component';

@Component({
  selector: 'page-tag-details',
  templateUrl: 'tag-details.component.html'
})
export class TagDetailsComponent implements OnInit {

  key : any;
  tag : any;
  bookList : any[];

  constructor(private navCtrl: NavController, private navParams: NavParams, private libraryService : LibraryService, private modalController : ModalController) {
    this.key = this.navParams.get('key');
  }
 
  ngOnInit(){
    this.loadData();
  }

  private loadData(){
    if(this.libraryService.getTagByKey(this.key) != undefined){
      this.tag = this.libraryService.getTagByKey(this.key);
      if(this.libraryService.getTagBooks(this.tag.books) != undefined){
        this.bookList = this.libraryService.getTagBooks(this.tag.books);
      }
    }
  }

  public getAuthorNameFromID(key){
    if(this.libraryService.getAuthorFromID(key) != undefined){
      return this.libraryService.getAuthorFromID(key).name;
    }
  }

  public openBook(key){
    let bookDetail = this.modalController.create(BookDetailsComponent, {key : key});
    bookDetail.present();
  }

  public updateTag(){
    if(this.tag.name != undefined && this.tag.name != ""){
      this.libraryService.updateTag(this.tag);
      this.loadData();
    }
  }

  public removeBookFromTag(event, key){
    event.stopPropagation();
    this.tag.books.splice(this.tag.books.indexOf(key),1);
    if(this.tag.books.length > 0){
      this.libraryService.updateTag(this.tag);
      this.loadData();
    }else{
      this.navCtrl.pop();
      this.navParams.get('callBack')(this.tag.$key);
    }
  }

}
