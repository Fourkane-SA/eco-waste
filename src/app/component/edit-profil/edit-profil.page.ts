import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { ServiceUsers } from 'src/app/services/serviceUsers';
import { finalize } from "rxjs/operators";

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
  birth: any;
  ville: string;
  bio: string;
  bmessages: boolean;
  bactus: boolean;
  bhonneur: boolean;
  bdonnees: boolean;
  selectedFile: File = null;
  fb;
  downloadURL: Observable<string>;
  url: string;
  constructor(private db: AngularFireDatabase,private storage: AngularFireStorage) { 
    this.form = new FormGroup({
      firstname: new FormControl(),
      lastname: new FormControl(),
      birth: new FormControl(),
      postalCode: new FormControl(),
      bio: new FormControl(),
      bmessages: new FormControl(),
      bnews: new FormControl(),
      bhonor: new FormControl(),
      bdata: new FormControl(),
      img: new FormControl()
    })
  }

  async ngOnInit() {
    let user = await this.serviceUser.get(localStorage.getItem('uid'))
    if(user.firstname != undefined)
      this.prenom = user.firstname
    if(user.lastname != undefined)
      this.nom = user.lastname
    if(user.birth != undefined)
      this.birth = user.birth
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

      this.storage.ref(`profile/${localStorage.getItem('uid')}`).getDownloadURL()
      .toPromise().then(e => this.url = e)
      .catch(() => this.url = "https://ionicframework.com/docs/img/demos/avatar.svg")
  }

  update() {
    this.serviceUser.get(localStorage.getItem('uid'))
    .then(u => {
      u.firstname = this.form.value.firstname
      u.lastname = this.form.value.lastname
      u.birth = this.form.value.birth
      u.postalCode = this.form.value.postalCode
      u.bio = this.form.value.bio
      u.bmessages = this.form.value.bmessages
      u.bnews = this.form.value.bnews
      u.bhonor = this.form.value.bhonor
      u.bdata = this.form.value.bdata
      console.log(this.form.value.img)
      this.serviceUser.update(u, localStorage.getItem('uid'))
    })
  }

  
  onFileSelected(event) {
    const file = event.target.files[0];
    const filePath = `profile/${localStorage.getItem('uid')}`
    const fileRef = this.storage.ref(filePath);
    
    const task = this.storage.upload(`profile/${localStorage.getItem('uid')}`, file);
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.downloadURL = fileRef.getDownloadURL();
          this.downloadURL.subscribe(url => {
            if (url) {
              this.fb = url;
            }
            console.log(this.fb);
          });
        })
      )
      .subscribe(url => {
        if (url) {
          console.log(url);
        }
      });
  }
}
