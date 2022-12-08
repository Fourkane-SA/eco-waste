import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AlertController, ToastController } from '@ionic/angular';
import { Message } from '../models/Message';
import { Notifications } from '../models/Notifications';
import { RendezVous } from '../models/RendezVous';
import { ServiceConversation } from './ServiceConversation';
import { ServiceRendezVous } from './ServiceRendezVous';

@Injectable({
  providedIn: 'root'
})
export class ServiceNotificationService {

  sc : ServiceConversation = new ServiceConversation(this.db)
  sr : ServiceRendezVous = new ServiceRendezVous(this.db)
  upcomingNotifs : Notification[] = []
  idTimeouts :  NodeJS.Timeout[] = []
  constructor(private db: AngularFireDatabase, private toastController: ToastController) { 
    this.initAllUpcomingNotifs()
  }

  async initAllUpcomingNotifs() {
    let rdvs : RendezVous[] = await this.sr.getAll()
    rdvs.forEach(rdv => {
      this.addTimeoutRdv(rdv)
    })
  }

  addTimeoutRdv(rdv : RendezVous ) {
    let time = new Date(rdv.date).getTime() - Date.now() + 60000
    if(time >= 0) {
      if(rdv.uidDonneur == localStorage.getItem('uid')) {
        let idTim = setTimeout(() => {
          if(rdv.confirmDonneur != true)
            this.presentToast("Avez-vous effectué votre donation ?")
        }, time);
        this.idTimeouts.push(idTim)
      }
      else if(rdv.uidRececeur == localStorage.getItem('uid')) {
        let idTim = setTimeout(() => {
          if(rdv.confirmReceveur != true)
            this.presentToast("Avez-vous reçu votre produit ?")
        }, time);
        this.idTimeouts.push(idTim)
      }
    }
    
  }

  eraseAllTimeout() {
    this.idTimeouts.forEach(id => clearTimeout(id))
  }

  async presentToast(text : string) {
    const toast = await this.toastController.create({
      message: text,
      duration: 2000,
      position: 'top'
    });

    await toast.present();
  }
  
}
