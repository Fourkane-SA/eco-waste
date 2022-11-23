import { Component, AfterViewInit, ViewChild } from '@angular/core';
import * as L from 'leaflet';
import '@geoman-io/leaflet-geoman-free';
import { Router } from '@angular/router';


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
  @ViewChild('popover') popover;
  
  openPopOver(e: Event) {
    this.popover.event = e;
    this.isOpen = true;
  }

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
      zoom: 13,
      zoomControl: false
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });
    tiles.addTo(this.map);
  }
  
  constructor(public router: Router,) { 
    this.posX = 45.7663
    this.posY = 4.8883
  }

  ngAfterViewInit() {
    this.initMap();
  }

}
