import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { serviceProduits } from 'src/app/services/serviceProduits';
import * as L from 'leaflet';

@Component({
  selector: 'app-poster-annonce',
  templateUrl: './poster-annonce.page.html',
  styleUrls: ['./poster-annonce.page.scss'],
})
export class PosterAnnoncePage implements AfterViewInit {

  sp : serviceProduits = new serviceProduits(this.db)
  aliments : any
  private map : L.Map;
  posX : number = 45.7663;
  posY : number = 4.8883;
  isOpen: boolean = false
  relaiPoint: L.LatLng[] = []
  icon : L.Icon
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

  }

  constructor(private db: AngularFireDatabase) { }

  async ngAfterViewInit() {
    let aliments = await this.sp.getAll()
    this.aliments = Object.values(aliments)
    this.initMap();
  }


}
