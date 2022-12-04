import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { ActivatedRoute } from '@angular/router';
import { Comments } from 'src/app/models/Comments';
import { User } from 'src/app/models/Users';
import { ServiceComments } from 'src/app/services/ServiceComments';
import { ServiceUsers } from 'src/app/services/serviceUsers';

@Component({
  selector: 'app-noter-mes-vendeurs',
  templateUrl: './noter-mes-vendeurs.page.html',
  styleUrls: ['./noter-mes-vendeurs.page.scss'],
})
export class NoterMesVendeursPage implements OnInit {

  su : ServiceUsers = new ServiceUsers(this.db)
  user : User = new User('')
  photoURL: string = ""
  comment: string
  bloquer: string
  signaler : boolean = false
  score : number = 0
  sc : ServiceComments = new ServiceComments(this.db)
  constructor(private storage: AngularFireStorage, private route: ActivatedRoute, private db: AngularFireDatabase) { }

  async ngOnInit() {
    this.user = await this.su.get(this.route.snapshot.params['uid'])
    this.storage.ref(`profile/${this.route.snapshot.params['uid']}`).getDownloadURL()
      .subscribe(e => this.photoURL = e)
  }

  note(n : number) {
    this.score = n
    for(let i=1; i<=5; i++) {
      let doc = document.getElementById(i.toString())
      if(i <= n)
        doc.setAttribute('src', '/assets/images/StarFilled.svg')
      else
        doc.setAttribute('src', '/assets/images/Star.svg')
    }
  }

  signalOK() {
    this.signaler = true
  }

  formValid() {
    return this.score != 0
  }

  envoyer() {
    let c : Comments = new Comments()
    c.note = this.score
    c.text = this.comment
    c.uid = localStorage.getItem('uid')
    this.sc.create(c, this.route.snapshot.params['uid'])
  }
}
