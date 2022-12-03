import { ViewportScroller } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { ActivatedRoute } from '@angular/router';
import { Annonce } from 'src/app/models/Annonce';
import { Message } from 'src/app/models/Message';
import { RendezVous } from 'src/app/models/RendezVous';
import { User } from 'src/app/models/Users';
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
  send() {
    if(this.text != undefined) {
      let m : Message = new Message()
      m.sender = localStorage.getItem('uid')
      m.receiver = this.uid
      m.text = this.text
      m.date = Date.now()
      m.annonceID = this.aid
      if(this.conversation == null)
        this.conversation = []
      this.conversation.push(m)
      console.log(this.conversation)
      this.text = ""
      this.sc.updateConv(localStorage.getItem('uid'), this.uid, this.conversation, this.aid)
      this.sc.updateConv(this.uid,localStorage.getItem('uid'), this.conversation, this.aid)
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
  annonce : Annonce = new Annonce('','','','','','')
  date : any 
  toggle : any
  toggleConfirm : any
  select : any 
  rendezVous : RendezVous = null
  demandeRendezVous : RendezVous = null
  ctrdv : boolean = true
  ccrdv : boolean = true

  constructor(private db: AngularFireDatabase, private route: ActivatedRoute,private storage: AngularFireStorage) { 
    
  }

  // affichage différent des messages concernant l'état des rendez-vous 

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
    
    // messagerie en temps réel
    this.db.database.ref('conversation/'+localStorage.getItem('uid')+'/'+this.uid + '/' + this.aid)
    .on('value', (v) => {
      this.conversation = v.val()
    })

    let rdvs : RendezVous[] = await this.sr.getAll()
    if(rdvs != null)
      this.rendezVous = (rdvs.find(e => (e.aid == this.aid && e.uidRececeur == localStorage.getItem('uid'))))
    if(this.rendezVous != null) {
      this.date = this.rendezVous.date
    }
    if(this.annonce.uid == localStorage.getItem('uid')) {
      this.rendezVous = (rdvs.find(e => (e.aid == this.aid && e.uidRececeur == this.uid)))
    }
    this.ctrdv = this.canTakeRdv()
    this.ccrdv = this.canConfirmRdv()
  }

  confirm() {
    console.log(this.date, this.toggle, this.select)
    let rdv : RendezVous = new RendezVous()
    rdv.aid = this.aid
    rdv.acceptee = false
    rdv.date = this.date
    rdv.uidDonneur = this.annonce.uid
    rdv.uidRececeur = localStorage.getItem('uid')
    if(this.toggle)
      rdv.pointRelai = this.annonce.relaiId
    else
      rdv.pointRelai = this.toggle
    if(this.rendezVous == null)
      this.sr.create(rdv)
    else
      this.sr.update(rdv)
    this.rendezVous = rdv
    this.text = "Une demande de rendez-vous a été effectuée le " 
    + new Date(rdv.date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric' , minute: 'numeric'}) 
    + " pour le produit : " + this.annonce.title
    + " au point relais suivant : " + rdv.pointRelai
    
    this.send()
    this.ctrdv = this.canTakeRdv()
    
  }

  canTakeRdv() {
    console.log(this.rendezVous)
    return this.rendezVous == null && localStorage.getItem('uid') != this.annonce.uid
  }

  canConfirmRdv() {
    return this.rendezVous != null && localStorage.getItem('uid') == this.annonce.uid && this.rendezVous.acceptee != true
  }

  confirmRDV() {
    console.log(this.toggleConfirm)
    if(this.toggleConfirm) {
      this.sr.delete(this.rendezVous)
      this.rendezVous = null
      this.text = "Votre demande de rendez-vous a été refusée."
      this.send()
    } else {
      this.rendezVous.acceptee = true
      this.text = "Votre demande de rendez-vous a été acceptée"
      this.send()
      this.sr.update(this.rendezVous)
    }
    this.ccrdv = this.canConfirmRdv()
  }
}
