import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { LoginComponent } from '../pages/auth.module/login.component/login.component';
import { TabComponent } from '../pages/tab.module/tab.component/tab.component';
import { UserCategoryComponent } from '../pages/auth.module/user-category.component/user-category.component';
import { SharedDataService } from '../pages/common.module/shared-data.service/shared-data.service';
import { SpinnerComponent } from '../pages/common.module/spinner.component/spinner.component';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  @ViewChild(Nav) navCtrl: Nav;
  
  rootPage = LoginComponent; 

  constructor(platform: Platform, private statusBar: StatusBar, private splashScreen: SplashScreen, private spinner : SpinnerComponent, private sharedService : SharedDataService) {
    platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      sharedService.getFirebaseAuth().getRedirectResult().then(result => {
        console.log("App Redirect Success");
      }).catch(error => {
        console.log("App Redirect Failed "+error.message);
      });
      this.checkUserAuth();
    });
  }

  private checkUserAuth(){
    this.spinner.showSpinner();
    this.sharedService.getFirebaseAuth().onAuthStateChanged((user) => {
        if(user != null){
          this.sharedService.checkIfRedirect(user.uid).then(redirectUser => {
            if(redirectUser.email != undefined){
              console.log("User Logged in");
              this.spinner.hideSpinner();
              this.sharedService.startDataObserver(user.uid);
              this.navCtrl.setRoot(TabComponent);
            }else{
              this.spinner.hideSpinner();
              console.log("User Redirected");
              this.sharedService.setRedirectResult(user.uid, user.email);
              this.navCtrl.setRoot(UserCategoryComponent);
            }
          }).catch(error => {
            this.spinner.hideSpinner();
            console.log("User Redirect Failed");
            this.sharedService.setRedirectResult(user.uid, user.email);
            this.navCtrl.setRoot(UserCategoryComponent);
          });
        }else{
          this.spinner.hideSpinner();
          this.navCtrl.setRoot(LoginComponent);
          console.log("User not Logged in");
        }
    });
  }

}

