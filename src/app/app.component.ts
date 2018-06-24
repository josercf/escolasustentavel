import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, Events, Keyboard } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';
import { SocialUser, AuthService } from 'angularx-social-login';
import { ProfilePage } from '../pages/profile/profile';
import { MyActionsPage } from '../pages/my-actions/my-actions';

export interface MenuItem {
  title: string;
  component: any;
  icon: string;
}



@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage: any = LoginPage;
  pages: Array<{ title: string, icon: string, component: any }>;
  appMenuItems: Array<MenuItem>;

  username: string = "";
  photoUrl: string = "";

  constructor( public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public keyboard: Keyboard,
    private authService: AuthService) {
    platform.ready().then(() => {

      this.initializeApp();


      this.authService.authState.subscribe((user) => {
        if (user != null) {
          this.photoUrl = user.photoUrl;
          this.username = user.name;
        }
      });

      statusBar.styleDefault();
      splashScreen.hide();
    });

    this.appMenuItems = [
      { title: 'Home', icon: 'home', component: HomePage },
      { title: 'Meu Perfil', icon: 'contact', component: ProfilePage },
      { title: 'Minhas ações', icon: 'book', component: MyActionsPage },
      // { title: 'Configurações', icon: 'settings', component: LoginPage }
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.

      //*** Control Splash Screen
      // this.splashScreen.show();
      // this.splashScreen.hide();

      //*** Control Status Bar
      this.statusBar.styleDefault();
      this.statusBar.overlaysWebView(false);

      //*** Control Keyboard
      //this.keyboard.disableScroll(true);
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  logout() {
    console.log("signOut");
    this.authService.signOut()
      .then(result => {
        this.nav.setRoot(LoginPage);
      });
  }

  sair() {
    console.log("signOut");
    this.authService.signOut()
      .then(result => {
        this.nav.push(LoginPage);
      });
  }
}

