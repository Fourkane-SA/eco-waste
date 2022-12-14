import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Annonce } from 'src/app/models/Annonce';
import { User } from 'src/app/models/Users';
import { ServiceAnnonce } from 'src/app/services/ServiceAnnonce';
import { ServiceUsers } from 'src/app/services/serviceUsers';

@Component({
  selector: 'app-articles',
  templateUrl: './accueil.page.html',
  styleUrls: ['./accueil.page.scss'],
})
export class AccueilPage implements OnInit {
  goToMap() {
    window.location.pathname = '/tab/map'
  }

  sa : ServiceAnnonce = new ServiceAnnonce(this.db)
  su : ServiceUsers = new ServiceUsers(this.db)
  annonces : Annonce[] = []
  allAnnonces : Annonce[] = []
  search : string

  constructor(public route: Router,private db: AngularFireDatabase, private alertController: AlertController) { }

  ngOnInit() {
    this.sa.getAll()
    .then(res =>  {
      this.annonces = Object.values(res)
      this.annonces = this.annonces
        .filter(annonce => annonce.uid != localStorage.getItem('uid'))
        .filter(annonce => annonce.reserve == false)
        .filter(annonce => {
          if(annonce.userReserveID == undefined)
            return true
          if(annonce.userReserveID.includes(localStorage.getItem('uid')))
            return false
          return true
        })
       //.filter(annonce => annonce.userReserveID == undefined)
      this.allAnnonces = this.annonces
      console.log(this.annonces)
  })
  }
  update() {
    this.annonces = this.allAnnonces.filter(annonce => annonce.title.toLowerCase().includes(this.search.toLowerCase()))
  }

  async goToPosterAnnonce() {
   let me : User = await this.su.get(localStorage.getItem('uid'))
   console.log(me)
    if(me.firstname == "") {
       const alert = await this.alertController.create({
        header: 'Profil incomplet',
        message: 'Remplissez votre profil afin de pouvoir poster une annonce',
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
        this.route.navigateByUrl('/tab/edit-profil')
      }
    } else {
      window.location.href = window.location.origin + "/tab/poster-annonce"
      //this.route.navigateByUrl('/tab/poster-annonce')
    }
  }
}
