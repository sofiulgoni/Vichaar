import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';

import { TagDetailsComponent } from '../tag-details.component/tag-details.component';
import { LibraryService } from '../library.service/library.service';

@Component({
  selector: 'page-tag-list',
  templateUrl: 'tag-list.component.html'
})
export class TagListComponent implements OnInit{
  
  tagList : any;

  constructor(private navCtrl: NavController, private libraryService : LibraryService) {

  }

  ngOnInit(){
    this.loadData();
  }

  private loadData(){
    if(this.libraryService.getTagList() != undefined){
      this.tagList = this.libraryService.getTagList();
    }
  }

  public getBookCount(books){
    if(books != undefined){
      if(books.length > 1){
        return books.length+" Books";
      }else{
        return books.length+" Book";
      }
    }else{
      return "Empty";
    }
  }

  public openTagDetails(key){
    this.navCtrl.push(TagDetailsComponent,{key : key, callBack : (key) => {
      this.libraryService.removeTag(key);
      this.loadData();
    }});
  }

  public removeTag(event, key){
    event.stopPropagation();
    this.libraryService.removeTag(key);
    this.loadData();
  }

}
