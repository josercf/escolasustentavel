import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, Events } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { SocialUser } from 'angularx-social-login';
import { Http, Response } from '@angular/http';
import { ActivityDetailsPage } from '../activity-details/activity-details';
import { ActivityService } from '../services/activity-service';

declare var google;

/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  map: any;
  private user: SocialUser;
  private markers: any[] = [];
  private locations: any[] = [];

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public menuCtrl: MenuController,
    private geolocation: Geolocation,
    private activityService: ActivityService) {
    this.user = navParams.get('user');
  }



  ionViewDidLoad() {

    this.geolocation.getCurrentPosition()
      .then((resp) => {

         const position = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);

        //const position = new google.maps.LatLng(-23.5538591, -46.6401798);

        const mapOptions = {
          zoom: 18,
          center: position,
          disableDefaultUI: true
        }

        this.map = new google.maps.Map(document.getElementById('map'), mapOptions);

        const marker = new google.maps.Marker({
          position: position,
          map: this.map
        });

        this.loadServerActivities();
      }).catch((error) => {
        console.log('Erro ao recuperar sua posição', error);
      });
  }

   async loadServerActivities(){
    this.activityService.list()
    .subscribe(data =>{
      this.locations = data;
      this.loadLocations(this.map);
    })
  }

  loadLocations(map: any) {
    this.locations.forEach(element => {
      
      var contentString =
        '<div class = "card">' +
        '   <div class = "container-img-location">' +
        '      <img class="location" src="../../assets/imgs/96PX.png" alt="">' +
        '      <img class="texto-complementar" src="../../assets/imgs/Texto_complementar.png" alt="">' +

        '   </div>' +
        `      <h5>${element.name}</h5>` +
        '         ' +
        '   <div class = "item item-body">' +
        `     ${element.description}` +
        '   </div>' +
        '   <div class = "item item-divider">' +
        `     <p class="details">Ver ação<p/>` +
        '   </div>' +
        '</div>';

      var infowindow = new google.maps.InfoWindow({
        content: contentString
      });

      var pinColor = "2CAF18";
      var pinImage = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + pinColor,
        new google.maps.Size(21, 34),
        new google.maps.Point(0, 0),
        new google.maps.Point(10, 34));

      var marker = new google.maps.Marker({
        position: element.position,
        map: map,
        title: element.name,
        icon: pinImage,
      });

      google.maps.event.addListenerOnce(infowindow, 'domready', () => {
        let elements = document.getElementsByClassName('details');

        for (var i = 0; i < elements.length; i++) {
          elements.item(i).addEventListener('click', () => {
            this.ir(element);
          });
        }
      });

      marker.addListener('click', function () {
        infowindow.open(map, marker);
      });
    });
  }

  ir(element: any) {
    console.log("link clicked " + element.description);
    this.navCtrl.push(ActivityDetailsPage, { data: element });
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
