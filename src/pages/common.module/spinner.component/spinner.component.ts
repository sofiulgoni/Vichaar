import { Injectable } from '@angular/core';
import { LoadingController } from 'ionic-angular';

@Injectable()
export class SpinnerComponent {
  public spinner = null;
  constructor( private loadingController : LoadingController) {
    
  }
  public showSpinner(){
    this.spinner = this.loadingController.create({
      content: 'Loading...'
    });
    this.spinner.present();
  }
  public hideSpinner(){
    this.spinner.dismiss();
  }
}
