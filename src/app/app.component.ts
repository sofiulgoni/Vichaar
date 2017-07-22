import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { LoginComponent } from '../pages/auth.module/login.component/login.component';
import { TabComponent } from '../pages/tab.module/tab.component/tab.component';
import { SharedDataService } from '../pages/common.module/shared-data.service/shared-data.service';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage : any;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private sharedService : SharedDataService) {
    platform.ready().then(() => {

      this.sharedService.getFirebaseAuth().onAuthStateChanged((user) => {
        statusBar.styleDefault();
        splashScreen.hide();
        if(user != null){
          this.rootPage = TabComponent;
          this.sharedService.startDataObserver(user.uid);
          console.log("User Logged in");
        }else{
          this.rootPage = LoginComponent;
          console.log("User not Logged in");
        }
       });
      
    });
  }

}

