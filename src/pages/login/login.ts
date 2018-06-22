import { Component } from '@angular/core';
import { NavController, Events } from 'ionic-angular';
import { AuthService, SocialUser } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider, LinkedInLoginProvider } from "angularx-social-login";
import { HomePage } from '../home/home';
import { UserService } from '../services/user-service';
import { User } from '../../models/user';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  entryComponents: [HomePage]
})
export class LoginPage {

  private user: SocialUser;
  private loggedIn: boolean;

  constructor(public navCtrl: NavController,
    private authService: AuthService,
    private userService: UserService) {
  }

  ionViewDidLoad() {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);

      if (!this.loggedIn) {
        console.log(`user isn't logged`);
        return;
      }

      let appUser = new User();
      appUser.Provider = this.user.provider;
      appUser.Email = this.user.email;
      appUser.Name = this.user.name;
      appUser.PhotoUrl = this.user.photoUrl;
      appUser.FirstName = this.user.firstName;
      appUser.LastName = this.user.lastName;
      appUser.Address = null;

      this.userService.insert(appUser)
        .subscribe((response) => {
          console.log(`user: ${this.user.firstName} is logged`);
          this.navCtrl.push(HomePage, {
            user: this.user
          });
        });
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
