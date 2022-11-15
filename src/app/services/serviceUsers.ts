import { AngularFireDatabase} from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import { User } from '../models/Users';

export class ServiceUsers {

    constructor(private db: AngularFireDatabase) {}

    create(user : User) {
        this.db.object('users/' + user.pseudo).set(user)
    }

    async get(pseudo : string) : Promise<any>{
        return (await this.db.database.ref("users/" + pseudo).get()).val()
    }

    async exist(pseudo : string) : Promise<boolean> {
        let user = await this.get(pseudo);
        return(user != null)
    }
}