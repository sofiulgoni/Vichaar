import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-title-list',
  templateUrl: 'title-list.component.html'
})
export class TitleListComponent implements OnInit{

  contentIndex = 0;
  contentList  : any[];
  
  constructor(private navCtrl: NavController, private navParams : NavParams) {
    
  }

  ngOnInit(){
    this.contentIndex = this.navParams.get("contentIndex");
    this.contentList  = this.navParams.get("contentList");
  }

  public openPage(index){
    this.navCtrl.pop();
    this.navParams.get('openPage')(index);
  }

}
