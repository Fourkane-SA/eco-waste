import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { FormControl, FormGroup } from '@angular/forms';
import { ServiceUsers } from 'src/app/services/serviceUsers';

@Component({
  selector: 'app-edit-profil',
  templateUrl: './edit-profil.page.html',
  styleUrls: ['./edit-profil.page.scss'],
})
export class EditProfilPage implements OnInit {
  form: FormGroup;
  serviceUser : ServiceUsers =  new ServiceUsers(this.db)
  prenom: string;
  nom: string;
  age: string;
  ville: string;
  bio: string;
  bmessages: boolean;
  bactus: boolean;
  bhonneur: boolean;
  bdonnees: boolean;
  constructor(private db: AngularFireDatabase,) { 
    this.form = new FormGroup({
      firstname: new FormControl(),
      lastname: new FormControl(),
      age: new FormControl(),
      postalCode: new FormControl(),
      bio: new FormControl(),
      bmessages: new FormControl(),
      bnews: new FormControl(),
      bhonor: new FormControl(),
      bdata: new FormControl()
    })
  }

  async ngOnInit() {
    let user = await this.serviceUser.get(localStorage.getItem('uid'))
    console.log(user)
    if(user.firstname != undefined)
      this.prenom = user.firstname
    if(user.lastname != undefined)
      this.nom = user.lastname
    if(user.age != undefined)
      this.age = user.age
    if(user.postalCode != undefined)
      this.ville = user.postalCode
    if(user.bio != undefined)
      this.bio = user.bio
    if(user.bmessages)
      this.bmessages = true
    if(user.bnews)
      this.bactus = true
    if(user.bhonor)
      this.bhonneur = true
    if(user.bdata)
      this.bdonnees = true
  }

  update() {
    this.serviceUser.get(localStorage.getItem('uid'))
    .then(u => {
      u.firstname = this.form.value.firstname
      u.lastname = this.form.value.lastname
      u.age = this.form.value.age
      u.postalCode = this.form.value.postalCode
      u.bio = this.form.value.bio
      u.bmessages = this.form.value.bmessages
      u.bnews = this.form.value.bnews
      u.bhonor = this.form.value.bhonor
      u.bdata = this.form.value.bdata
      console.log(u)
      this.serviceUser.update(u, localStorage.getItem('uid'))
    })
  }
}
