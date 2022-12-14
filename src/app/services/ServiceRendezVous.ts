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
        let index = list.findIndex(r => (r.aid == rdv.aid && r.uidRecoieRdv == rdv.uidRecoieRdv && r.uidDemandeRdv == rdv.uidDemandeRdv))
        if(index >= 0)
            list[index] = rdv
        this.db.object('rdv').update(list)
    }

    async delete(rdv: RendezVous) {
        let list = await this.getAll()
        list = list.filter(r => !(r.aid == rdv.aid && r.uidRecoieRdv == rdv.uidRecoieRdv && r.uidDemandeRdv == rdv.uidDemandeRdv))
        this.db.object('rdv').set(list)
    }
}