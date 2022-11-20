import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-mise-ajour-mot-de-passe',
  templateUrl: './mise-ajour-mot-de-passe.page.html',
  styleUrls: ['./mise-ajour-mot-de-passe.page.scss'],
})
export class MiseAJourMotDePassePage implements OnInit {
goToLogin() {this.router.navigateByUrl('/login')}
  error: any;
  errorMessage: any;
  code : string;
  update() {
    this.ngFireAuth.confirmPasswordReset(this.code, this.form.value.password)
    .then(() => {
      console.log('TODO') //TODO confirmation mot de passe modifié
    })
    .catch(e => {
      console.log(e) //TODO gestion des erreurs
      
    })
  }
  form: any;

  constructor(public router: Router,public ngFireAuth: AngularFireAuth, private activatedRoute: ActivatedRoute) { 
    this.form = new FormGroup({
        password : new FormControl(),
        password2 : new FormControl()
    })
    this.activatedRoute.queryParams.subscribe((params : Params) => {
        this.code = params.oobCode
      })
  }

  ngOnInit() {
  }

}