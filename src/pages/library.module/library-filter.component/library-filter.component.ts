import { Component } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-library-filter',
  templateUrl: 'library-filter.component.html'
})
export class LibraryFilterComponent {

  notStarted = true;
  inProgress = true;
  isFinished = true;
  noAudio    = false;
  noVideo    = false;

  filterData = {notStarted : 1, inProgress : 2, isFinished : 3, hasAudio : 2, hasVideo : 3, hasText : 1};

  constructor(private viewCtrl: ViewController, private navParams : NavParams) {
    this.filterData = navParams.get('filterData');
    this.setFilterData();
  }

  private setFilterData(){
    if(this.filterData.notStarted == 1){
      this.notStarted = true;
    }else{
      this.notStarted = false;
    }
    if(this.filterData.inProgress == 2){
      this.inProgress = true;
    }else{
      this.inProgress = false;
    }
    if(this.filterData.isFinished == 3){
      this.isFinished = true;
    }else{
      this.isFinished = false;
    }
    if(this.filterData.hasAudio == 0){
      this.noAudio = true;
    }else{
      this.noAudio = false;
    }
    if(this.filterData.hasVideo == 0){
      this.noVideo = true;
    }else{
      this.noVideo = false;
    }
  }

  public onMediaChange(){
    if(this.noAudio){
      this.noVideo = true;
    }
  }

  public saveFilter(){
    this.filterData.notStarted = this.notStarted ? 1 : 0;
    this.filterData.inProgress = this.inProgress ? 2 : 0;
    this.filterData.isFinished = this.isFinished ? 3 : 0;
    this.filterData.hasAudio   = this.noAudio ? 0 : 2;
    this.filterData.hasVideo   = this.noVideo ? 0 : 3;
    this.viewCtrl.dismiss(this.filterData);
  }

}
