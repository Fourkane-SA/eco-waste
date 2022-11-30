import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

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
    .then(async () => {
      const alert = await this.alertController.create({
        header: "Mot de passe modifié",
        message: "Le mot de passe a été modifié"
      })
      await alert.present()
    })
    .catch(e => {
      this.error = true
      this.errorMessage = "Le mot de passe doit contenir au moins 6 caractères"
      
    })
  }
  form: any;

  constructor(public router: Router,public ngFireAuth: AngularFireAuth, private activatedRoute: ActivatedRoute, private alertController: AlertController) { 
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