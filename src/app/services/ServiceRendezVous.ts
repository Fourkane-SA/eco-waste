import { AngularFireDatabase} from '@angular/fire/compat/database';
import { RendezVous } from '../models/RendezVous';

export class ServiceRendezVous {
    
    constructor(private db: AngularFireDatabase){}

    async create(rdv : RendezVous) {
        let list : RendezVous[] = (await this.db.database.ref('rdv/').get()).val()
        if(list == null)
            list = []
        list.push(rdv)
        this.db.object('rdv').set(list)
    }

    async getAll() : Promise<RendezVous[]>{
        return (await this.db.database.ref('rdv/').get()).val()
    }

    async update(rdv : RendezVous) {
        let list = await this.getAll()
        let index = list.findIndex(r => (r.aid == rdv.aid && r.uidRececeur == rdv.uidRececeur && r.uidDonneur == rdv.uidDonneur))
        if(index >= 0)
            list[index] = rdv
        this.db.object('rdv').update(list)
    }

    async delete(rdv: RendezVous) {
        let list = await this.getAll()
        console.log(rdv, "rdv")
        list = list.filter(r => !(r.aid == rdv.aid && r.uidRececeur == rdv.uidRececeur && r.uidDonneur == rdv.uidDonneur))
        console.log(list, "list2")
        this.db.object('rdv').set(list)
    }
}