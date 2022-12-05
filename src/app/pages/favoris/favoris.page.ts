import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { User } from 'src/app/models/Users';
import { ServiceAnnonce } from 'src/app/services/ServiceAnnonce';
import { ServiceUsers } from 'src/app/services/serviceUsers';

@Component({
  selector: 'app-favoris',
  templateUrl: './favoris.page.html',
  styleUrls: ['./favoris.page.scss'],
})
export class FavorisPage implements OnInit {
  su : ServiceUsers = new ServiceUsers(this.db)
  sa : ServiceAnnonce = new ServiceAnnonce(this.db)
  user : User = new User('')
  constructor(private db: AngularFireDatabase) { }

  ngOnInit() {
      this.su.get(localStorage.getItem('uid')).then(u => {
      this.user = u
      let favoris = this.user.favoris
      this.user.favoris = []
      favoris.forEach(async f => {
        let annonce = await this.sa.get(f)
        if(annonce != undefined)
          this.user.favoris.push(f)
      })
    })
    
  }

}
