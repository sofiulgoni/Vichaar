import { Component, OnInit } from '@angular/core';
import { NavController, Events, ModalController } from 'ionic-angular';
import { DomSanitizer } from '@angular/platform-browser';

import { CategoryListComponent } from '../category-list.component/category-list.component';
import { BookListComponent } from '../../book.module/book-list.component/book-list.component';
import { CuratedListComponent } from '../../book.module/curated-list.component/curated-list.component';
import { BookDetailsComponent } from '../../book.module/book-details.component/book-details.component';
import { User } from '../../auth.module/user.model/user.model';
import { Book } from '../../book.module/book.model/book.model';
import { Library } from '../../library.module/library.model/library.model';
import { HomeService } from '../home.service/home.service';


@Component({
  selector: 'page-home',
  templateUrl: 'home.component.html'
})
export class HomeComponent implements OnInit{

  search = false;
  userData = new User();
  dailyFreeBook = new Book();
  trendingBookList : any[];
  newBookList : any[];
  curatedBookList : any[];
  forYouBookList : any[];
  searchBookList : any[];
  library : Library;
  freeBookImage : any;

  constructor(public navCtrl: NavController, private modalController : ModalController, private sanitizer : DomSanitizer, 
              private homeService : HomeService, private event : Events) {
    
  }

  ngOnInit(){
    this.loadData();
    this.event.subscribe('Data : Loaded', (data) => {
      console.log("Home Event Received");
      this.loadData();
    });
  }

  private loadData(){
    if(this.homeService.getUserData() != undefined){
      this.userData = this.homeService.getUserData();
    }
    if(this.homeService.getFreeDailyBook() != undefined){
      this.dailyFreeBook    = this.homeService.getFreeDailyBook();
      this.freeBookImage = this.sanitizer.bypassSecurityTrustStyle('url('+this.dailyFreeBook.image+')');
    }
    if(this.homeService.getTrendingList() != undefined){
      this.trendingBookList    = this.homeService.getTrendingList();
    }
    if(this.homeService.getNewList() != undefined){
      this.newBookList    = this.homeService.getNewList();
    }
    if(this.homeService.getCuratedList() != undefined){
      this.curatedBookList    = this.homeService.getCuratedList();
    }
    if(this.homeService.getForYouList() != undefined){
      this.forYouBookList    = this.homeService.getForYouList();
    }
  }

  public getAuthorNameFromID(key){
    if(this.homeService.getAuthorFromID(key) != undefined){
      return this.homeService.getAuthorFromID(key).name;
    }
  }

  public selectCategory(){
    let categoryList = this.modalController.create(CategoryListComponent);
      categoryList.present();
  }

  public openBook(key){
    let bookDetail = this.modalController.create(BookDetailsComponent, {key : key});
    bookDetail.present();
  }

  public addBookToLibrary(event, key){
    event.stopPropagation();
    if(this.userData.membership == 'Trial'){
      this.library = new Library();
      this.library.id = key;
      this.library.page = 0;
      this.library.progress = 1;
      this.homeService.addLibraryBook(this.library);
    }else{
      // Display Upgrade Page
      console.log("Please Update Your Subscription");
    }
  }
  

  public searchBooks(){
    this.search = true;
  }

  public onSearchInput(event){
    let bookName = event.target.value;
    if (bookName && bookName.trim() != '') {
      this.searchBookList = this.homeService.getSearchBookList(bookName);
    }

  }
  public onSearchCancel(event){
    this.search = false;
  }
  public onSearchClear(event){
    this.searchBookList = [];
  }

  public showBookList(key){
    this.navCtrl.push(BookListComponent, {type : "Links", key : key});
  }

  public showCuratedBookList(key){
    this.navCtrl.push(BookListComponent, {type : "Curated", key : key});
  }
  public showCuratedList(){
    this.navCtrl.push(CuratedListComponent);
  }

  public getLibraryStatus(key){
    if(this.homeService.getLibraryStatus(key) != undefined){
      return this.homeService.getLibraryStatus(key) ? true : false;
    }
  }
  
}
