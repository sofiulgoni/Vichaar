import { Injectable } from '@angular/core';

import { SharedDataService } from '../../common.module/shared-data.service/shared-data.service';

@Injectable()
export class HomeService {

    constructor( private sharedService : SharedDataService ){

    }

    public getFreeDailyBook(){
        if(this.sharedService.getBookList() != undefined){
            return this.sharedService.getBookList()[Math.floor(Math.random()*this.sharedService.getBookList().length)];
        }
    }

    public getForYouList(){
        if(this.sharedService.getBookList() != undefined && this.sharedService.getUserData().category != undefined){
            return this.sharedService.getBookList().filter(book => book.category == this.sharedService.getUserData().category.categoryOne || book.category == this.sharedService.getUserData().category.categoryTwo || book.category == this.sharedService.getUserData().category.categoryThree);
        }
    }

    public getCuratedList(){
        if(this.sharedService.getEditorList() != undefined){
            return this.sharedService.getEditorList();
        }
    }

    public getTrendingList(){
        if(this.sharedService.getBookList() != undefined){
            return this.sharedService.getBookList().sort(function(a, b) { return b.hits - a.hits;});
        }
    }

    public getNewList(){
        if(this.sharedService.getBookList() != undefined){
            return this.sharedService.getBookList().sort(function(a, b) { return b.date - a.date;});
        }
    }

    public getSearchBookList(name){
        if(this.sharedService.getBookList() != undefined){
            return this.sharedService.getBookList().filter(book => {
               return (book.name.toLowerCase().indexOf(name.toLowerCase()) > -1);
            });
        }
        
    }

    public getCategoryList(){
        if(this.sharedService.getCategoryList() != undefined){
            return this.sharedService.getCategoryList();
        }
    }

    public getCategoryFromID(key){
        if(this.sharedService.getCategoryList() != undefined && key != undefined){
            return this.sharedService.getCategoryList().find(category => category.$key == key);
        }
    }

    public getAuthorFromID(key){
        if(this.sharedService.getAuthorList() != undefined && key != undefined){
            return this.sharedService.getAuthorList().find(author => author.$key == key);
        }
    }

    public getUserData(){
        return this.sharedService.getUserData();
    }

    public getLibraryStatus(key){
        if(this.sharedService.getLibraryList() != undefined && key != undefined){
            return this.sharedService.getLibraryList().find(library => library.id == key);
        }
    }

    public addLibraryBook(library){
        this.sharedService.getFirebaseDatabase().list('/Library/'+this.sharedService.getUserData().$key).push(library).catch(error => this.errorHandler(error));
    }

    private errorHandler(error){
        console.log(error);
    }
    
}
