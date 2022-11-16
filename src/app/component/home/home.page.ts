import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public progress: number = 0;
  

  constructor(private route: Router) {
    let intervalID = setInterval(() => {
    this.progress += 0.01;
    if (this.progress > 1.05) {
      if(localStorage.getItem('uid') != undefined)
        this.route.navigateByUrl("/tab/accueil")
       else
        this.route.navigateByUrl("/login")
        clearInterval(intervalID)
    }
  }, 50);
  }

}
