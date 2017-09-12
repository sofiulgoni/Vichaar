import { Component, OnInit } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-title-list',
  templateUrl: 'title-list.component.html'
})
export class TitleListComponent implements OnInit{

  contentIndex = 0;
  contentList  : any[];
  
  constructor(private viewCtrl: ViewController, private navParams : NavParams) {
    
  }

  ngOnInit(){
    this.contentIndex = this.navParams.get("contentIndex");
    this.contentList  = this.navParams.get("contentList");
  }

  public openPage(index){
    this.viewCtrl.dismiss();
    this.navParams.get('openPage')(index);
  }

  public closeTitleList(){
    this.viewCtrl.dismiss();
    this.navParams.get('openPage')(null);
  }

}
