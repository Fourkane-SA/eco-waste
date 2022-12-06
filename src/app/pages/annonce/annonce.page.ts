import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Annonce } from 'src/app/models/Annonce';
import { User } from 'src/app/models/Users';
import { ServiceAnnonce } from 'src/app/services/ServiceAnnonce';
import { serviceProduits } from 'src/app/services/serviceProduits';
import { ServiceUsers } from 'src/app/services/serviceUsers';

@Component({
  selector: 'app-annonce',
  templateUrl: './annonce.page.html',
  styleUrls: ['./annonce.page.scss'],
})
export class AnnoncePage implements OnInit {
  async goToConv() {
    let me : User = await this.su.get(localStorage.getItem('uid'))
    if(me.firstname == "") {
       const alert = await this.alertController.create({
      header: 'Profil incomplet',
      message: 'Remplissez votre profil afin de pouvoir réserver un produit',
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel',
          handler: () => {},
        },
        {
          text: 'Remplir le profil',
          role: 'confirm',
          handler: () => {},
        },
      ],
    });

    await alert.present();
    const { role } = await alert.onDidDismiss();
    if(role == 'confirm') {
      this.router.navigateByUrl('/tab/edit-profil')
    }

    }
    else {
      if(me.vendeurs == undefined)
      me.vendeurs = []  
    if(!me.vendeurs.includes(this.annonce.uid))
      me.vendeurs.push(this.annonce.uid)
    if(me.contactAnnonce == undefined)
      me.contactAnnonce = []
    if(!me.contactAnnonce.includes(this.route.snapshot.params['id']))
      me.contactAnnonce.push(this.route.snapshot.params['id'])
    this.su.update(me, localStorage.getItem('uid'))
    this.router.navigate(['tab', 'conversation', this.annonce.uid, this.route.snapshot.params['id']])
    }
    
  }
  async pointRelai() {
    const relaiPoint = await this.db.database.ref('relaiPoint/').get()
    const alert = await this.alertController.create({
        header: "Point relais",
        message: this.annonce.relaiId
      })
      await alert.present()
  }
  sa : ServiceAnnonce = new ServiceAnnonce(this.db)
  sp : serviceProduits = new serviceProduits(this.db)
  su : ServiceUsers = new ServiceUsers(this.db)
  annonce : Annonce = new Annonce('','','','','','',[],false)
  userPhoto : string = ""
  alimentPhoto: string = ""
  annoncePhoto: string = ""
  fav : boolean = false
  user: User;

  constructor(private db: AngularFireDatabase, private route: ActivatedRoute,public router: Router,private storage: AngularFireStorage, private alertController: AlertController) {
    
   }

  updateCircle(n : Number) {
    this.annoncePhoto = this.annonce.photos[n.toString()]
    let doc = document.getElementById('ellipse')
    doc.innerHTML = ""
    for(let i=0; i<this.annonce.photos.length; i++) {
        let img = document.createElement('img')
        img.width = 20
        img.style.marginLeft = "5px"
        img.style.marginTop = "10px"
        img.onclick = () => this.updateCircle(i)
        if(i == n)
          img.src = "/assets/images/EllipseFilled.svg"
        else
          img.src = "/assets/images/Ellipse.svg"
        doc.appendChild(img)
      }
  }

  ngOnInit() {
    this.sa.get(this.route.snapshot.params['id']) // Recupere l'annonce via l'url
    .then(annonce => this.annonce = annonce)
    .then(() => {
      if(this.annonce === null) // Si aucune annonce n'a été trouvée
        this.router.navigateByUrl('tab/accueil') // redirection vers la page d'accueil
      this.storage.ref(`profile/${this.annonce.uid}`) // Sinon, on recupère l'image de l'auteur de la publication 
      .getDownloadURL()
      .toPromise()
      .then(e => this.userPhoto = e)
      this.updateCircle(0)
      this.sp.getAll()
      .then(res => {
        let tab = Object.values(res)
        let aliment = tab.find(al => al['name'] == this.annonce.aliment)
        this.alimentPhoto = aliment['image']
        this.su.get(localStorage.getItem('uid')).then(res => {
          this.user = res;
          if(this.user.favoris == undefined)
            this.user.favoris = []
          if(this.user.favoris.includes(this.annonce.id))
            this.fav = true
        })
      })
      
    })
  if(this.userPhoto == "")
    this.userPhoto = 'https://ionicframework.com/docs/img/demos/avatar.svg'
  
  }

  updateFavoris() {
    let index = this.user.favoris.indexOf(this.annonce.id)
    if(index >= 0)
      this.user.favoris.splice(index, 1)
    else
      this.user.favoris.push(this.annonce.id)
    this.su.update(this.user, localStorage.getItem('uid'))
    this.fav = !this.fav
      
  }

}
