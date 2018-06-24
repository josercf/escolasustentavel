import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ActivityDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-activity-details',
  templateUrl: 'activity-details.html',
})
export class ActivityDetailsPage {

  dataActivity: any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.dataActivity = navParams.get('data');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ActivityDetailsPage');
  }

}
