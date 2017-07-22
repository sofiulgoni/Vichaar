import { Component } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';


@Component({
  selector: 'page-text-settings',
  templateUrl: 'text-settings.component.html'
})
export class TextSettingsComponent{

  fontSize = 20;
  color = false;
  left = true;
  right = false;
  
  constructor(public viewController: ViewController, private navParams : NavParams) {
    this.fontSize = navParams.get('fontSize');
    this.color    = navParams.get('color');
    if(this.color){
      this.left  = false;
      this.right = true;
    }
  }

  public fontChange(){
    this.changeSettings(this.color, this.fontSize);
  }

  public leftButtonClicked(){
    this.color = false;
    this.left  = true;
    this.right = false;
    this.changeSettings(this.color, this.fontSize);
  }

  public rightButtonClicked(){
    this.color = true;
    this.left  = false;
    this.right = true;
    this.changeSettings(this.color, this.fontSize);
  }

  private changeSettings(color, fontSize){
    return this.navParams.get('changeSettings')(color, fontSize);
  }

}
