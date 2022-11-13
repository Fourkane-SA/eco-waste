import { Collection, ISubCollection, SubCollection } from 'fireorm';
import * as admin from "firebase-admin";
import { Messages } from './Messages';
const db = admin.firestore();

@Collection()
export class Conversation {
    public id : string;
    @SubCollection(Messages)
    private messages ?: ISubCollection<Messages>;

    init(pseudo1 : string, pseudo2 : string) : void {
        this.id = pseudo1 + ',' + pseudo2;
    }

    getMessages() : ISubCollection<Messages> {
        return this.messages;
    }

    addMessage(sender : string, text : string) : void {
        //let messages =  this.messages.find();
        let message : Messages = new Messages();
        message.init(sender, text);
        this.messages.create(message);
    }

    getPseudos() : Array<String> {
        return this.id.split(',');
    }

    setMessages(messages : ISubCollection<Messages>) {
        this.messages = messages;
    }

    getLastMessage(id : string)  {
        db
        .collection('Conversations/' + id + '/Messages')
        .orderBy('timestamp', 'desc')
        .limit(1)
        .get()
        .then(m => {
            const res = []
            m.docs.forEach(d => {
                
                res.push(d.data())
            })
            console.log(res[0])
            return res[0];
        })
    }

    readMessages(pseudo : string) {
        db
        .collection('Conversations/' + this.id + '/Messages')
        .get()
        .then(c => {
            c.docs.forEach(m => {
                console.log(m.data().sender)
                if(m.data().sender != pseudo)
                    m.ref.set({ read : true }, {merge : true})
            })
        })
    }
}