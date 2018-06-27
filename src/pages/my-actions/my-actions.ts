import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { ActivityDetailsPage } from '../activity-details/activity-details';
import { ActivityService } from '../services/activity-service';

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

  locations: any[] = [];
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public menuCtrl: MenuController,
    private activityService: ActivityService) {


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyActionsPage');
    this.loadServerActivities().then(x => console.log('itens loaded'));
  }

  async loadServerActivities() {
    this.activityService.list()
      .subscribe(data => {
        this.locations = data;
      });
  }

  ir(element: any) {
    console.log("link clicked " + element.description);
    this.navCtrl.push(ActivityDetailsPage, { data: element, showMapLink: true });
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
