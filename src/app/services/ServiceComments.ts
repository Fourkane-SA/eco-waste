import { AngularFireDatabase } from "@angular/fire/compat/database";
import { Comments } from "../models/Comments";

export class ServiceComments {

    constructor(private db: AngularFireDatabase){}

    create(comment : Comments, uid : string) {
        this.db.object('comments/' + uid + '/' + comment.uid).set(comment)
    }

    async get(uid : string) {
        return (await this.db.database.ref("comments/" + uid).get()).val()
    }
}