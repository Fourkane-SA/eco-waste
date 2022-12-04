import { AngularFireDatabase} from '@angular/fire/compat/database';
import { Annonce } from '../models/Annonce';

export class ServiceAnnonce {

    constructor(private db: AngularFireDatabase){}

    create(annonce : Annonce, id : string) {
        this.db.object('annonce/' + id).set(annonce)
    }

    async get(id : string) : Promise<Annonce> {
        return (await this.db.database.ref("annonce/" + id).get()).val()
    }

    async getAll() : Promise<Annonce[]>{
        return (await this.db.database.ref('annonce/').get()).val()
    }

    delete(id : string) {
        this.db.database.ref('annonce/' + id).remove()
    }
}