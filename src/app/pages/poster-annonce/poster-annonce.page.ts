import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { serviceProduits } from 'src/app/services/serviceProduits';
import * as L from 'leaflet';
import { Annonce } from 'src/app/models/Annonce';
import { ServiceAnnonce } from 'src/app/services/ServiceAnnonce';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-poster-annonce',
  templateUrl: './poster-annonce.page.html',
  styleUrls: ['./poster-annonce.page.scss'],
})
export class PosterAnnoncePage implements AfterViewInit {
  downloadURL: any;
  fb: any;
  alimentsName: string[];
  
  updateRadioValue($event: any, old : string) {
    if(old != undefined && old == this.aliment)
      document.getElementById(old).setAttribute('checked', 'false')
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
  title : string = ""
  url : string[] = []

  //Met à jour la position
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
      .on('click',async (evt) => {
        const alert = await this.alertController.create({
          header: 'Point relais',
          subHeader: 'Voulez vous choisir ce point relais ?',
          message: evt.target.options.title,
          buttons: [
            {
              text: 'Annuler',
              role: 'cancel',
              handler: () => {},
            },
            {
              text: 'Valider',
              role: 'confirm',
              handler: () => {},
            },
          ],
        });
        await alert.present();
        const { role } = await alert.onDidDismiss();
        if(role == 'confirm') {
          this.point = evt.target.options.title
        }
        
      })
      .addTo(this.map)
    }))


  }

  constructor(private db: AngularFireDatabase, private storage: AngularFireStorage,public router: Router, private route: ActivatedRoute,private alertController: AlertController) {
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
    this.alimentsName = Object.keys(aliments)
    this.initMap();
    if(this.route.snapshot.params['id'] != undefined)
      this.editAnnonce()
  }

  //Vérifie que tous les champs obligatoires ont été postés et crée une nouvelle annonce
  poster() {
    let annonce : Annonce = new Annonce(this.aliment, this.description, this.id, localStorage.getItem('uid'), this.point, this.title, this.url,false)
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
      this.router.navigate(['tab', 'mes-annonces']) 
    }
  }

  // permet d'upload une image
  onFileSelected(event) {
    const file = event.target.files[0];
    const filePath = `annonce/${this.id + Date.now()}`
    const fileRef = this.storage.ref(filePath);
    
    const task = this.storage.upload(`annonce/${this.id + Date.now()}`, file);
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.downloadURL = fileRef.getDownloadURL();
          this.downloadURL.subscribe(url => {
            if (url) {
              this.fb = url;
              
            }
          });
        })
      )
      .subscribe(async url => {
        if (url) {
          this.photoSend = true
          this.url.push(await url.ref.getDownloadURL())
        }
      });

  }

  async editAnnonce() {
    this.id = this.route.snapshot.params['id']
    let annonce : Annonce = await this.sa.get(this.id)
    this.description = annonce.description
    this.point = annonce.relaiId
    this.url = annonce.photos
    this.photoSend = true
    this.title = annonce.title
  }

}
