import { Injectable } from '@angular/core';
import { ActionSheetController  } from 'ionic-angular';

import { LibraryService } from '../../library.module/library.service/library.service';

@Injectable()
export class ActionSheetComponent {

  constructor(private actionSheetCtrl : ActionSheetController, private libraryService : LibraryService ) {
    
  }
  
  public showActionSheet(key, callBack){
    let actionSheet = this.actionSheetCtrl.create({
     buttons: [
       {
         text: this.getTagText(key),
         handler: () => {
           callBack(this.getTagText(key));
         }
       },
       {
         text: this.getFavouriteText(key),
         handler: () => {
           if(this.getFavouriteText(key) == 'Add to favourite'){
             this.libraryService.addToFavourite(key);
           }else{
             this.libraryService.removeFromFavourite(key);
           }
         }
       },
       {
         text: 'Delete from library',
         role: 'destructive',
         handler: () => {
           this.libraryService.removeFromLibrary(key);
         }
       },
       {
         text: 'Cancel',
         role: 'cancel',
         handler: () => {
           console.log('Canceled');
         }
       }
     ]
   });

   actionSheet.present();
  }

  private getTagText(key){
    var list = this.libraryService.getBookTags(key);
    if(list != undefined && list.length > 0){
      return "Edit Tag";
    }else{
      return "Add Tag";
    }
  }

  private getFavouriteText(key){
    if(this.libraryService.checkIfFavourite(key) != undefined){
      return "Remove from favourite";
    }else{
      return "Add to favourite";
    }
  }
}
