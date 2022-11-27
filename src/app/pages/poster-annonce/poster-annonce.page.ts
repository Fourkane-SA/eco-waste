import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { serviceProduits } from 'src/app/services/serviceProduits';
import * as L from 'leaflet';
import { Annonce } from 'src/app/models/Annonce';
import { ServiceAnnonce } from 'src/app/services/ServiceAnnonce';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-poster-annonce',
  templateUrl: './poster-annonce.page.html',
  styleUrls: ['./poster-annonce.page.scss'],
})
export class PosterAnnoncePage implements AfterViewInit {
  downloadURL: any;
  fb: any;
  
  updateRadioValue($event: any) {
    this.aliment = $event.detail.value
  }
  

  sp : serviceProduits = new serviceProduits(this.db)
  sa : ServiceAnnonce = new ServiceAnnonce(this.db)
  aliments : any
  private map : L.Map;
  posX : number = 45.7663;
  posY : number = 4.8883;
  isOpen: boolean = false
  relaiPoint: L.LatLng[] = []
  icon : L.Icon
  point: string = undefined
  id : string = ""
  description: string;
  aliment : string = undefined
  photoSend: boolean = false;

  //Met à joru la position
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
      .on('click',(evt) => {
        this.point = evt.target.options.title
      })
      .addTo(this.map)
    }))


  }

  constructor(private db: AngularFireDatabase, private storage: AngularFireStorage,public router: Router) {
    // Génération aléatoire de l'identifiant de l'annonce
    var randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for(let i = 0; i < 20; i++) {
      this.id += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
    }
   }

  async ngAfterViewInit() {
    // Initialise la liste des aliments et la map
    let aliments = await this.sp.getAll()
    this.aliments = Object.values(aliments)
    this.initMap();
  }

  //Vérifie que tous les champs obligatoires ont été postés et crée une nouvelle annonce
  poster() {
    let annonce : Annonce = new Annonce(this.aliment, this.description, this.id, localStorage.getItem('uid'), this.point)
    if(this.aliment === undefined) {
      alert("Veuillez choisir un aliment")
    } else if (this.description === undefined) {
      alert("Veuillez entrer une description")
    } else if (!this.photoSend) {
      alert("Veuillez choisir une photo")
    } else if (this.point === undefined) {
      alert("Veuillez choisir un point relais")
    } else{
      this.sa.create(annonce, this.id) // Crée une nouvelle annonce
      this.router.navigate(['tab', 'annonce', this.id]) // redirige vers la nouvelle annonce
    }
  }

  // permet d'upload une image
  onFileSelected(event) {
    const file = event.target.files[0];
    const filePath = `annonce/${this.id}`
    const fileRef = this.storage.ref(filePath);
    
    const task = this.storage.upload(`annonce/${this.id}`, file);
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.downloadURL = fileRef.getDownloadURL();
          this.downloadURL.subscribe(url => {
            if (url) {
              this.fb = url;
              this.photoSend = true
            }
            console.log(this.fb);
          });
        })
      )
      .subscribe(url => {
        if (url) {
          console.log(url);
        }
      });
  }

}
