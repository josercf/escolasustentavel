import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';

/**
 * Generated class for the MyActionsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-actions',
  templateUrl: 'my-actions.html',
})
export class MyActionsPage {

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public menuCtrl: MenuController) {


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyActionsPage');
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
