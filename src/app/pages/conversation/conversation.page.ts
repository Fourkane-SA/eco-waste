import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { ActivatedRoute, Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { Annonce } from 'src/app/models/Annonce';
import { Message } from 'src/app/models/Message';
import { RendezVous } from 'src/app/models/RendezVous';
import { User } from 'src/app/models/Users';
import { ServiceNotificationService } from 'src/app/services/service-notification.service';
import { ServiceAnnonce } from 'src/app/services/ServiceAnnonce';
import { ServiceConversation } from 'src/app/services/ServiceConversation';
import { ServiceRendezVous } from 'src/app/services/ServiceRendezVous';
import { ServiceUsers } from 'src/app/services/serviceUsers';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.page.html',
  styleUrls: ['./conversation.page.scss'],
})
export class ConversationPage implements OnInit {
rdveffectue: boolean = false
  errorMessage: string;
  send() {
    if(this.text != undefined) {
      let m : Message = new Message()
      m.sender = localStorage.getItem('uid')
      m.receiver = this.uid
      m.text = this.text
      m.date = Date.now()
      m.annonceID = this.aid
      m.read = false
      if(this.conversation == null)
        this.conversation = []
      this.conversation.push(m)
      this.text = ""
      this.sc.updateConv(localStorage.getItem('uid'), this.uid, this.conversation, this.aid)
      this.sc.updateConv(this.uid,localStorage.getItem('uid'), this.conversation, this.aid)
      if(this.annonce.userReserveID == undefined)
        this.annonce.userReserveID = []
      if(!this.annonce.userReserveID.includes(localStorage.getItem('uid'))) {
        this.annonce.userReserveID.push(localStorage.getItem('uid'))
        this.sa.update(this.annonce, this.aid)
      }
    }
  }

  user : User = new User('')
  su : ServiceUsers = new ServiceUsers(this.db)
  sc : ServiceConversation = new ServiceConversation(this.db)
  sa : ServiceAnnonce = new ServiceAnnonce(this.db)
  sr : ServiceRendezVous = new ServiceRendezVous(this.db)
  url: string = ""
  urlUser: string = ""
  uid : string = ""
  aid : string = ""
  conversation : Message[] = []
  text: string
  acheteur : boolean = true
  annonce : Annonce = new Annonce('','','','','','',[],false)
  date : any 
  toggle : any = false
  toggleConfirm : any
  select : any 
  rendezVous : RendezVous = null
  demandeRendezVous : RendezVous = null
  ctrdv : boolean = true
  ccrdv : boolean = true
  relaisList : string[] = []
  startTime : any

  constructor(public router: Router, private db: AngularFireDatabase, private route: ActivatedRoute,private storage: AngularFireStorage, private popoverController: PopoverController, private sn: ServiceNotificationService) { 
    
  }

  // affichage diff??rent des messages concernant l'??tat des rendez-vous 

  async ngOnInit() {
    this.uid = this.route.snapshot.params['uid']
    this.aid = this.route.snapshot.params['aid']
    this.annonce = await this.sa.get(this.aid)
    this.user = await this.su.get(this.uid)
    if(this.user.clients == undefined)
      this.user.clients = []
    if(!this.user.clients.includes(localStorage.getItem('uid'))) {
      this.user.clients.push(localStorage.getItem('uid'))
      this.su.update(this.user, this.uid)
    }

    this.su.get(localStorage.getItem('uid'))
    .then(u => {
      let user : User = u
      if(localStorage.getItem('uid') != this.annonce.uid)
        this.acheteur = true
      else
        this.acheteur = false
    })
    
    this.storage.ref(`profile/${this.uid}`) 
      .getDownloadURL()
      .toPromise()
      .then(e => this.url = e)
    this.storage.ref(`profile/${localStorage.getItem('uid')}`) 
      .getDownloadURL()
      .toPromise()
      .then(e => this.urlUser = e)
    
    if(this.url == "")
      this.url = 'https://ionicframework.com/docs/img/demos/avatar.svg'
    
    // messagerie en temps r??el
    this.db.database.ref('conversation/'+localStorage.getItem('uid')+'/'+this.uid + '/' + this.aid)
    .on('value', async (v) => {
      this.sn.eraseAllTimeout()
      this.sn.initAllUpcomingNotifs()
      let annonce : Annonce = await this.sa.get(this.aid)
      if(annonce.reserve != true) {
        annonce.reserve = true
        this.sa.create(annonce, this.aid)
      }
      this.conversation = v.val()
      this.conversation.forEach(message => {
        if(message.receiver == localStorage.getItem('uid')) {
          if(location.href.includes('/tab/conversation')) {
            message.read = true
            this.sc.updateConv(localStorage.getItem('uid'), this.uid, this.conversation, this.aid)
          }
          
        }
          
      })
      this.initRdvStatus()
      if(this.conversation[this.conversation.length-1].text == 'Votre demande de rendez-vous a ??t?? accept??e' )
        this.sn.presentToast('Rendez-vous confirm??')
      //this.sc.updateConv(this.uid,localStorage.getItem('uid'), this.conversation, this.aid)
    })
    
    this.initRdvStatus()
    this.initRelaisList()

    
    
  }

