import { Component,OnInit } from '@angular/core';
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
  form : FormGroup;
  error : boolean;
  errorMessage : string;
  serviceUsers: ServiceUsers = new ServiceUsers(this.db);

  constructor(
    public router: Router,
    private db: AngularFireDatabase
  ) {
    this.form = new FormGroup({
      login : new FormControl(),
      password : new FormControl()
    })
  }
  ngOnInit() {}
  login() {
    let login = this.form.value.login;
    let password = this.form.value.password;
    this.serviceUsers.get(login)
    .then(u => {
      if(u != null) {
        if(password == u.password) {
          localStorage.setItem('login', login)
          this.router.navigateByUrl('/articles')
        } else {
          this.error = true;
          this.errorMessage = "Le mot de passe est incorrect"
        }
      } else {
        this.error = true;
        this.errorMessage = "L'utilisateur n'existe pas"
      }

    })

  }
}
