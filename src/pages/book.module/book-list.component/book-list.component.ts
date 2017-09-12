import { Component, OnInit } from '@angular/core';
import { ViewController, NavParams, ModalController } from 'ionic-angular';

import { BookDetailsComponent } from '../book-details.component/book-details.component';
import { SubscriptionComponent } from '../../subscription.module/subscription.component/subscription.component';
import { User } from '../../auth.module/user.model/user.model';
import { Book } from '../book.model/book.model';
import { Library } from '../../library.module/library.model/library.model';
import { BookService } from '../book.service/book.service';

@Component({
  selector: 'page-book-list',
  templateUrl: 'book-list.component.html'
})
export class BookListComponent implements OnInit{

  userData = new User();
  pageType  : any;
  key : any;
  pageTitle : any;
  bookList  : any[];
  category = false;
  surpriseBook = new Book();
  curated = false;
  curatedBooks : any;
  library : Library;
  
  constructor(private viewCtrl: ViewController, private navParams : NavParams, private modalCtrl : ModalController, private bookService : BookService) {
    this.pageType = this.navParams.get('type');
    this.key       = this.navParams.get('key');
  }

  ngOnInit(){
    if(this.bookService.getUserData() != undefined){
      this.userData = this.bookService.getUserData();
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
    let bookDetail = this.modalCtrl.create(BookDetailsComponent, {key : key});
    bookDetail.present();
    console.log(key);
  }

  public closeBookList(){
    this.viewCtrl.dismiss();
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
    if(this.userData.membership.status == 1){
      this.bookService.updateUserBookCount(this.userData);
      this.library = new Library();
      this.library.id = book.$key;
      this.library.media = book.media;
      this.library.page = 0;
      this.library.progress = 1;
      this.bookService.addLibraryBook(this.library);
    }else{
      let upgradeModal = this.modalCtrl.create(SubscriptionComponent);
      upgradeModal.onDidDismiss(data => {
        if(data != null){
          this.userData = data;
        }
      });
      upgradeModal.present();
    }
  }

  public getLibraryStatus(key){
    if(this.bookService.getLibraryStatus(key) != undefined){
      return this.bookService.getLibraryStatus(key) ? true : false;
    }
  }

}
