import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { ActivatedRoute, Router } from '@angular/router';
import { Annonce } from 'src/app/models/Annonce';
import { ServiceAnnonce } from 'src/app/services/ServiceAnnonce';

@Component({
  selector: 'app-annonce',
  templateUrl: './annonce.page.html',
  styleUrls: ['./annonce.page.scss'],
})
export class AnnoncePage implements OnInit {

  sa : ServiceAnnonce = new ServiceAnnonce(this.db)
  annonce: Annonce
  userPhoto : string
  annoncePhoto: string

  constructor(private db: AngularFireDatabase, private route: ActivatedRoute,public router: Router,private storage: AngularFireStorage) { }

  ngOnInit() {
    this.sa.get(this.route.snapshot.params['id']) // Recupere l'annonce via l'url
    .then(annonce => this.annonce = annonce)
    .finally(() => {
      if(this.annonce === null) // Si aucune annonce n'a été trouvée
        this.router.navigateByUrl('tab/accueil') // redirection vers la page d'accueil
      this.storage.ref(`profile/${this.annonce.uid}`) // Sinon, on recupère l'image de l'auteur de la publication 
      .getDownloadURL()
      .subscribe(e => this.userPhoto = e)
      this.storage.ref(`annonce/${this.annonce.id}`) // On recupère l'image de la photo
      .getDownloadURL()
      .subscribe(e => this.annoncePhoto = e)
    })
  }

}
