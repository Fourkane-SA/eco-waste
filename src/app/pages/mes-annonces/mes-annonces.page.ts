import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Router } from '@angular/router';
import { Annonce } from 'src/app/models/Annonce';
import { ServiceAnnonce } from 'src/app/services/ServiceAnnonce';


@Component({
  selector: 'app-mes-annonces',
  templateUrl: './mes-annonces.page.html',
  styleUrls: ['./mes-annonces.page.scss'],
})
export class MesAnnoncesPage implements OnInit {
  goToMap() {
    window.location.pathname = '/tab/map'
  }
  sa : ServiceAnnonce = new ServiceAnnonce(this.db)
  mesannonces : Annonce[] = []

  constructor(public router: Router,private db: AngularFireDatabase) { }

  ngOnInit() {
    this.sa.getAll()
    .then(res =>  {
      console.log(res)
      //this.mesannonces = Object.values(res)
      this.mesannonces = Object.values(res).filter(annonce => annonce.uid === localStorage.uid)
  })
  }
}








