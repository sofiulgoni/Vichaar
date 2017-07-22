import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { TabComponent } from '../../tab.module/tab.component/tab.component';
import { AuthService } from '../auth.service/auth.service';

import { SpinnerComponent } from '../../common.module/spinner.component/spinner.component';

@Component({
  selector: 'page-login',
  templateUrl: 'login.component.html'
})
export class LoginComponent {

  loginInfo = {email : "", password : ""};

  constructor(public navCtrl: NavController, private auth : AuthService, private spinner : SpinnerComponent) {

  }

  public login(credentials){
    this.spinner.showSpinner();
    this.auth.loginWithEmail(credentials)
      .then((success : any) => {
        this.spinner.hideSpinner();
        console.log("Login Success ");
        this.navCtrl.setRoot(TabComponent);
      }).catch((error : any) => {
        this.spinner.hideSpinner();
        console.log("Login Failed "+error.message);
      });
  }
  public openSignupPage(){
    
  }
  public forgotPassword(){
    
  }
  public socialLogin(social){
    console.log(social);
  }

}
