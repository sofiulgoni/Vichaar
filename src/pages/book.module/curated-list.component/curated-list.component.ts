import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';

import { BookListComponent } from '../book-list.component/book-list.component';
import { BookService } from '../book.service/book.service';

@Component({
  selector: 'page-curated-list',
  templateUrl: 'curated-list.component.html'
})
export class CuratedListComponent implements OnInit{

  editorsList : any[];
  
  constructor(private navCtrl: NavController, private bookService : BookService) {
    
  }

  ngOnInit(){
    if(this.bookService.getLinkWiseBooks('Curated List') != undefined){
      this.editorsList = this.bookService.getLinkWiseBooks('Curated List');
    }
  }

  public showBookList(key){
    this.navCtrl.push(BookListComponent, {type : "Curated", key : key});
    console.log(key);
  }

}
