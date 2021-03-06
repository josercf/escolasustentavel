import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { IonicStorageModule } from '@ionic/storage';

import { MyApp } from './app.component';
import { LoginPage } from '../pages/login/login';
import { SocialLoginModule, AuthServiceConfig, LoginOpt } from "angularx-social-login";
import { GoogleLoginProvider, FacebookLoginProvider, LinkedInLoginProvider } from "angularx-social-login";
import { HomePageModule } from '../pages/home/home.module';
import { HomePage } from '../pages/home/home';
import { ProfilePageModule } from '../pages/profile/profile.module';
import { ProfilePage } from '../pages/profile/profile';
import { MyActionsPage } from '../pages/my-actions/my-actions';
import { MyActionsPageModule } from '../pages/my-actions/my-actions.module';
import { UserService } from '../pages/services/user-service';
import { Http, HttpModule } from '../../node_modules/@angular/http';
import { ActivityDetailsPage } from '../pages/activity-details/activity-details';
import { ActivityDetailsPageModule } from '../pages/activity-details/activity-details.module';
import { ActivityService } from '../pages/services/activity-service';

const fbLoginOptions: LoginOpt = {
  scope: 'pages_messaging,pages_messaging_subscriptions,email,pages_show_list,manage_pages',
  return_scopes: true,
  enable_profile_selector: true
}; // https://developers.facebook.com/docs/reference/javascript/FB.login/v2.11

const googleLoginOptions: LoginOpt = {
  scope: 'profile email'
}; // https://developers.google.com/api-client-library/javascript/reference/referencedocs#gapiauth2clientconfig


let config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider("892723648652-mqlh45fibqnv3qsmehfvi1dgrkfh7p5d.apps.googleusercontent.com", googleLoginOptions)
  },
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider("226121184860930")
  }
  // {
  //   id: LinkedInLoginProvider.PROVIDER_ID,
  //   provider: new LinkedInLoginProvider("78by3zjmphpynr", true, 'pt_BR')
  // }
]);

export function provideConfig() {
  return config;
}


@NgModule({
  declarations: [
    MyApp,
    LoginPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    SocialLoginModule,
    HomePageModule,
    ProfilePageModule,
    MyActionsPageModule,
    ActivityDetailsPageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    HomePage,
    ProfilePage,
    MyActionsPage,
    ActivityDetailsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    },
    UserService,
    ActivityService
  ]
})
export class AppModule { }
