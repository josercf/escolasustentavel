import { Component } from '@angular/core';
import { NavController, Events } from 'ionic-angular';
import { AuthService, SocialUser } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider, LinkedInLoginProvider } from "angularx-social-login";
import { HomePage } from '../home/home';
 

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  entryComponents:[HomePage]
})
export class LoginPage {

  private user: SocialUser;
  private loggedIn: boolean;

  constructor(public navCtrl: NavController, private authService: AuthService,
              public events: Events) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DemoPage');

    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);

      if(this.loggedIn){
        this.events.publish('user:login', this.user);
        console.log(this.user.firstName)
       
        this.navCtrl.push(HomePage, {
          user: this.user
        });
      }
    });
  }

  
  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }
 
  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }
  
  signInWithLinkedIn(): void {
    this.authService.signIn(LinkedInLoginProvider.PROVIDER_ID);
  }  
 
  signOut(): void {
    this.authService.signOut();
  }
}
