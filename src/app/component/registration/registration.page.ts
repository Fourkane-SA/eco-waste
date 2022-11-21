import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
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
goToLogin() {this.router.navigateByUrl("/login")}
  form : FormGroup;
  error : boolean;
  errorMessage : string;
  serviceUsers : ServiceUsers = new ServiceUsers(this.db);

  constructor(
    public router: Router,
    private db: AngularFireDatabase,
     public ngFireAuth: AngularFireAuth
  ) {
    this.form = new FormGroup({
      email : new FormControl(),
      password : new FormControl(),
      password2 : new FormControl()
    });
    this.error = false;
  }
  ngOnInit(){
  }



  inscription(){
    if(this.form.value.password === this.form.value.password2) {
      this.ngFireAuth.createUserWithEmailAndPassword(this.form.value.email, this.form.value.password)
      .then(u => {
        let user : User = new User(this.form.value.email)
        this.serviceUsers.create(user, u.user.uid)
        this.router.navigateByUrl("/login")
      })
      .catch(e => {
        if(e.code == "auth/email-already-in-use")
          this.errorMessage = "Cette adresse mail est déjà utiilsée"
        else if (e.code == "auth/weak-password")
          this.errorMessage = "Le mot de passe doit contenir au moins 6 caractères"
        else
          this.errorMessage = "Une erreur a eu lieu lors de la connexion avec le serveur"
        this.error = true
      })
    } else {
      this.error = true;
      this.errorMessage = "Les mots de passe ne correspondent pas"
    }
    
  }


}
