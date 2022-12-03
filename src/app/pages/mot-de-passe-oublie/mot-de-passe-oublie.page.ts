import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

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
  .then(async res => {
    const alert = await this.alertController.create({
      header: "Mail envoyé",
      message: "Consulter votre boite mail pour réinitialiser votre mot de passe",
      buttons: ['OK']
    })

    await alert.present()
    console.log("alert.present()")

  })
   .catch(e => {
    switch (e.code) {
      case 'auth/invalid-email':
        this.errorMessage = "Veuillez entrez une adresse mail valide"
        break;
      case 'auth/user-not-found':
        this.errorMessage = "Cette adresse mail n'est associée à aucun utilisateur"
        break;
      default:
        this.errorMessage = "Il y a eu un probleme de communication avec le serveur"
        break;
    }
    this.error = true
    //document.querySelectorAll('strong').forEach(res => res.className += " error")
      
   })
}
form: any;

  constructor(
    public router: Router,
    public ngFireAuth: AngularFireAuth,
    private alertController: AlertController) { 
      this.form = new FormGroup({
        email : new FormControl()
    })
    }

  ngOnInit() {
  }

}
