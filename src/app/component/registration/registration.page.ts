import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from "@angular/router";
import { User } from '../../models/Users';
import { ServiceUsers } from '../../services/serviceUsers';
@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {
  form : FormGroup;
  error : boolean;
  errorMessage : string;
  serviceUsers : ServiceUsers = new ServiceUsers(this.db);

  constructor(
    public router: Router,
    private db: AngularFireDatabase
  ) {
    this.form = new FormGroup({
      email : new FormControl(),
      firstname : new FormControl(),
      lastname : new FormControl(),
      password : new FormControl(),
      description : new FormControl(),
      pseudo : new FormControl()
    });
    this.error = false;
  }
  ngOnInit(){
  }



  inscription(){
      this.serviceUsers.exist(this.form.value.pseudo)
      .then(isNotAvailable => {
        if(!isNotAvailable) { // L'utilisateur n'existe pas
          let u : User = new User(this.form.value.email
            ,this.form.value.firstname
            ,this.form.value.lastname
            ,"todo" // image de profil
            ,this.form.value.description
            ,this.form.value.pseudo,
            this.form.value.password)
          this.serviceUsers.create(u);
          this.router.navigateByUrl("/login")
        } else {
          this.error = true;
          this.errorMessage = "L'utilisateur existe déjà"
        }
      })
  }


}
