import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Message } from 'src/app/models/Message';
import { User } from 'src/app/models/Users';
import { ServiceUsers } from 'src/app/services/serviceUsers';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.page.html',
  styleUrls: ['./messages.page.scss'],
})
export class MessagesPage implements OnInit {

  messages : any = []
  su : ServiceUsers = new ServiceUsers(this.db)
  constructor(private db: AngularFireDatabase, private storage: AngularFireStorage) { }

  async ngOnInit() {
    this.db.database.ref('conversation/'+localStorage.getItem('uid'))
    .on('value', (res) => {
      console.log(res)
      let m : Message[]
      res.forEach(e => {
        let res = e.val()[e.val().length-1]
        let photoURL = ""
        if(res.sender != localStorage.getItem('uid')) {
          this.storage.ref(`profile/${res.sender}`) 
          .getDownloadURL()
          .toPromise()
          .then(e => {
            photoURL = e
            let obj = {
              text : res.text,
              user : res.sender,
              date : res.date,
              read : false,
              contactedByUser : true, // L'utilisateur a contacté cette personne suite à une annonce
              photoURL : photoURL,
              link : "/tab/conversation/" + res.sender
            }
            this.messages.push(obj)
            this.messages = this.messages.sort((a, b) => a.date < b.date)
            
          })
        } else {
          this.storage.ref(`profile/${res.receiver}`) 
          .getDownloadURL()
          .toPromise()
          .then(e => {
            photoURL = e
            let obj = {
              text : res.text,
              user : res.receiver,
              date : res.date,
              read : false,
              contactedByUser : true, // L'utilisateur a contacté cette personne suite à une annonce
              photoURL : photoURL,
              link : "/tab/conversation/" + res.receiver
            }
            this.messages.push(obj)
            this.messages = this.messages.sort((a, b) => a.date < b.date)
            //console.log(this.messages)
          })
        }
        
      })
      
    })

}
}