  initRelaisList() {
    this.db.database.ref('relaiPoint/').get()
    .then(res => res.forEach(data => {
      if(this.annonce.relaiId != data.val().name)
        this.relaisList.push(data.val().name)
    }))
  }

  async initRdvStatus() {
    let rdvs : RendezVous[] = await this.sr.getAll()
    if(rdvs != null)
      this.rendezVous = (rdvs.find(e => (e.aid == this.aid && e.uidDemandeRdv == localStorage.getItem('uid'))))
    if(this.rendezVous == undefined)
      this.rendezVous = (rdvs.find(e => (e.aid == this.aid && e.uidRecoieRdv == localStorage.getItem('uid'))))
    console.log(this.rendezVous)
    if(this.rendezVous != null) {
      this.date = this.rendezVous.date
    }
    if(this.annonce.uid == localStorage.getItem('uid') && rdvs != null) {
      this.rendezVous = (rdvs.find(e => (e.aid == this.aid && e.uidRecoieRdv == this.uid)))
    }
    this.ctrdv = this.canTakeRdv()
    this.ccrdv = this.canConfirmRdv()
    this.getRdvEffectue()
  }

  async confirm() {
    let rdv : RendezVous = new RendezVous()
    rdv.aid = this.aid
    rdv.acceptee = false
    rdv.date = this.date
    rdv.uidDemandeRdv = localStorage.getItem('uid')
    rdv.uidRecoieRdv = this.uid
    rdv.confirmDonneur = false
    rdv.confirmReceveur = false
    if(this.toggle)
      rdv.pointRelai = this.annonce.relaiId
    else
      rdv.pointRelai = this.select
    if(this.rendezVous == null)
      this.sr.create(rdv)
    else
      this.sr.update(rdv)
    this.rendezVous = rdv
    this.text = "Une demande de rendez-vous a ??t?? effectu??e le " 
    + new Date(rdv.date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric' , minute: 'numeric'}) 
    + " pour le produit : " + this.annonce.title
    + " au point relais suivant : " + rdv.pointRelai
    
    this.send()
    this.ctrdv = this.canTakeRdv()
    await this.popoverController.dismiss()
   
  }

  canTakeRdv() {
    return this.rendezVous == null
  }

  canConfirmRdv() {
    if(this.rendezVous == null)
      return false
    return this.rendezVous != null && localStorage.getItem('uid') == this.rendezVous.uidRecoieRdv && this.rendezVous.acceptee != true
  }

  canValidRdv() {
    if(this.rendezVous == null)
      return false
    let repondu = false
    if(localStorage.getItem('uid') == this.rendezVous.uidDemandeRdv)
      repondu = this.rendezVous.confirmDonneur
    else
      repondu = this.rendezVous.confirmReceveur
    return this.rendezVous.acceptee && !repondu && ((new Date(this.rendezVous.date)).getTime() - Date.now() <= 0)
  }

  async confirmRDV() {
    if(this.toggleConfirm) {
      this.sr.delete(this.rendezVous)
      this.rendezVous = null
      this.text = "Votre demande de rendez-vous a ??t?? refus??e."
      this.send()
    } else {
      this.rendezVous.acceptee = true
      this.text = "Votre demande de rendez-vous a ??t?? accept??e"
      this.send()
      await this.sr.update(this.rendezVous)
    }
    await this.popoverController.dismiss();
    this.validerRendezVousPossible()
  }

    async rdvLieu(val : boolean) {
      if(val) {
        await this.initRdvStatus()
        if(localStorage.getItem('uid') == this.rendezVous.uidDemandeRdv) 
          this.rendezVous.confirmDonneur = true
        else if (localStorage.getItem('uid') == this.rendezVous.uidRecoieRdv)
          this.rendezVous.confirmReceveur = true
        this.sr.update(this.rendezVous)
      } else {
        this.sr.delete(this.rendezVous)
        this.text = "Le rendez-vous n'a pas eu lieu"
        this.send()
      }
      await this.popoverController.dismiss();
    }

    getRdvEffectue() {
      let time = (new Date(this.rendezVous.date)).getTime()+60000
      if( time - Date.now() >= 0) {
        setTimeout(() => {
          this.rdveffectue = true
        }, time - Date.now());
      } else {
        this.rdveffectue = true
      }
    }

    noter() {
      if(this.rendezVous != null)
        return this.rendezVous.confirmDonneur || this.rendezVous.confirmReceveur
      return false
    }

    validerRendezVousPossible() {
      if(this.rendezVous == null)
        return true
      return this.rendezVous.acceptee != true
    }

    update() {
      let hours = new Date(this.date).getHours()
      if(hours < 8 || hours > 19) {
        this.errorMessage = "Entrez une heure comprise entre 8h et 19h"
      } else {
        this.errorMessage = undefined
      }
    }
}
