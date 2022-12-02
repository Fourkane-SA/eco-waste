import { ViewportScroller } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { ActivatedRoute } from '@angular/router';
import { Message } from 'src/app/models/Message';
import { User } from 'src/app/models/Users';
import { ServiceConversation } from 'src/app/services/ServiceConversation';
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
      if(this.conversation == null)
        this.conversation = []
      this.conversation.push(m)
      console.log(this.conversation)
      this.text = ""
      this.sc.updateConv(localStorage.getItem('uid'), this.uid, this.conversation)
      this.sc.updateConv(this.uid,localStorage.getItem('uid'), this.conversation)
    }
    this.scroller.scrollToAnchor('footer')
  }

  user : User = new User('')
  su : ServiceUsers = new ServiceUsers(this.db)
  sc : ServiceConversation = new ServiceConversation(this.db)
  url: string = ""
  urlUser: string = ""
  uid : string = ""
  conversation : Message[] = []
  text: string
  acheteur : boolean = true

  constructor(private db: AngularFireDatabase, private route: ActivatedRoute,private storage: AngularFireStorage, private scroller: ViewportScroller) { 
  }

  async ngOnInit() {
    this.uid = this.route.snapshot.params['id']
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
      if(user.vendeurs != undefined && user.vendeurs.includes(this.uid))
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
    this.db.database.ref('conversation/'+localStorage.getItem('uid')+'/'+this.uid)
    .on('value', (v) => {
      this.conversation = v.val()
    })

    this.db.database.ref('conversation/'+'/'+this.uid + '/' + localStorage.getItem('uid'))
    .on('value', (v) => {
      this.conversation = v.val()
    })
  }


  scroll() {
    
    
  }
}
