import { Component, ViewChild, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Tag } from '../tag.model/tag.model';
import { LibraryService } from '../library.service/library.service';

@Component({
  selector: 'page-tag-add',
  templateUrl: 'tag-add.component.html'
})
export class TagAddComponent implements OnInit{
  
  @ViewChild('slidingItem') slidingItem;

  title = "Tag";
  key : any;
  newTag = new Tag();
  bookTags : any[];
  tagList : any[];

  constructor(private navCtrl: NavController, private navParams : NavParams, private libraryService : LibraryService) {
    this.key = this.navParams.get('key');
    this.title = this.navParams.get('title');
  }

  ngOnInit(){
    this.loadData();
  }

  private loadData(){
    if(this.libraryService.getBookTags(this.key) != undefined){
      this.bookTags = this.libraryService.getBookTags(this.key);
    }
    if(this.libraryService.getTagList() != undefined){
      this.tagList = this.libraryService.getTagList();
    }
  }

  public addNewTag(){
    if(this.newTag.name != undefined && this.newTag.name != ""){
      this.newTag.books = [];
      this.newTag.books.push(this.key);
      this.libraryService.addTag(this.newTag);
      this.newTag = new Tag();
      this.loadData();
    }
  }

  public removeTagFromBook(key){
    var tag = this.libraryService.getTagByKey(key);
    tag.books.splice(tag.books.indexOf(this.key), 1);
    if(tag.books.length > 0){
      this.libraryService.updateTag(tag);
    }else{
      this.libraryService.removeTag(key);
    }
    this.loadData();
  }

  public selectTag(key){
    if(this.bookTags.find(tag => tag.$key == key) == undefined){
      var tag = this.libraryService.getTagByKey(key);
      tag.books.push(this.key);
      this.libraryService.updateTag(tag);
      this.loadData();
    }
  }

}
