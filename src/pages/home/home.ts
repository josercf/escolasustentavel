import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, Events } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { SocialUser } from 'angularx-social-login';
import { Http, Response } from '@angular/http';

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
  private locations: any[] = [{
    Id: '123456-7890',
    Name: 'Uninove - Memorial',
    Description: 'A escola xpto precisa de bandeirinhas para a festa junina que acontecerá dia 20/08',
    Position: {
      lat: -23.528869,
      lng: -46.665706
    }
  },
  {
    Id: '123456-7891',
    Name: 'Uninove - Memorial D',
    Description: 'A escola xpto precisa de bandeirinhas para a festa junina que acontecerá dia 20/08',
    Position: {
      lat: -23.526748,
      lng: -46.667659
    },
  }];

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public menuCtrl: MenuController,
    private geolocation: Geolocation) {
    this.user = navParams.get('user');
  }

  ionViewDidLoad() {

    // this.http.get('https://www.reddit.com/r/gifs/new/.json?limit=10')
    //          .map(res => res.json())
    //          .subscribe(data => {
    //             this.locations = data.data.children;
    //           });

    this.geolocation.getCurrentPosition()
      .then((resp) => {
        const position = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);

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

        this.loadLocations(this.map);
      }).catch((error) => {
        console.log('Erro ao recuperar sua posição', error);
      });
  }

  loadLocations(map: any) {

    var i = 1;

    this.locations.forEach(element => {

      var contentString =
        '<div class = "card">' +
        '   <div class = "item item-avatar">' +
        //'      <img src = "my-image.png">'+
        `      <h2>${element.Name}</h2>` +
        '   </div>' +
        '         ' +
        '   <div class = "item item-body">' +
        `     ${element.Description}` +
        '   </div>' +
        '   <div class = "item item-divider">' +
        `     <a href="/details/${element.Id}">Clique e colabore<a/>` +
        '     <i class="icon ion-heart"></i>' +
        '   </div>' +
        '</div>';

      var infowindow = new google.maps.InfoWindow({
        content: contentString
      });

      var marker = new google.maps.Marker({
        position: element.Position,
        map: map,
        title: element.Name,
        icon: ''
      });
      marker.addListener('click', function () {
        infowindow.open(map, marker);
      });

    });
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
