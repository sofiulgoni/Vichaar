import { Injectable } from '@angular/core';

import { SharedDataService } from '../../common.module/shared-data.service/shared-data.service';

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
    public logout() {
        this.sharedService.stopDataObserver();
        return this.sharedService.getFirebaseAuth().signOut();
    }
    public fogotPassword(email: string) {
        return this.sharedService.getFirebaseAuth().sendPasswordResetEmail(email);
    }

}
