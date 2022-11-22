import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-articles',
  templateUrl: './accueil.page.html',
  styleUrls: ['./accueil.page.scss'],
})
export class AccueilPage implements OnInit {
  goToMap() {
    this.router.navigateByUrl('/tab/map')
  }

  constructor(public router: Router,) { }

  ngOnInit() {
    
  }

}
