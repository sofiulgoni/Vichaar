import { Component, ViewChild, OnInit  } from '@angular/core';
import { ModalController, ViewController, NavParams, PopoverController } from 'ionic-angular';
import { DomSanitizer } from '@angular/platform-browser';
import { StreamingMedia, StreamingVideoOptions, StreamingAudioOptions } from '@ionic-native/streaming-media';

import { BookService } from '../book.service/book.service';
import { TitleListComponent } from '../title-list.component/title-list.component';
import { TextSettingsComponent } from '../text-settings.component/text-settings.component';

@Component({
  selector: 'page-book-text',
  templateUrl: 'book-text.component.html'
})
export class BookTextComponent implements OnInit{

  @ViewChild('content') content;
  @ViewChild('slides') slides;

  header = true;
  library : any;
  key : any;
  color = false;
  textButtonColor = "black";
  book : any;
  contentList : any[];
  fontSize = 20;

  constructor(private modalCtrl: ModalController, private viewCtrl : ViewController, private navParams : NavParams, private streamingMedia : StreamingMedia,
              private popoverCtrl: PopoverController, private bookService : BookService, private sanitizer : DomSanitizer) {
    this.key = navParams.get('key');
  }

  ngOnInit(){
    if(this.bookService.getBookDetailsByID(this.key) != undefined){
      this.book = this.bookService.getBookDetailsByID(this.key);
      this.contentList = this.book.content;
    }
    if(this.bookService.getLibraryStatus(this.key) != undefined){
      this.library = this.bookService.getLibraryStatus(this.key);
      if(this.library.page > 0){
        //this.slides.slideTo(this.library.page-1);
      }else{
        this.library.page = 1;
        this.library.progress = 2;
        this.bookService.updateLibraryBook(this.library);
      }
    }
  }

  public changeHeader(){
    if(this.header){
      this.header = false;
    }else{
      this.header = true;
    }
    this.content.resize();
  }

  public openTextSettings(event){
    this.textButtonColor = "danger";
    let popover = this.popoverCtrl.create(TextSettingsComponent, {color:this.color, fontSize:this.fontSize, changeSettings:(color, fontSize) => {
      this.color    = color;
      this.fontSize = fontSize;
    }});
    popover.present({ev:event});

    popover.onDidDismiss(() => {
      if(this.color){
        this.textButtonColor = "white";
      }else{
        this.textButtonColor = "black";
      }
    });
  }

  public openTitleList(){
    let titleListModal = this.modalCtrl.create(TitleListComponent, {contentIndex: this.slides.getActiveIndex()+1, contentList : this.contentList, openPage : (index) => {
      if(index != null){
        this.slides.slideTo(index-1);
      }
    }});
    titleListModal.present();
  }

  public openAudioPlayer(){
    let options: StreamingAudioOptions = {
      bgImage: this.book.image,
      successCallback: () => { console.log('Audio Played') },
      errorCallback: (e) => { console.log('Error Audio Streaming') }
    };
    this.streamingMedia.playAudio(this.contentList[this.slides.getActiveIndex()].audio, options);
  }

  public openVideoPlayer(){
    let options: StreamingVideoOptions = {
      successCallback: () => { console.log('Video Played') },
      errorCallback: (e) => { console.log('Error Video Streaming') }
    };
    this.streamingMedia.playVideo(this.contentList[this.slides.getActiveIndex()].video, options);
  }

  public closeBookText(){
    this.navParams.get('closeModal')(true);
    this.viewCtrl.dismiss();
  }

  public getHeaderFontSize(){
    var fontSize = this.fontSize+10;
    return this.sanitizer.bypassSecurityTrustStyle(fontSize+'px');
  }

  public getFontSize(){
    return this.sanitizer.bypassSecurityTrustStyle(this.fontSize+'px');
  }

  public slideChanged(){
    if(this.slides.getActiveIndex()+1 == this.contentList.length){
      this.library.page     = this.slides.getActiveIndex()+1;
      this.library.progress = 3;
    }else{
      this.library.page     = this.slides.getActiveIndex()+1;
    }
    this.bookService.updateLibraryBook(this.library);
  }

}
