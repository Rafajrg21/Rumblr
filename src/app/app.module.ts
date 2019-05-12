import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule} from '@angular/common/http';
import { HttpModule } from '@angular/http';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AuthModule } from './auth/auth.module';
import { AnimateItemsDirective } from './directives/animate-items.directive';
import { SinglePostPageModule } from './single-post/single-post.module';
import { EditProfilePageModule } from './edit-profile/edit-profile.module';
import { MakePostPageModule } from './make-post/make-post.module';
import { MakeCommentPageModule } from './make-comment/make-comment.module';

@NgModule({
  declarations: [AppComponent, AnimateItemsDirective],
  entryComponents: [],
  imports: [BrowserModule, BrowserAnimationsModule, HttpClientModule, HttpModule,IonicModule.forRoot(), AppRoutingModule,
  AuthModule, SinglePostPageModule, EditProfilePageModule, MakePostPageModule, MakeCommentPageModule],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
