import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { serviceProduits } from 'src/app/services/serviceProduits';
import { ServiceUsers } from 'src/app/services/serviceUsers';

@Component({
  selector: 'app-mes-courses',
  templateUrl: './mes-courses.page.html',
  styleUrls: ['./mes-courses.page.scss'],
})
export class MesCoursesPage implements OnInit {
verifyDays() {
  if(isNaN(this.user.notifyDaysBeforeExpires))
    this.user.notifyDaysBeforeExpires = 0
}
  async confirm() {
    let element : HTMLElement = document.getElementById("notifyDaysBeforeExpires")
    if(isNaN(Number(element.innerHTML))) {
      element.innerHTML = "7" // TODO afficher qu'un entier est attendu
    }
    else {
      this.user.notifyDaysBeforeExpires = Number(element.innerHTML)
      for(let p of this.nameProducts) {
        this.user.products[p].expires = document.getElementById(p).children[0].getAttribute('value')
        this.user.products[p].count = document.getElementById('count '+p).innerHTML
      }
      await this.serviceUser.update(this.user, localStorage.getItem('uid'))
      // TODO vérifier que les dates d'expiration sont corrects
    } 
  }
  async reset() {
    for(let p of this.nameProducts) {
      this.user.products[p].expires = "JJ/MM/AAAA"
      this.user.products[p].count = 0
    }
    this.user.notifyDaysBeforeExpires = 0
    await this.serviceUser.update(this.user, localStorage.getItem('uid'))
  }

  serviceProduit : serviceProduits = new serviceProduits(this.db)
  serviceUser : ServiceUsers =  new ServiceUsers(this.db)
  products : [string, unknown][]
  nameProducts : string[]  = []
  user : any = {}
  dateExpr : RegExp = /(1[0-3]|0[1-9]|2[0-9]|3[0-1])\/(0[1-9]|1[0-2])\/20[2-9][1-9]/ // Date en format DD/MM/AAAA de 2021 à 2099

  constructor(private db: AngularFireDatabase,) { 
    this.user.notifyDaysBeforeExpires = 0
  }

  ngOnInit() {
    this.serviceProduit.getAll()
    .then(res => {
      this.products = Object.entries(res)
      this.nameProducts = Object.keys(res)
    })
    this.serviceUser.get(localStorage.getItem('uid'))
    .then(res => {
      this.user = res
      for(let a of this.nameProducts) {
        if(this.user.products === undefined) {
          this.user.products = {}
        }
        if(this.user.products[a] === undefined) {
          this.user.products[a] = {}
          this.user.products[a].count = 0
          this.user.products[a].expires = undefined
        }
      }
    })
    
  }

}
