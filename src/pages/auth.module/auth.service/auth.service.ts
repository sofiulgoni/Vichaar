import { Injectable } from '@angular/core';

import { SharedDataService } from '../../common.module/shared-data.service/shared-data.service';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class AuthService {

    constructor( private sharedService : SharedDataService ){
       
    }
    
    public getFirebaseAuthState(){
        return this.sharedService.getFirebaseAuth();
    }

    public signupWithEmail(credentials) {
        return this.sharedService.getFirebaseAuth().createUserWithEmailAndPassword(credentials.email, credentials.password);
    }
    
    public loginWithEmail(credentials) {       
        return this.sharedService.getFirebaseAuth().signInWithEmailAndPassword(credentials.email, credentials.password);
    }

    public loginWithGoogle(){
        return this.sharedService.loginWithSocialProvider('google');
    }

    public loginWithFacebook(){
        return this.sharedService.loginWithSocialProvider('facebook');
    }

    public loginWithTwitter(){
        return this.sharedService.loginWithSocialProvider('twitter');
    }

    public loginWithGithub(){
        return this.sharedService.loginWithSocialProvider('github');
    }

    public logout() {
        this.sharedService.stopDataObserver();
        return this.sharedService.getFirebaseAuth().signOut();
    }

    public fogotPassword(email: string) {
        return this.sharedService.getFirebaseAuth().sendPasswordResetEmail(email);
    }

    public getStaticCategoryList(){
        return this.sharedService.getStaticCategoryList().first().toPromise();
    }

    public addUser(user, key){
        return this.sharedService.getFirebaseDatabase().object('/User/'+key).set(user);
    }

    public getStaticLanguageList(){
        return this.sharedService.getStaticLanguageList().first().toPromise();
    }

    public getRedirect(){
        return this.sharedService.getFirebaseAuth().getRedirectResult();
    }

    public getRedirectResult(){
        return this.sharedService.getRedirectResult();
    }

    public setRedirectResult(uid, email){
        this.sharedService.setRedirectResult(uid, email);
    }

    public startDataObserver(uid){
        this.sharedService.startDataObserver(uid);
    }

    public getDate(){
        return this.sharedService.getDate();
    }

}
