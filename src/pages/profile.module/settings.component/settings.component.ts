import { Component, OnInit } from '@angular/core';
import { App  } from 'ionic-angular';

import { User } from '../../auth.module/user.model/user.model';
import { Language } from '../language.model/language.model';
import { LoginComponent } from '../../auth.module/login.component/login.component';
import { ProfileService } from '../profile.service/profile.service';
import { AuthService } from '../../auth.module/auth.service/auth.service';

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.component.html'
})
export class SettingsComponent implements OnInit{

  userData = new User();
  languageList : Language[];

  constructor(public appCtrl: App, private profileService : ProfileService, private authService : AuthService) {

  }

  ngOnInit(){
    if(this.profileService.getUserData() != undefined){
      this.userData = this.profileService.getUserData();
    }
    if(this.profileService.getLanguageList() != undefined){
      this.languageList = this.profileService.getLanguageList();
    }
  }

  public changeLanguage(key){
    this.userData.language = key;
    this.profileService.updateUserData(this.userData);
  }

  public logout(){
    this.authService.logout()
      .then((success : any) => {
        console.log("Logout Success ");
        this.appCtrl.getRootNav().setRoot(LoginComponent);
      }).catch((error : any) => {
        console.log("Logout Failed "+error.message);
      });
  }

}
