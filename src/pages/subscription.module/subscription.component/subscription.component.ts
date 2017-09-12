import { Component, OnInit } from '@angular/core';
import { ViewController } from 'ionic-angular';

import { SubscriptionService } from '../subscription.service/subscription.service';
import { SpinnerComponent } from '../../common.module/spinner.component/spinner.component';

@Component({
  selector: 'page-subscription',
  templateUrl: 'subscription.component.html'
})
export class SubscriptionComponent implements OnInit{

  subscriptionType = "Basic";
  durationType     = "Monthly";
  coverImage       = "assets/icon/basic.png";
  premiumMonthly = true;
  premiumYearly  = false;

  constructor(private viewCtrl : ViewController, private subscriptionService : SubscriptionService, private spinner : SpinnerComponent) {

  }
  ngOnInit(){
    this.spinner.showSpinner();
    this.subscriptionService.getInAppProducts().then(products => {
      console.log(products);     
      this.spinner.hideSpinner();
      this.showSubscriptionType('Basic');
    }).catch(error => {
      console.log(error.toString());
      this.spinner.hideSpinner();
      this.viewCtrl.dismiss(null);
    });
    
  }

  public showSubscriptionType(type){
    if(type == 'Basic'){
      this.subscriptionType = "Basic";
      this.coverImage = "assets/icon/basic.png";
      this.durationType = "Monthly";
    }else{
      this.subscriptionType = "Premium";
      this.coverImage = "assets/icon/premium.png";
      if(this.premiumMonthly == true){ 
        this.durationType = "Monthly";
      }else{
        this.durationType = "Yearly";
      } 
    }
  }
  
  public selectPremiumType(type){  
    if(type == 'Monthly' ){
      if(this.premiumMonthly == true){ 
        this.premiumYearly = false;
        this.durationType  = "Monthly";
      }else{
        this.premiumYearly = true;
        this.durationType  = "Yearly";
      } 
    }else{
      if(this.premiumYearly  == true){ 
        this.premiumMonthly  = false;
        this.durationType     = "Yearly";
      }else{
        this.premiumMonthly  = true;
        this.durationType     = "Monthly";
      } 
    }
  }

  public upgradeSubscription(){
    if(this.subscriptionType == 'Basic'){
       this.spinner.showSpinner();
       this.subscriptionService.addSubscriptionBasicMonthly().then(user => {
         this.spinner.hideSpinner();
         this.viewCtrl.dismiss(user);
       });
    }else{
      if(this.durationType == 'Monthly'){
        this.spinner.showSpinner();
        this.subscriptionService.addSubscriptionPremiumMonthly().then(user => {
          this.spinner.hideSpinner();
          this.viewCtrl.dismiss(user);
        });
      }else{
        this.spinner.showSpinner();
        this.subscriptionService.addSubscriptionPremiumYearly().then(user => {
          this.spinner.hideSpinner();
          this.viewCtrl.dismiss(user);
        });
      }
    }
  }
 
  public closeSubscription(){
    this.viewCtrl.dismiss(null);
  }

}
