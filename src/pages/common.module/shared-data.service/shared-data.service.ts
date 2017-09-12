import { Injectable } from '@angular/core';
import { Events } from 'ionic-angular';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class SharedDataService {

    private userData      : any;
	private authorList    : any[];
	private categoryList  : any[];
	private bookList      : any[];
	private editorList    : any[];
	private languageList  : any[];
	private libraryList   : any[];
	private tagList       : any[];
	private favouriteList : any[];
	private highlightList : any[];
	private newUser = {uid : "1m2s3g2j1", email : "msgj@gmail.com"};
	
	private userDataObserver      : any;
	private authorListObserver    : any;
	private categoryListObserver  : any;
	private bookListObserver      : any;
	private editorListObserver    : any;
	private languageListObserver  : any;
	private libraryListObserver   : any;
	private tagListObserver       : any;
	private favouriteListObserver : any;
	private highlightListObserver : any;

    constructor( private auth : AngularFireAuth, private database : AngularFireDatabase, private event : Events ){
       
    }
	
	public startDataObserver(userID){
		console.log("Data Subscribed");
	    this.userDataObserver = this.database.object('/User/'+userID).subscribe(userData => {
			this.userData = userData;
			this.checkUserSubscription(this.userData);
			this.authorListObserver = this.database.list('/Author').subscribe(authorList => {
				this.authorList = authorList;
				this.categoryListObserver = this.database.list('/Category').subscribe(categoryList => {
					this.categoryList = categoryList;
					this.bookListObserver = this.database.list('/Book', { query :{ orderByChild: 'language', equalTo : this.userData.language }}).subscribe(bookList => {
						this.bookList = bookList;
						this.editorListObserver = this.database.list('/Editor', { query :{ orderByChild: 'language', equalTo : this.userData.language }}).subscribe(editorList => {
							this.editorList = editorList;
							this.languageListObserver = this.database.list('/Language').subscribe(languageList => {
								this.languageList = languageList;
								this.libraryListObserver = this.database.list('/Library/'+this.userData.$key).subscribe(libraryList => {
									this.libraryList = libraryList;
									this.tagListObserver = this.database.list('/Tag/'+this.userData.$key).subscribe(tagList => {
										this.tagList = tagList;
										this.favouriteListObserver = this.database.list('/Favourite/'+this.userData.$key).subscribe(favouriteList => {
											this.favouriteList = favouriteList;
											this.highlightListObserver = this.database.list('/Highlight/'+this.userData.$key).subscribe(highlightList => {
												this.highlightList = highlightList;
												this.event.publish('Data : Loaded',true);
											},error => this.observerErrorHandler(error))
										},error => this.observerErrorHandler(error));
									},error => this.observerErrorHandler(error));
								},error => this.observerErrorHandler(error));
							},error => this.observerErrorHandler(error));
						},error => this.observerErrorHandler(error));
					},error => this.observerErrorHandler(error));
				},error => this.observerErrorHandler(error));
			},error => this.observerErrorHandler(error));
		},error => this.observerErrorHandler(error));
	}
    
    public stopDataObserver(){
		console.log("Data Unsubscribed");
        this.userDataObserver.unsubscribe();
        this.authorListObserver.unsubscribe();
        this.categoryListObserver.unsubscribe();
        this.bookListObserver.unsubscribe();
        this.languageListObserver.unsubscribe();
        this.libraryListObserver.unsubscribe();
        this.editorListObserver.unsubscribe();
        this.tagListObserver.unsubscribe();
		this.favouriteListObserver.unsubscribe();
		this.highlightListObserver.unsubscribe();
    }
	
	public getFirebaseAuth(){
	    return this.auth.auth;
	}

	public loginWithSocialProvider(provider){
		switch(provider){
			case 'google' : {
				return this.auth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
			}
			case 'facebook' : {
				return this.auth.auth.signInWithRedirect(new firebase.auth.FacebookAuthProvider());
			}
			case 'twitter' : {
				return this.auth.auth.signInWithRedirect(new firebase.auth.TwitterAuthProvider());
			}
			case 'github' : {
				return this.auth.auth.signInWithRedirect(new firebase.auth.GithubAuthProvider());
			}
		}
	}

	private checkUserSubscription(user){
		if(user.membership.status == 2){
		    console.log("Inactive Member");
		}else{
			this.getDate().then(date => {
				switch(user.membership.id){
					case 1 : {
						console.log("Trial Member");
						if(user.membership.bookLeft < 1){
							user.membership.status = 2;
							this.database.object('/User/'+user.$key).update(user).then(() => {
								console.log("User Subscription Updated");
							});
						}
					}break;
					case 2 : {
						console.log("Basic Member");
                        if(user.membership.bookLeft < 1 || user.membership.endDate < date){
							user.membership.status = 2;
							this.database.object('/User/'+user.$key).update(user).then(() => {
								console.log("User Subscription Updated");
							});
						}				
					}break;
					case 3 : {
						console.log("Premium Monthly Member");
						if(user.membership.endDate < date){
							user.membership.status = 2;
							this.database.object('/User/'+user.$key).update(user).then(() => {
								console.log("User Subscription Updated");
							});
						}
					}break;
					case 4 : {
						console.log("Premium Yearly Member");
						if(user.membership.endDate < date){
							user.membership.status = 2;
							this.database.object('/User/'+user.$key).update(user).then(() => {
								console.log("User Subscription Updated");
							});
						}
					}break;
				}
			}).catch(error => {
				console.log("Get Server Date Failed "+error.message);
			});
		}
	}

	public getDate(){
		return this.database.object("/.info/serverTimeOffset").first().toPromise().then(result => {
			var date = new Date(Date.now()+result.$value);
			var month = this.getDoubleNumber((date.getUTCMonth() + 1).toString());
            var day = this.getDoubleNumber((date.getUTCDate()).toString());
            var year = date.getUTCFullYear();
            var serverDate = year.toString() + month.toString() + day.toString();
            return parseInt(serverDate);
		});
    }

	private getDoubleNumber(number){
        if(number.length < 2){
          return "0"+number;
        }else{
          return number;
        }
    }
	
	public getFirebaseDatabase(){
	    return this.database;
	}
	
	public getUserData(){
	    return this.userData;
	}
	
	public getAuthorList(){
	    return this.authorList;
	}
	
	public getCategoryList(){
	    return this.categoryList;
	}

	public getStaticCategoryList(){
	    return this.database.list('/Category');
	}

	public getStaticLanguageList(){
	    return this.database.list('/Language');
	}
	
	public getBookList(){
	    return this.bookList;
	}
	
	public getLanguageList(){
	    return this.languageList;
	}
	
	public getEditorList(){
	    return this.editorList;
	}
	
	public getLibraryList(){
	    return this.libraryList;
	}
	
	public getTagList(){
	    return this.tagList;
	}
	
	public getFavouriteList(){
	    return this.favouriteList;
	}
	
	public getHighlightList(){
	    return this.highlightList;
	}

	public checkIfRedirect(userID){
		return this.database.object('/User/'+userID).first().toPromise();
	}

	public setRedirectResult(uid, email){
		if(uid != null){
			this.newUser.uid = uid;
		}
		if(email != null){
			this.newUser.email = email;
		}
	}

	public getRedirectResult(){
		return this.newUser;
	}

	private observerErrorHandler(error){
		console.log(error);
	}
}
