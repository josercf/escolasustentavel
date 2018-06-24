import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';
import { SocialUser, AuthService } from 'angularx-social-login';
import { ProfilePage } from '../pages/profile/profile';
import { MyActionsPage } from '../pages/my-actions/my-actions';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage: any = LoginPage;
  pages: Array<{ title: string, icon: string, component: any }>;

  username: string = "";
  photoUrl: string = "";

  constructor(platform: Platform, statusBar: StatusBar,
    splashScreen: SplashScreen,
    private authService: AuthService) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.

      this.authService.authState.subscribe((user) => {
        if (user != null) {
          this.photoUrl = user.photoUrl;
          this.username = user.name;
        }
      });

      statusBar.styleDefault();
      splashScreen.hide();
    });

    this.pages = [
      { title: 'Home', icon: 'home', component: HomePage },
      { title: 'Meu Perfil', icon: 'contact', component: ProfilePage },
      { title: 'Minhas ações', icon: 'book', component: MyActionsPage },
      // { title: 'Configurações', icon: 'settings', component: LoginPage }
    ];
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  sair() {
    console.log("signOut");
    this.authService.signOut()
      .then(result => {
        this.nav.push(LoginPage);
      });
  }
}

