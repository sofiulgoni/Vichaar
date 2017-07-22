import { Injectable } from '@angular/core';

import { SharedDataService } from '../../common.module/shared-data.service/shared-data.service';


@Injectable()
export class ProfileService {

    constructor(private sharedService : SharedDataService){
       
    }

    public getUserData(){
        if(this.sharedService.getUserData() != undefined){
            return this.sharedService.getUserData();
        }
    }

    public getBookByKey(key){
        if(this.sharedService.getBookList() != undefined && key != undefined){
            return this.sharedService.getBookList().find(book => book.$key == key);
        }
    }

    public getLanguageList(){
        if(this.sharedService.getLanguageList() != undefined){
            return this.sharedService.getLanguageList();
        }
    }

    public updateUserData(user){
        this.sharedService.getFirebaseDatabase().object('/User/'+user.$key).update(user).catch(error => this.errorHandler(error));
    }

    public getFavouriteBookList(){
        var list =[];
        if(this.sharedService.getFavouriteList() != undefined){
            this.sharedService.getFavouriteList().forEach(favourite => {
              if(this.getBookByKey(favourite.$value) != undefined){
                list.push(this.getBookByKey(favourite.$value));
              }
            });
        }
        return list;
    }

    public checkIfFavourite(key){
        if(this.sharedService.getFavouriteList() != undefined && key != undefined){
            return this.sharedService.getFavouriteList().find(favourite => favourite.$value == key);
        }
    }

    public removeFromFavourite(key){
        this.sharedService.getFirebaseDatabase().object('/Favourite/'+this.sharedService.getUserData().$key+'/'+this.checkIfFavourite(key).$key).remove();
    }

    public getHighlightBookList(){
        return this.sharedService.getHighlightList();
    }

    public getAuthorByKey(key){
        if(this.sharedService.getAuthorList() != undefined && key != undefined){
            return this.sharedService.getAuthorList().find(author => author.$key == key);
        }
    }
    
    private errorHandler(error){
        console.log(error);
    }
    
}
