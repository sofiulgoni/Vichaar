import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, ModalController  } from 'ionic-angular';

import { BookDetailsComponent } from '../book-details.component/book-details.component';
import { Book } from '../book.model/book.model';
import { Library } from '../../library.module/library.model/library.model';
import { BookService } from '../book.service/book.service';

@Component({
  selector: 'page-book-list',
  templateUrl: 'book-list.component.html'
})
export class BookListComponent implements OnInit{

  pageType  : any;
  key : any;
  pageTitle : any;
  bookList  : any[];
  category = false;
  surpriseBook = new Book();
  curated = false;
  curatedBooks : any;
  library : Library;
  
  constructor(private navCtrl: NavController, private navParams : NavParams, private modalController : ModalController, private bookService : BookService) {
    this.pageType = this.navParams.get('type');
    this.key       = this.navParams.get('key');
  }

  ngOnInit(){
    switch(this.pageType){
      case 'Category' : {
        this.showCategoryBooks(this.key);
      }break;
      case 'Links' : {
        this.showLinkBooks(this.key);
      }break;
      case 'Curated' : {
        this.showCuratedBooks(this.key);
      }break;
    }
  }

  private showLinkBooks(key){
    if(key != undefined){
      this.pageTitle = key;
      if(this.bookService.getLinkWiseBooks(key) != undefined){
        this.bookList = this.bookService.getLinkWiseBooks(key);
      }
    }else{
      this.pageTitle = "Books";
    }
  }

  private showCategoryBooks(key){
    this.pageTitle = this.getCategoryNameFromID(key);
    if(this.bookService.getCategoryWiseSurpriseBook(key) != undefined){
      this.category = true;
      this.surpriseBook = this.bookService.getCategoryWiseSurpriseBook(key);
    }
    if(this.bookService.getCategoryWiseBooks(key) != undefined){
      this.bookList = this.bookService.getCategoryWiseBooks(key);
    }
  }

  private showCuratedBooks(key){
    if(this.bookService.getCuratedListByID(key) != undefined){
      this.curatedBooks = this.bookService.getCuratedListByID(key);
      this.pageTitle = this.curatedBooks.name;
      if(this.bookService.getCuratedBooks(this.curatedBooks.books) != undefined){
        this.bookList = this.bookService.getCuratedBooks(this.curatedBooks.books);
        this.curated = true;
      }
    }else{
      this.pageTitle = "Books";
    }
  }

  public openBook(key){
    let bookDetail = this.modalController.create(BookDetailsComponent, {key : key});
    bookDetail.present();
    console.log(key);
  }

  public getAuthorNameFromID(key){
    if(this.bookService.getAuthorFromID(key) != undefined){
      return this.bookService.getAuthorFromID(key).name;
    }
  }

  private getCategoryNameFromID(key){
    if(this.bookService.getCategoryByKey(key) != undefined){
      return this.bookService.getCategoryByKey(key).name;
    }else{
      return "Books";
    }
  }

  public addBookToLibrary(event, book){
    event.stopPropagation();
    this.library = new Library();
    this.library.id = book.$key;
    this.library.media = book.media;
    this.library.page = 0;
    this.library.progress = 1;
    this.bookService.addLibraryBook(this.library);
  }

  public getLibraryStatus(key){
    if(this.bookService.getLibraryStatus(key) != undefined){
      return this.bookService.getLibraryStatus(key) ? true : false;
    }
  }

}
