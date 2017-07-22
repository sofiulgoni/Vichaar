import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { HomeComponent }      from '../../home.module/home.component/home.component';
import { LibraryComponent }   from '../../library.module/library.component/library.component';
import { ProfileComponent }   from '../../profile.module/profile.component/profile.component';

@Component({
  selector: 'page-tab',
  templateUrl: 'tab.component.html'
})
export class TabComponent {

  tab1Root = HomeComponent;
  tab2Root = LibraryComponent;
  tab3Root = ProfileComponent;

  constructor(private navCtrl: NavController) {
  }
}
