import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/Users';
import { ServiceUsers } from 'src/app/services/serviceUsers';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.page.html',
  styleUrls: ['./profil.page.scss'],
})
export class ProfilPage implements OnInit {

  su : ServiceUsers = new ServiceUsers(this.db)
  user : User = new User('')
  photoURL: string
  age : string
  
  constructor(private db: AngularFireDatabase, private route: ActivatedRoute, private storage: AngularFireStorage) { }

  ngOnInit() {
    this.su.get(this.route.snapshot.params['id']).then(u => {
      this.user = u
      this.age = this.getAge(new Date(u.birth)) + " ans"
      this.storage.ref(`profile/${this.route.snapshot.params['id']}`).getDownloadURL()
      .subscribe(e => this.photoURL = e)
    })
  }

  getAge(date) { 
    let diff = Date.now() - date.getTime();
    let age = new Date(diff); 
    return Math.abs(age.getUTCFullYear() - 1970);
  }

}
