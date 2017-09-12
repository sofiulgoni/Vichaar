import { Component, OnInit  } from '@angular/core';
import { NavParams, ViewController, ModalController } from 'ionic-angular';

import { BookService } from '../book.service/book.service';
import { BookTextComponent } from '../book-text.component/book-text.component';
import { SubscriptionComponent } from '../../subscription.module/subscription.component/subscription.component';
import { User } from '../../auth.module/user.model/user.model';
import { Book } from '../book.model/book.model';
import { Library } from '../../library.module/library.model/library.model';

@Component({
  selector: 'page-book-details',
  templateUrl: 'book-details.component.html'
})
export class BookDetailsComponent implements OnInit{

  key : any;
  userData = new User();
  book = new Book();
  libraryStatus = false;
  library : any;
  readStatus = false;
  
  constructor(private viewCtrl : ViewController, private navParams : NavParams, private modalCtrl: ModalController,
              private bookService : BookService) {
    this.key = this.navParams.get('key');
  }

  ngOnInit(){
    if(this.bookService.getBookDetailsByID(this.key) != undefined){
      this.book = this.bookService.getBookDetailsByID(this.key);
    }
    if(this.bookService.getUserData() != undefined){
      this.userData = this.bookService.getUserData();
      if(this.userData.membership.status == 1){
        this.readStatus = true;
      }
    }
    if(this.bookService.getLibraryStatus(this.key) != undefined){
      this.libraryStatus = true;
      this.readStatus    = true;
    }
  }

  public addBookToLibrary(book){
    if(this.userData.membership.status == 1){
      this.bookService.updateUserBookCount(this.userData);
      this.library = new Library();
      this.library.id = this.key;
      this.library.media = book.media;
      this.library.page = 0;
      this.library.progress = 1;
      this.bookService.addLibraryBook(this.library);
      this.libraryStatus = true;
    }
  }

  public closeBookDetails(){
    this.viewCtrl.dismiss();
  }

  public getAuthorNameFromID(key){
    if(this.bookService.getAuthorFromID(key) != undefined){
      return this.bookService.getAuthorFromID(key).name;
    }
  }

  public getAuthorAboutFromID(key){
    if(this.bookService.getAuthorFromID(key) != undefined){
      return this.bookService.getAuthorFromID(key).about;
    }
  }

  public openBookTextPage(book){
    this.bookService.updateUserBookCount(this.userData);
    if(this.libraryStatus == false){
      this.library = new Library();
      this.library.id = this.key;
      this.library.page = 1;
      this.library.media = book.media;
      this.library.progress = 2;
      this.bookService.addLibraryBook(this.library);
      console.log("Book added to library");
    }
    book.hits = book.hits+1;
    this.bookService.updateBookHits(book);
    let bookTextModal = this.modalCtrl.create(BookTextComponent, {key : this.key, closeModal : (data) => {
      this.viewCtrl.dismiss();
    }});
    bookTextModal.present();
  }

  public openUpgradePage(){
    let upgradeModal = this.modalCtrl.create(SubscriptionComponent);
    upgradeModal.onDidDismiss(data => { 
      if(data != null){
        this.userData = data;
        this.readStatus = true;
      }
    });
    upgradeModal.present();
  }

}
