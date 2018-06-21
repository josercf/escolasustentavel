import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { SocialUser, AuthService } from '../../../node_modules/angularx-social-login';
import { Observable } from '../../../node_modules/rxjs';
import { map } from '../../../node_modules/rxjs/operator/map';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  posts: any[] = [];
  public user: SocialUser;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private authService: AuthService,
    public menuCtrl: MenuController, ) {

    this.authService.authState.subscribe((user) => {
      this.user = user;
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

  openMenu() {
    console.log('openMenu');
    this.menuCtrl.open();
  }

  closeMenu() {
    console.log('closeMenu');
    this.menuCtrl.close();
  }

  toggleMenu() {
    console.log('toggleMenu');
    this.menuCtrl.toggle();
  }

  openPage(page) {
    console.log('openPage');
    this.navCtrl.push(page.component);
  }

}
