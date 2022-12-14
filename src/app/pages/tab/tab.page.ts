import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { AlertController, ToastController, MenuController } from '@ionic/angular';
import { async } from 'rxjs';
import { Message } from 'src/app/models/Message';
import { Notifications } from 'src/app/models/Notifications';
import { User } from 'src/app/models/Users';
import { ServiceNotificationService } from 'src/app/services/service-notification.service';
import { ServiceAnnonce } from 'src/app/services/ServiceAnnonce';
import { ServiceRendezVous } from 'src/app/services/ServiceRendezVous';
import { ServiceUsers } from 'src/app/services/serviceUsers';

@Component({
  selector: 'app-tab',
  templateUrl: './tab.page.html',
  styleUrls: ['./tab.page.scss'],
})
export class TabPage implements OnInit {
  messages: Message[];
  count: number;
  su: ServiceUsers = new ServiceUsers(this.db)
  sr: ServiceRendezVous = new ServiceRendezVous(this.db)
  goToEditProfil() {this.route.navigateByUrl('/tab/edit-profil')}
  goToMesVendeurs() {this.route.navigateByUrl('/tab/noter-mes-vendeurs')}
  goToAide() {this.route.navigateByUrl('/tab/aide')}
  goToFavoris() {this.route.navigateByUrl('/tab/favoris')}
  goToMessages() {this.route.navigateByUrl('/tab/messages')}
  goToVoirMesAnnonces() {this.route.navigateByUrl('/tab/mes-annonces')}
  upcomingNotifs : Notification [] = []
  

  url : string = "https://ionicframework.com/docs/img/demos/avatar.svg"

  constructor(private route: Router,private storage: AngularFireStorage, private db: AngularFireDatabase, private toastController: ToastController, private alertController: AlertController, private sn: ServiceNotificationService, private menu: MenuController) { 
    menu.close()
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
    else {
      this.updateDataMessages()
      this.sn.initAllUpcomingNotifs()
    }
      
  }

  logout() {
    localStorage.removeItem("uid");
    this.route.navigateByUrl("/login");
  }

  updateDataMessages() {
    this.db.database.ref('conversation/'+localStorage.getItem('uid'))
    .on('value', async (res) => {
      this.count = 0
      this.messages = []
      let m : Message[]
      res.forEach(conv => {
        conv.forEach(mess => {
          let conv : Message[] = []
          conv = mess.val()
          let indexLastMessageToRead = conv.map(el => el.receiver).lastIndexOf(localStorage.getItem('uid'))
          if(conv[indexLastMessageToRead].read == false) {
            this.count++
            this.messages.push(conv[indexLastMessageToRead])
          }
            
        })
          
        })
        if(!location.href.includes('/tab/conversation')) {
          this.messages = this.messages.sort((a, b) => a.date < b.date ? 1 : 0)
          if(this.messages[0] != undefined) {
            let sender : User = await this.su.get(this.messages[0].sender)
            this.presentToast('Nouveau message de ' + sender.firstname + ' ' + sender.lastname)
          }
          
        }
          
      })
      
    }


    async presentToast(text : string) {
    const toast = await this.toastController.create({
      message: text,
      duration: 2000,
      position: 'top'
    });

    await toast.present();
  }

  async goToPosterAnnonce() {
   let me : User = await this.su.get(localStorage.getItem('uid'))
   console.log(me)
    if(me.firstname == "") {
       const alert = await this.alertController.create({
        header: 'Profil incomplet',
        message: 'Remplissez votre profil afin de pouvoir poster une annonce',
        buttons: [
          {
            text: 'Annuler',
            role: 'cancel',
            handler: () => {},
          },
          {
            text: 'Remplir le profil',
            role: 'confirm',
            handler: () => {},
          },
        ],
      });
      await alert.present();
      const { role } = await alert.onDidDismiss();
      if(role == 'confirm') {
        this.route.navigateByUrl('/tab/edit-profil')
      }
    } else {
      window.location.href = window.location.origin + "/tab/poster-annonce"
      //this.route.navigateByUrl('/tab/poster-annonce')
    }
  }

  printBack() {
    return !location.href.includes('accueil')
  }

  getHref() {
    if(location.href.includes('conversation') || location.href.includes('noter'))
      return "/tab/messages"
    return "/tab/accueil"
  }
}

