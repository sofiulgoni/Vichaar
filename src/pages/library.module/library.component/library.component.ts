import { Component, OnInit } from '@angular/core';
import { NavController, Events, PopoverController, ModalController  } from 'ionic-angular';

import { TagAddComponent } from '../tag-add.component/tag-add.component';
import { BookDetailsComponent } from '../../book.module/book-details.component/book-details.component';
import { LibraryFilterComponent } from '../library-filter.component/library-filter.component';
import { TagListComponent } from '../tag-list.component/tag-list.component';
import { LibraryService } from '../library.service/library.service';
import { ActionSheetComponent } from '../../common.module/action-sheet.component/action-sheet.component';

@Component({
  selector: 'page-library',
  templateUrl: 'library.component.html'
})
export class LibraryComponent implements OnInit{

  bookList : any[];
  filterData = {notStarted : 1, inProgress : 2, isFinished : 3, hasAudio : 2, hasVideo : 3, hasText : 1};

  constructor(private navCtrl: NavController, private popoverCtrl: PopoverController, private modalCtrl : ModalController, 
              private actionSheet : ActionSheetComponent, private libraryService : LibraryService, private event : Events) {

  }

  ngOnInit(){
    this.loadData();
    this.event.subscribe('Data : Loaded', (data) => {
      console.log("Library Event Received");
      this.loadData();
    });
  }

  private loadData(){
    if(this.libraryService.getLibraryBooks() != undefined){
      this.bookList = this.libraryService.getLibraryBooks();
    }
  }

  public openTagList(){
    this.navCtrl.push(TagListComponent);
  }
  
  public filterList(event){
    let popover = this.popoverCtrl.create(LibraryFilterComponent, {filterData : this.filterData});
    popover.present({
      ev: event
    });

    popover.onDidDismiss((filterData) => {
      if(filterData != null){
        this.bookList = this.libraryService.getFilteredLibraryList(filterData);
        this.filterData = filterData;
      }
    })
  }

  public openBook(key){
    let bookDetail = this.modalCtrl.create(BookDetailsComponent, {key : key});
    bookDetail.present();
  }

  public getAuthorNameFromID(key){
    if(this.libraryService.getAuthorFromID(key) != undefined){
      return this.libraryService.getAuthorFromID(key).name;
    }
  }

  public showActionSheet(event, key){
    event.stopPropagation();
    this.actionSheet.showActionSheet(key, (title) => {
      this.navCtrl.push(TagAddComponent, { key : key, title : title});
    });
  }

}
