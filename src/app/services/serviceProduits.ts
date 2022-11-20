import { AngularFireDatabase} from '@angular/fire/compat/database';

export class serviceProduits {
    
    constructor(private db: AngularFireDatabase){}

    async getAll() {
        return (await this.db.database.ref('products/').get()).val()
    }
}