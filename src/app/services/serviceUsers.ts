import { AngularFireDatabase} from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import { User } from '../models/Users';

export class ServiceUsers {

    constructor(private db: AngularFireDatabase) {}

    create(user : User, uid : string) {
        this.db.object('users/' + uid).set(user)
    }

    async get(uid : string) : Promise<any>{
        return (await this.db.database.ref("users/" + uid).get()).val()
    }

    async exist(uid : string) : Promise<boolean> {
        let user = await this.get(uid);
        return(user != null)
    }
}