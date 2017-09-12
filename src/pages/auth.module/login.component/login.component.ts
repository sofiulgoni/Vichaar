import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';

import { RegisterComponent } from '../register.component/register.component';
import { AuthService } from '../auth.service/auth.service';
import { SpinnerComponent } from '../../common.module/spinner.component/spinner.component';

@Component({
  selector: 'page-login',
  templateUrl: 'login.component.html'
})
export class LoginComponent {

  loginInfo = {email : "", password : ""};

  constructor(public navCtrl: NavController, private auth : AuthService, private spinner : SpinnerComponent, private modalController : ModalController) {

  }

  public login(credentials){
    this.spinner.showSpinner();
    this.auth.loginWithEmail(credentials)
      .then((success : any) => {
        this.spinner.hideSpinner();
        console.log("Login Success ");
      }).catch((error : any) => {
        this.spinner.hideSpinner();
        console.log("Login Failed "+error.message);
      });
  }
  public openSignupPage(){
    this.navCtrl.push(RegisterComponent);
  }
  public forgotPassword(){
    if(this.loginInfo.email != ""){
      this.spinner.showSpinner();
      this.auth.fogotPassword(this.loginInfo.email).then(success => {
        this.spinner.hideSpinner();
        console.log("Password Changed");
      }).catch(error => {
        this.spinner.hideSpinner();
        console.log("Password Change failed");
      });
    }
  }
  public socialLogin(social){
    switch(social){
      case 'google' : {
        this.auth.loginWithGoogle().then(() => {
          console.log("Google Success");
          this.auth.getRedirect().then(result => {
            console.log("Login Redirect Success");
          }).catch(error => {
            console.log("Login Redirect Failed "+error.message);
          });
        }).catch(error => {
          console.log("Google Failed "+error.message);
        });
      }break;
      case 'facebook' : {
        this.auth.loginWithFacebook().then(() => {
          console.log("Facebook Success");
          this.auth.getRedirect().then(result => {
            console.log("Login Redirect Success");
          }).catch(error => {
            console.log("Login Redirect Failed "+error.message);
          });
        }).catch(error => {
          console.log("Facebook Failed "+error.message);
        });
      }break;
      case 'twitter' : {
        this.auth.loginWithTwitter().then(() => {
          console.log("Twitter Success");
          this.auth.getRedirect().then(result => {
            console.log("Login Redirect Success");
          }).catch(error => {
            console.log("Login Redirect Failed "+error.message);
          });
        }).catch(error => {
          console.log("Twitter Failed "+error.message);
        });
      }break;
      case 'github' : {
        this.auth.loginWithGithub().then(() => {
          console.log("Github Success");
          this.auth.getRedirect().then(result => {
            console.log("Login Redirect Success");
          }).catch(error => {
            console.log("Login Redirect Failed "+error.message);
          });
        }).catch(error => {
          console.log("Github Failed "+error.message);
        });
      }break;
    }
  }

}
