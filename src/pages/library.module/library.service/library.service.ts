import { Injectable } from '@angular/core';

import { SharedDataService } from '../../common.module/shared-data.service/shared-data.service';

@Injectable()
export class LibraryService {

    constructor(private sharedService : SharedDataService){
       
    }

    public checkIfInLibrary(key){
        if(this.sharedService.getLibraryList() != undefined && key != undefined){
            return this.sharedService.getLibraryList().find(library => library.id == key);
        }
    }

    public getLibraryBooks(){
        if(this.sharedService.getLibraryList() != undefined){
            var list = [];
            for(var i=0;i<this.sharedService.getLibraryList().length;i++){
                if(this.getBookDetailsByID(this.sharedService.getLibraryList()[i].id) != undefined){
                    list.push(this.getBookDetailsByID(this.sharedService.getLibraryList()[i].id));
                }
            }
            return list;
        }
    }

    public getFilteredLibraryList(filterData){
        var list = [];
        if(this.sharedService.getLibraryList() != undefined){
            this.sharedService.getLibraryList().filter(library => (library.progress == filterData.notStarted || library.progress == filterData.inProgress || library.progress == filterData.isFinished) && (library.media == filterData.hasVideo || library.media == filterData.hasAudio || library.media == filterData.hasText)).forEach(library => {
                var book = this.getBookDetailsByID(library.id);
                if( book != undefined ){
                    list.push(book);
                }
            });
        }
        return list;
    }

    public getBookDetailsByID(key){
        if(this.sharedService.getBookList() != undefined && key != undefined){
            return this.sharedService.getBookList().find(book => book.$key == key);
        }
    }

    public getAuthorFromID(key){
        if(this.sharedService.getAuthorList() != undefined && key != undefined){
            return this.sharedService.getAuthorList().find(author => author.$key == key);
        }
    }

    public checkIfHasTag(key){
        if(this.sharedService.getTagList() != undefined && key != undefined){
            return this.sharedService.getTagList().find(tag => tag.id == key);
        }
    }

    public checkIfFavourite(key){
        if(this.sharedService.getFavouriteList() != undefined && key != undefined){
            return this.sharedService.getFavouriteList().find(favourite => favourite.$value == key);
        }
    }

    public removeFromLibrary(key){
        this.sharedService.getFirebaseDatabase().object('/Library/'+this.sharedService.getUserData().$key+'/'+this.checkIfInLibrary(key).$key).remove();
    }

    public addToFavourite(favourite){
        this.sharedService.getFirebaseDatabase().list('/Favourite/'+this.sharedService.getUserData().$key).push(favourite);
    }

    public removeFromFavourite(key){
        this.sharedService.getFirebaseDatabase().object('/Favourite/'+this.sharedService.getUserData().$key+'/'+this.checkIfFavourite(key).$key).remove();
    }

    public getTagList(){
        return this.sharedService.getTagList();
    }

    public getTagByKey(key){
        return this.sharedService.getTagList().find(tag => tag.$key == key);
    }

    public getBookTags(key){
        return this.sharedService.getTagList().filter(tag => {
            return tag.books.find(book => book == key);
        });
    }

    public getTagBooks(books){
        var list = [];
        if(books != undefined){
            books.forEach(book => {
                var bookItem = this.getBookDetailsByID(book);
                if(bookItem != undefined){
                    list.push(bookItem);
                }
            });
        }
        return list;
    }

    public addTag(tag){
        this.sharedService.getFirebaseDatabase().list('/Tag/'+this.sharedService.getUserData().$key).push(tag);
    }

    public updateTag(tag){
        this.sharedService.getFirebaseDatabase().object('/Tag/'+this.sharedService.getUserData().$key+'/'+tag.$key).update(tag);
    }

    public removeTag(key){
        this.sharedService.getFirebaseDatabase().object('/Tag/'+this.sharedService.getUserData().$key+'/'+key).remove();
    }
    
}
