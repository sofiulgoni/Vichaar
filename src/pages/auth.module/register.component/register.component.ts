import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { AuthService } from '../auth.service/auth.service';
import { SpinnerComponent } from '../../common.module/spinner.component/spinner.component';

@Component({
  selector: 'page-register',
  templateUrl: 'register.component.html'
})
export class RegisterComponent {

  registerInfo = {email : "", password : ""};

  constructor(private navCtrl: NavController, private auth : AuthService, private spinner : SpinnerComponent) {

  }

  public register(credentials){
    this.spinner.showSpinner();
    this.auth.signupWithEmail(credentials).then(user => {
      console.log("SignUp Success");
      this.auth.setRedirectResult(user.uid, credentials.email);
      this.spinner.hideSpinner();
    }).catch(error => {
      console.log("SignUp Failed "+error.message);
      this.spinner.hideSpinner();
    });
  }

}
