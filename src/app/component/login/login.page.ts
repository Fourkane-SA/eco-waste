import { Component,OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from "@angular/router";
import { ServiceUsers } from '../../services/serviceUsers';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
goToRegister() {location.pathname="/registration"}
  form : FormGroup;
  error : boolean;
  errorMessage : string;
  serviceUsers: ServiceUsers = new ServiceUsers(this.db);

  constructor(
    public router: Router,
    private db: AngularFireDatabase,
    public ngFireAuth: AngularFireAuth
  ) {
    this.form = new FormGroup({
      email : new FormControl(),
      password : new FormControl()
    })
  }
  ngOnInit() {}
  login() {
    
    let email = this.form.value.email;
    let password = this.form.value.password;
    this.ngFireAuth.signInWithEmailAndPassword(email, password)
    .then((u) => {
      localStorage.setItem('uid', u.user.uid)
          this.router.navigateByUrl('/tab/accueil')
    })
    .catch(e => {
      if(e.message.includes("(auth/wrong-password)"))
        this.errorMessage = "Mot de passe incorrect"
      else if (e.message.includes("(auth/user-not-found)"))
        this.errorMessage = "Aucun compte n'est associée à cette adresse mail"
      else if (e.message.includes("(auth/invalid-email)"))
        this.errorMessage = "Veuillez entrer un mot de passe valide"
      else
        this.errorMessage = "Erreur lors de la connexion avec le serveur"
      this.error = true;
    })
    /*this.serviceUsers.get(login)
    .then(u => {
      if(u != null) {
        if(password == u.password) {
          
        } else {
          this.error = true;
          this.errorMessage = "Le mot de passe est incorrect"
        }
      } else {
        this.error = true;
        this.errorMessage = "L'utilisateur n'existe pas"
      }

    })*/

  }
  
}
