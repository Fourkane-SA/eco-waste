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
goToMdpOublie() {this.router.navigateByUrl("/mot-de-passe-oublie")}
goToRegister() {this.router.navigateByUrl("/registration")}
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
  ngOnInit() {
    
  }
  login() {
    
    let email = this.form.value.email;
    let password = this.form.value.password;
    this.ngFireAuth.signInWithEmailAndPassword(email, password)
    .then((u) => {
      localStorage.setItem('uid', u.user.uid)
          this.router.navigateByUrl('/tab/accueil')
    })
    .catch(e => {
      if(e.message.includes("(auth/wrong-password)")) {
        this.errorMessage = "Mot de passe incorrect"
        document.getElementById('password').className+= " animate__animated animate__headShake"
      }
      else if (e.message.includes("(auth/user-not-found)")) {
        this.errorMessage = "Aucun compte n'est associée à cette adresse mail"
        document.getElementById('email').className+= " animate__animated animate__headShake"
      }
      else if (e.message.includes("(auth/invalid-email)")) {
        this.errorMessage = "Veuillez entrer une adresse mail valide"
        document.getElementById('email').className+= " animate__animated animate__headShake"
      }
      else {
        this.errorMessage = "Erreur lors de la connexion avec le serveur"
      }
        
      this.error = true;
      
      //document.querySelectorAll('ion-item').forEach(res => res.className = "errorBorder")
      //document.querySelector('h1').className = "error";
      //document.querySelectorAll('strong').forEach(res => res.className += " error")
    })

  }
  
}
