import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { ActivatedRoute, Router } from '@angular/router';
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
  sa : ServiceAnnonce = new ServiceAnnonce(this.db)
  sp : serviceProduits = new serviceProduits(this.db)
  su : ServiceUsers = new ServiceUsers(this.db)
  annonce : Annonce = new Annonce('','','','','','')
  userPhoto : string = ""
  annoncePhoto: string = ""
  alimentPhoto: string = ""
  fav : boolean = false
  user: User;

  constructor(private db: AngularFireDatabase, private route: ActivatedRoute,public router: Router,private storage: AngularFireStorage) {
    
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
      this.storage.ref(`annonce/${this.annonce.id}`) // On recupère l'image de la photo
      .getDownloadURL()
      .toPromise()
      .then(e => this.annoncePhoto = e)
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
          console.log(this.user)
        })
      })
      
    })
    
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
