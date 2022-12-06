import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Router } from '@angular/router';
import { Annonce } from 'src/app/models/Annonce';
import { ServiceAnnonce } from 'src/app/services/ServiceAnnonce';

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
  annonces : Annonce[] = []
  allAnnonces : Annonce[] = []
  search : string

  constructor(public router: Router,private db: AngularFireDatabase) { }

  ngOnInit() {
    this.sa.getAll()
    .then(res =>  {
      this.annonces = Object.values(res)
      this.annonces = this.annonces
        .filter(annonce => annonce.uid != localStorage.getItem('uid'))
        .filter(annonce => annonce.reserve == false)
      this.allAnnonces = this.annonces
  })
  }
  update() {
    this.annonces = this.allAnnonces.filter(annonce => annonce.title.toLowerCase().includes(this.search.toLowerCase()))
  }
}
