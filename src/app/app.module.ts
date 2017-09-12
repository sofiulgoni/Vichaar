import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { StreamingMedia } from '@ionic-native/streaming-media';
import { InAppPurchase } from '@ionic-native/in-app-purchase';

import { MyApp } from './app.component';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { FirebaseConfig } from './firebase.config';

import { LoginComponent } from '../pages/auth.module/login.component/login.component';
import { RegisterComponent } from '../pages/auth.module/register.component/register.component';
import { UserCategoryComponent } from '../pages/auth.module/user-category.component/user-category.component';
import { AuthService } from '../pages/auth.module/auth.service/auth.service';

import { TabComponent } from '../pages/tab.module/tab.component/tab.component';

import { HomeComponent } from '../pages/home.module/home.component/home.component';
import { CategoryListComponent } from '../pages/home.module/category-list.component/category-list.component';
import { HomeService } from '../pages/home.module/home.service/home.service';

import { BookListComponent } from '../pages/book.module/book-list.component/book-list.component';
import { CuratedListComponent } from '../pages/book.module/curated-list.component/curated-list.component';
import { BookDetailsComponent } from '../pages/book.module/book-details.component/book-details.component';
import { BookTextComponent } from '../pages/book.module/book-text.component/book-text.component';
import { TitleListComponent } from '../pages/book.module/title-list.component/title-list.component';
import { TextSettingsComponent } from '../pages/book.module/text-settings.component/text-settings.component';
import { BookService } from '../pages/book.module/book.service/book.service';

import { LibraryComponent } from '../pages/library.module/library.component/library.component';
import { LibraryFilterComponent } from '../pages/library.module/library-filter.component/library-filter.component';
import { TagAddComponent } from '../pages/library.module/tag-add.component/tag-add.component';
import { TagListComponent } from '../pages/library.module/tag-list.component/tag-list.component';
import { TagDetailsComponent } from '../pages/library.module/tag-details.component/tag-details.component';
import { LibraryService } from '../pages/library.module/library.service/library.service';

import { ProfileComponent } from '../pages/profile.module/profile.component/profile.component';
import { SettingsComponent } from '../pages/profile.module/settings.component/settings.component';
import { ProfileService } from '../pages/profile.module/profile.service/profile.service';

import { SubscriptionComponent } from '../pages/subscription.module/subscription.component/subscription.component';
import { SubscriptionService } from '../pages/subscription.module/subscription.service/subscription.service';

import { SpinnerComponent } from '../pages/common.module/spinner.component/spinner.component';
import { ActionSheetComponent } from '../pages/common.module/action-sheet.component/action-sheet.component';
import { SharedDataService } from '../pages/common.module/shared-data.service/shared-data.service';

@NgModule({
  declarations: [
    MyApp,
    LoginComponent,
    RegisterComponent,
    UserCategoryComponent,
    TabComponent,
    HomeComponent,
    CategoryListComponent,
    CuratedListComponent,
    BookListComponent,
    BookDetailsComponent,
    BookTextComponent,
    TitleListComponent,
    TextSettingsComponent,
    LibraryComponent,
    LibraryFilterComponent,
    TagAddComponent,
    TagListComponent,
    TagDetailsComponent,
    ProfileComponent,
    SettingsComponent,
    SubscriptionComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp,{
      platforms: {
            ios: {
              statusbarPadding: true
            }
          }
    }),
    AngularFireModule.initializeApp(FirebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginComponent,
    RegisterComponent,
    UserCategoryComponent,
    TabComponent,
    HomeComponent,
    CategoryListComponent,
    BookListComponent,
    CuratedListComponent,
    BookDetailsComponent,
    BookTextComponent,
    TitleListComponent,
    TextSettingsComponent,
    LibraryComponent,
    LibraryFilterComponent,
    TagAddComponent,
    TagListComponent,
    TagDetailsComponent,
    ProfileComponent,
    SettingsComponent,
    SubscriptionComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,
    StreamingMedia,
    InAppPurchase,
    SharedDataService,
    AuthService,
    HomeService,
    BookService,
    LibraryService,
    ProfileService,
    SubscriptionService,
    SpinnerComponent,
    ActionSheetComponent,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
