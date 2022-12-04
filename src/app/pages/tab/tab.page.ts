import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Message } from 'src/app/models/Message';

@Component({
  selector: 'app-tab',
  templateUrl: './tab.page.html',
  styleUrls: ['./tab.page.scss'],
})
export class TabPage implements OnInit {
  messages: any;
  count: number;
  goToEditProfil() {this.route.navigateByUrl('/tab/edit-profil')}
  goToMesVendeurs() {this.route.navigateByUrl('/tab/noter-mes-vendeurs')}
  goToAide() {this.route.navigateByUrl('/tab/aide')}
  goToFavoris() {this.route.navigateByUrl('/tab/favoris')}
  goToMessages() {this.route.navigateByUrl('/tab/messages')}
  goToVoirMesAnnonces() {this.route.navigateByUrl('/tab/mes-annonces')}
  goToPosterAnnonce() {this.route.navigateByUrl('/tab/poster-annonce')}

  url : string = "https://ionicframework.com/docs/img/demos/avatar.svg"

  constructor(private route: Router,private storage: AngularFireStorage, private db: AngularFireDatabase) { 
    this.storage
    .ref(`profile/${localStorage.getItem('uid')}`).getDownloadURL()
      .subscribe(e => this.url = e)
      
    this.route.events.subscribe(e => {
      if (e instanceof NavigationEnd) {
        document.getElementById("recette").setAttribute('name', "restaurant-outline")
        document.getElementById("home").setAttribute('name', "home-outline")
        document.getElementById("basket").setAttribute('name', "basket-outline")
        if(route.url == "/tab/accueil")
          document.getElementById("home").setAttribute('name', "home")
        if(route.url == "/tab/recette")
          document.getElementById("recette").setAttribute('name', "restaurant")
        if(route.url == "/tab/mes-courses")
          document.getElementById("basket").setAttribute('name', "basket")
      }
    })
  }

  ngOnInit() {
    if(localStorage.getItem('uid') == null)
      this.route.navigateByUrl("/")
    else
      this.updateDataMessages()
  }

  logout() {
    localStorage.removeItem("uid");
    this.route.navigateByUrl("/login");
  }

  updateDataMessages() {
    this.db.database.ref('conversation/'+localStorage.getItem('uid'))
    .on('value', (res) => {
      this.count = 0
      this.messages = []
      let m : Message[]
      res.forEach(conv => {
        conv.forEach(mess => {
          let conv : Message[] = []
          conv = mess.val()
          let indexLastMessageToRead = conv.map(el => el.receiver).lastIndexOf(localStorage.getItem('uid'))
          if(conv[indexLastMessageToRead].read == false)
            this.count++
        })
          
        })
        
        
      })
      
    }

}
