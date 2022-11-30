import { Component, Input, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Annonce } from 'src/app/models/Annonce';
import { User } from 'src/app/models/Users';
import { ServiceAnnonce } from 'src/app/services/ServiceAnnonce';
import { ServiceUsers } from 'src/app/services/serviceUsers';

@Component({
  selector: 'app-annonce-home',
  templateUrl: './annonce-home.component.html',
  styleUrls: ['./annonce-home.component.scss'],
})
export class AnnonceHomeComponent implements OnInit {

  sa : ServiceAnnonce = new ServiceAnnonce(this.db)
  su : ServiceUsers = new ServiceUsers(this.db)
  @Input() annonceId : string = ""
  annonce : Annonce = new Annonce('','','','','','')
  annonceImageURL : string = ""
  userImageURL : string = ""
  fav : boolean = false
  user: User;
  
  constructor(private db: AngularFireDatabase,private storage: AngularFireStorage) { }

  ngOnInit() {
    this.sa.get(this.annonceId)
    .then(res =>  {
      this.annonce = res
      this.storage.ref(`profile/${this.annonce.uid}`) // on recupère l'image de l'auteur de la publication 
      .getDownloadURL()
      .toPromise()
      .then(e => this.userImageURL = e)
      this.storage.ref(`annonce/${this.annonce.id}`) // On recupère l'image de la photo
      .getDownloadURL()
      .toPromise()
      .then(e => this.annonceImageURL = e)
      this.su.get(localStorage.getItem('uid')).then(res => {
          this.user = res;
          if(this.user.favoris == undefined)
            this.user.favoris = []
          if(this.user.favoris.includes(this.annonce.id))
            this.fav = true
        })
  })
  }

}
