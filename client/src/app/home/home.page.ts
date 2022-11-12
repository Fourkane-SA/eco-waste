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

  constructor(private route: Router) {
    if(localStorage.getItem('login') != undefined)
      this.route.navigateByUrl("/articles");
  }

}
