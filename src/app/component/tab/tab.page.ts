import { Component, OnInit } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-tab',
  templateUrl: './tab.page.html',
  styleUrls: ['./tab.page.scss'],
})
export class TabPage implements OnInit {
  goToEditProfil() {this.route.navigateByUrl('/tab/edit-profil')}
  goToMesVendeurs() {this.route.navigateByUrl('/tab/noter-mes-vendeurs')}
  goToAide() {this.route.navigateByUrl('/tab/aide')}
  goToFavoris() {this.route.navigateByUrl('/tab/favoris')}
  goToMessages() {this.route.navigateByUrl('/tab/messages')}
  goToVoirMesAnnonces() {this.route.navigateByUrl('/tab/mes-annonces')}
  goToPosterAnnonce() {this.route.navigateByUrl('/tab/poster-annonce')}

  constructor(private route: Router) { 
    this.route.events.subscribe(e => {
      if (e instanceof NavigationEnd) {
        document.getElementById("recette").setAttribute('name', "restaurant-outline")
        document.getElementById("home").setAttribute('name', "home-outline")
        document.getElementById("basket").setAttribute('name', "basket-outline")
        if(route.url == "/tab/accueil")
          document.getElementById("home").setAttribute('name', "home")
        if(route.url == "/tab/recette")
          document.getElementById("recette").setAttribute('name', "restaurant")
      }if(route.url == "/tab/mes-courses")
          document.getElementById("basket").setAttribute('name', "basket")
    })
  }

  ngOnInit() {
    if(localStorage.getItem('uid') == null)
      this.route.navigateByUrl("/")
  }

  logout() {
    localStorage.removeItem("uid");
    this.route.navigateByUrl("/login");
  }
}
