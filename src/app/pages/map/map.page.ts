import { Component, AfterViewInit, ViewChild } from '@angular/core';
import * as L from 'leaflet';
import '@geoman-io/leaflet-geoman-free';
import { Router } from '@angular/router';
import { AngularFireDatabase } from '@angular/fire/compat/database';


@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})



export class MapPage implements AfterViewInit {
  goToHome() {
    this.router.navigateByUrl('/tab/accueil')
  }
  
  

  private map : L.Map;

  posX : number = 45.7663;
  posY : number = 4.8883;
  isOpen: boolean = false
  relaiPoint: L.LatLng[] = []
  icon : L.Icon
  @ViewChild('popover') popover;
  
  // Permet l'ouverture de la fenetre des 
  openPopOver(e: Event) {
    this.popover.event = e;
    this.isOpen = true;
  }

  // Met à jour la position sur la map
  setPosition(position) {
    
    this.posX = position.coords.latitude
    this.posY = position.coords.longitude
    this.map.flyTo(L.latLng(this.posX, this.posY))
    
  }

  // Initialise la map
  private initMap(): void {
    var x = 45.7663
    var y = 4.8883
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(pos => this.setPosition(pos))
    }
    this.map = L.map('map', {
      center: [ this.posX, this.posY ],
      zoom: 13,
      zoomControl: false
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });
    tiles.addTo(this.map);

    this.icon = L.icon({
      iconUrl: '/assets/images/marker.svg',
      iconSize: [38, 95],
    })

    this.db.database.ref('relaiPoint/').get()
    .then(res => res.forEach(data => {
      L.marker([data.val().lat,data.val().lng], {
        icon: this.icon,
        title: data.val().name
      })
      .on('click',clickMarker)
      .addTo(this.map)
    }))


    function clickMarker() {
      alert(this.options.title)
    }

    // Pour ajouter des points relais dans la BDD en cliquant sur la map
    /*this.map.on('click', e => {
      let marker = L.marker(e.latlng, {
        icon: this.icon
      })
      marker.addTo(this.map)
      this.relaiPoint.push(e.latlng)
      this.db.database.ref('/relaiPoint').push(e.latlng)

    })*/

  }
  
  constructor(public router: Router,private db: AngularFireDatabase) { 
    this.posX = 45.7663
    this.posY = 4.8883
  }

  ngAfterViewInit() {
    this.initMap();
  }

}
