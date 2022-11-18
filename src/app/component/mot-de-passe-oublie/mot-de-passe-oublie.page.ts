import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mot-de-passe-oublie',
  templateUrl: './mot-de-passe-oublie.page.html',
  styleUrls: ['./mot-de-passe-oublie.page.scss'],
})
export class MotDePasseOubliePage implements OnInit {
goToLogin() {this.router.navigateByUrl('/login')}
error: any;
errorMessage: any;
reset() {
  this.ngFireAuth.sendPasswordResetEmail(this.form.value.email)
  .then(res => {
    console.log(res) // TODO
  })
   .catch(e => {
    console.log(e)
   })
}
form: any;

  constructor(
    public router: Router,
    public ngFireAuth: AngularFireAuth) { 
      this.form = new FormGroup({
        email : new FormControl()
    })
    }

  ngOnInit() {
  }

}
