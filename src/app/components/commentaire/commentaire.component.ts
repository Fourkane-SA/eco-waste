import { Component, Input, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Comments } from 'src/app/models/Comments';
import { User } from 'src/app/models/Users';
import { ServiceUsers } from 'src/app/services/serviceUsers';

@Component({
  selector: 'app-commentaire',
  templateUrl: './commentaire.component.html',
  styleUrls: ['./commentaire.component.scss'],
})
export class CommentaireComponent implements OnInit {

  @Input() uid : string
  @Input() text : string
  @Input() note : Number

  user : User = new User('')
  src : string = ""
  su : ServiceUsers = new ServiceUsers(this.db)
  

  constructor(private db: AngularFireDatabase, private storage: AngularFireStorage) { 
  }

  ngOnInit() {
    this.su.get(this.uid).then(res => this.user = res)
    this.storage.ref(`profile/${this.uid}`).getDownloadURL()
      .subscribe(e => this.src = e)
    let doc = document.getElementById('star')
    for(let i=0; i<this.note; i++) {
      let imgStarFilled = document.createElement('img')
      imgStarFilled.src = "/assets/images/StarFilled.svg"
      imgStarFilled.width = 16
      doc.appendChild(imgStarFilled)
    }
  }

}
