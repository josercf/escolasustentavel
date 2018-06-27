import { Component } from '@angular/core';
import { NavController, Events, MenuController } from 'ionic-angular';
import { AuthService, SocialUser } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider, LinkedInLoginProvider } from "angularx-social-login";
import { HomePage } from '../home/home';
import { UserService } from '../services/user-service';
import { User } from '../../models/user';
import { ISubscription } from '../../../node_modules/rxjs/Subscription';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  entryComponents: [HomePage]
})
export class LoginPage {

  private user: SocialUser;
  private loggedIn: boolean;
  private subscription: any;
  private subscription2: any;
  email: string;
  password: string;

  constructor(public navCtrl: NavController,
    public menu: MenuController,
    private authService: AuthService,
    private userService: UserService) {
    this.menu.swipeEnable(false);

    this.subscription = this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);

      if (this.loggedIn) {

        let appUser = this.createUser();

        this.subscription2 = this.userService.insert(appUser)
          .subscribe((response) => {
            console.log(`user: ${this.user.firstName} is logged`);
            this.user = null;
            this.redirectToHome();
          });
      }
    });
  }


  ionViewDidLoad() {

  }

  createUser(): User {
    let appUser = new User();
    appUser.Provider = this.user.provider;
    appUser.Email = this.user.email;
    appUser.Name = this.user.name;
    appUser.PhotoUrl = this.user.photoUrl;
    appUser.FirstName = this.user.firstName;
    appUser.LastName = this.user.lastName;
    appUser.Address = null;

    return appUser;
  }
  ionViewWillUnload() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    if (this.subscription2) {
      this.subscription2.unsubscribe();
    }

    this.user = null;
  }

  redirectToHome() {
    this.navCtrl.setRoot(HomePage);
  }

  signInWithCredentials(): void {
    this.userService.signIn(this.email, this.password)
      .subscribe(user => {
        if (user) {
          this.redirectToHome();
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
