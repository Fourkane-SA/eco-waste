import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
goToLogin() {
  this.route.navigateByUrl("/login");
}
goToRegister() {
  this.route.navigateByUrl("/register");
}
  goToApp() {
    this.route.navigateByUrl("/login"); // TODO vérifier s'il n'est pas déjà connecté
  }

  constructor(private route: Router) {}

}
