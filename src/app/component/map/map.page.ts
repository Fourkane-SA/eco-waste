import { Component, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import '@geoman-io/leaflet-geoman-free';

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements AfterViewInit {
  private map : L.Map;

  posX : number = 45.7663;
  posY : number = 4.8883;


  setPosition(position) {
    this.posX = position.coords.latitude
    this.posY = position.coords.longitude
    this.map.flyTo(L.latLng(this.posX, this.posY))
    
  }

  private initMap(): void {
    var x = 45.7663
    var y = 4.8883
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(pos => this.setPosition(pos))
    }
    this.map = L.map('map', {
      center: [ this.posX, this.posY ],
      zoom: 13
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);

    let MyLeafletControl = L.Control.extend({
      options: {
        position: 'bottomright'
      }
    })
    
  }

  constructor() { 
    this.posX = 45.7663
    this.posY = 4.8883
  }

  ngAfterViewInit() {
    this.initMap();
  }

}
