import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { InAppPurchase } from '@ionic-native/in-app-purchase';

import { SharedDataService } from '../../common.module/shared-data.service/shared-data.service';


@Injectable()
export class SubscriptionService {

    productList = ["com.msgj.gistist.basicmonthly", "com.msgj.gistist.premiummonthly", "com.msgj.gistist.premiumyearly"];

    constructor(private platform : Platform, private sharedService : SharedDataService, private purchase : InAppPurchase){
       
    }

    public getInAppProducts(){
        return this.purchase.getProducts(this.productList);
    } 

    public addSubscriptionBasicMonthly(){
        return new Promise(resolve => {
            this.addSubscription(this.productList[0]).then(purchase => {
                if(purchase){
                    this.sharedService.getDate().then(date => {
                        if(this.sharedService.getUserData() != undefined){
                            var user = this.sharedService.getUserData();
                            user.membership.id        = 2;
                            user.membership.name      = "Basic";
                            user.membership.startDate = date;
                            user.membership.endDate   = this.getMonthlyDuration(date);
                            user.membership.bookLeft  = 3;
                            user.membership.status    = 1;
                            this.sharedService.getFirebaseDatabase().object('/User/'+user.$key).update(user).then(() => {
                                console.log("Subscription add Success");
                                resolve(user);
                            }).catch(error => {
                                console.log("Subscription add Failed");
                                resolve(null);
                            });
                        }else{
                            console.log("Get User Data Failed");
                            resolve(null);
                        }
                    }).catch(error => {
                        console.log("Get Server Date Failed "+ error.message);
                        resolve(null);
                    });
                }else{
                    console.log("Purchase Failed");
                    resolve(null);
                }
            });
        });
    }

    public addSubscriptionPremiumMonthly(){
        return new Promise(resolve => {
            this.addSubscription(this.productList[1]).then(purchase => {
                if(purchase){
                    this.sharedService.getDate().then(date => {
                        if(this.sharedService.getUserData() != undefined){
                            var user = this.sharedService.getUserData();
                            user.membership.id        = 3;
                            user.membership.name      = "Premium";
                            user.membership.startDate = date;
                            user.membership.endDate   = this.getMonthlyDuration(date);
                            user.membership.bookLeft  = 0;
                            user.membership.status    = 1;
                            this.sharedService.getFirebaseDatabase().object('/User/'+user.$key).update(user).then(() => {
                                console.log("Subscription add Success");
                                resolve(user);
                            }).catch(error => {
                                console.log("Subscription add Failed");
                                resolve(null);
                            });
                        }else{
                            console.log("Get User Data Failed");
                            resolve(null);
                        }
                    }).catch(error => {
                        console.log("Get Server Date Failed "+ error.message);
                        resolve(null);
                    });
                }else{
                    console.log("Purchase Failed");
                    resolve(null);
                }
            });
        });
    }

    public addSubscriptionPremiumYearly(){
        return new Promise(resolve => {
            this.addSubscription(this.productList[2]).then(purchase => {
                if(purchase){
                    this.sharedService.getDate().then(date => {
                        if(this.sharedService.getUserData() != undefined){
                            var user = this.sharedService.getUserData();
                            user.membership.id        = 4;
                            user.membership.name      = "Premium";
                            user.membership.startDate = date;
                            user.membership.endDate   = this.getYearlyDuration(date);
                            user.membership.bookLeft  = 0;
                            user.membership.status    = 1;
                            this.sharedService.getFirebaseDatabase().object('/User/'+user.$key).update(user).then(() => {
                                console.log("Subscription add Success");
                                resolve(user);
                            }).catch(error => {
                                console.log("Subscription add Failed");
                                resolve(null);
                            });
                        }else{
                            console.log("Get User Data Failed");
                            resolve(null);
                        }
                    }).catch(error => {
                        console.log("Get Server Date Failed "+ error.message);
                        resolve(null);
                    });
                }else{
                    console.log("Purchase Failed");
                    resolve(null);
                }
            });
        });
    }

    private getMonthlyDuration(value){
        var tempDate = value.toString();
        var year  = tempDate.substr(0, 4);
        var month = tempDate.substr(4, 2);
        var day   = tempDate.substr(6, 2);
        if(month == '12'){
            year = (parseInt(year)+1).toString();
            month = "01";
        }else{
            month = this.getDoubleNumber((parseInt(month)+1).toString());
        }
        return parseInt(year+month+day);
    }

    private getYearlyDuration(value){
        var tempDate = value.toString();
        var year  = tempDate.substr(0, 4);
        var month = tempDate.substr(4, 2);
        var day   = tempDate.substr(6, 2);
        year = (parseInt(year)+1).toString();
        return parseInt(year+month+day);
    }

    private getDoubleNumber(number){
        if(number.length < 2){
          return "0"+number;
        }else{
          return number;
        }
    }

    private addSubscription(productID){
        return new Promise(resolve => {
            if(this.platform.is('android')){
                this.purchase.buy(productID).then(data => {
                    this.purchase.consume(data.productType, data.receipt, data.signature).then(result => {
                        resolve(true);
                    }).catch(error => {
                        resolve(false);
                    });
                }).catch(error => {
                    resolve(false);
                });
            }else{
                this.purchase.subscribe(productID).then(data => {
                    resolve(true);
                }).catch(error => {
                    resolve(false);
                });
            }
        });
    }
}
