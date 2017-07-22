import { Injectable } from '@angular/core';
import { Events } from 'ionic-angular';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';

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
	    this.userDataObserver = this.database.object('/User/'+userID).subscribe(userData => {
			this.userData = userData;
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

	private observerErrorHandler(error){
		console.log(error);
	}
}
