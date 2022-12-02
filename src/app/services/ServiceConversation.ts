import { AngularFireDatabase} from '@angular/fire/compat/database';
import { Message } from '../models/Message';

export class ServiceConversation {
    constructor(private db: AngularFireDatabase){}

    async getConv(uid1 : string, uid2 : string) : Promise<Message[]> {
        return (await this.db.database.ref("conversation/" + uid1 + "/" + uid2).get()).val()
    }

    async updateConv(uid1 : string, uid2 : string, conversation : Message[]) {
        this.db.object("conversation/" + uid1 + "/" + uid2).update(conversation)
    }
}