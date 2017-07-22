import { Injectable } from '@angular/core';

import { SharedDataService } from '../../common.module/shared-data.service/shared-data.service';


@Injectable()
export class BookService {

    constructor(private sharedService : SharedDataService){
       
    }

    public getUserData(){
        return this.sharedService.getUserData();
    }

    public getBookDetailsByID(key){
        if(this.sharedService.getBookList() != undefined && key != undefined){
            return this.sharedService.getBookList().find(book => book.$key == key);
        }
    }

    public getBookContentByKey(key){
        if(this.sharedService.getBookList() != undefined && key != undefined){
            return this.sharedService.getBookList().find(book => book.$key == key).content;
        }
    }

    public getAuthorFromID(key){
        if(this.sharedService.getAuthorList() != undefined && key != undefined){
            return this.sharedService.getAuthorList().find(author => author.$key == key);
        }
    }
    
    public getCategoryByKey(key){
        if(this.sharedService.getCategoryList() != undefined && key != undefined){
            return this.sharedService.getCategoryList().find(category => category.$key == key);
        }
    }

    public getCategoryWiseBooks(key){
        if(this.sharedService.getBookList() != undefined && key != undefined){
            return this.sharedService.getBookList().filter(book => book.category == key);
        }
    }

    public getCuratedListByID(key){
        if(this.sharedService.getEditorList() != undefined && key != undefined){
            return this.sharedService.getEditorList().find(books => books.$key == key);
        }
    }
    
    public getCuratedBooks(books){
        let bookList = [];
        if(this.sharedService.getBookList() != undefined && books != undefined){
            books.forEach(book => {
                bookList.push(this.getBookDetailsByID(book));
            })
            return bookList;
        }
    }

    public getCategoryWiseSurpriseBook(key){
        if(this.sharedService.getBookList() != undefined && key != undefined){
            return this.sharedService.getBookList().filter(book => book.category == key)[Math.floor(Math.random()*this.sharedService.getBookList().filter(book => book.category == key).length)];
        }  
    }

    public getLinkWiseBooks(key){
        switch(key){
            case 'Trending' : {
                if(this.sharedService.getBookList() != undefined){
                    return this.sharedService.getBookList().sort(function(a, b) { return b.hits - a.hits;});
                }
            }
            case 'New' : {
                if(this.sharedService.getBookList() != undefined){
                    return this.sharedService.getBookList().sort(function(a, b) { return b.date - a.date;});
                }
            }
            case 'For You' : {
                if(this.sharedService.getBookList() != undefined && this.sharedService.getUserData() != undefined){
                    return this.sharedService.getBookList().filter(book => book.category == this.sharedService.getUserData().category.categoryOne || book.category == this.sharedService.getUserData().category.categoryTwo || book.category == this.sharedService.getUserData().category.categoryThree);
                }
            }
            case 'Curated List' : {
                if(this.sharedService.getEditorList() != undefined){
                    return this.sharedService.getEditorList();
                }
            } 
        }
    }

    public getLibraryStatus(key){
        if(this.sharedService.getLibraryList() != undefined && key != undefined){
            return this.sharedService.getLibraryList().find(library => library.id == key);
        }
    }

    public addLibraryBook(library){
        this.sharedService.getFirebaseDatabase().list('/Library/'+this.sharedService.getUserData().$key).push(library).catch(error => this.errorHandler(error));
    }

    public updateLibraryBook(library){
        this.sharedService.getFirebaseDatabase().object('/Library/'+this.sharedService.getUserData().$key+'/'+library.$key).update(library).catch(error => this.errorHandler(error));
    }

    private errorHandler(error){
        console.log(error);
    }
    
}
