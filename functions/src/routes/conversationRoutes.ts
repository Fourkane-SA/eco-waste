import { getRepository } from 'fireorm';
import * as express from 'express';
import * as admin from "firebase-admin";
import * as fireorm from "fireorm";
import {StatusCodes} from "http-status-codes";
import { Conversation } from '../models/Conversation';
const conversationRouter = express();
const firestore = admin.firestore();
fireorm.initialize(firestore);
const ConversationsRepository = getRepository(Conversation);
const db = admin.firestore();

conversationRouter.get('/:id', async (req, res) => {
    let id = req.body.pseudo1 + ',' + req.body.pseudo2;
    let conversation : Conversation = await ConversationsRepository.findById(id);
    if(conversation != null) {
        let messages = [];
        const doc = await db
        .collection('Conversations/' + id + '/Messages')
        .get()
        doc.forEach(m => {
            messages.push(m.data())
        })
        messages = messages.sort((a , b) => a.timestamp < b.timestamp ? -1 : 1);
        res.json(messages);
        return
    }
        
    id = req.body.pseudo2 + ',' + req.body.pseudo1;
    conversation = await ConversationsRepository.findById(id)
    if(conversation != null) {
        let messages = [];
        const doc = await db
        .collection('Conversations/' + id + '/Messages')
        .get()
        doc.forEach(m => {
            messages.push(m.data())
        })
        messages = messages.sort((a , b) => a.timestamp < b.timestamp ? -1 : 1);
        res.json(messages);
        return
    }
    res.status(StatusCodes.NOT_FOUND).send("La conversation n'existe pas");
})

conversationRouter.post('/', async (req, res) => {
    let conversation : Conversation = new Conversation();
    conversation.init(req.body.pseudo1, req.body.pseudo2);
    await ConversationsRepository.create(conversation);
    res.status(StatusCodes.OK).send("Conversation créée");
})

conversationRouter.post('/message', async (req, res) => {
    let id = req.body.pseudo1 + ',' + req.body.pseudo2;
    let conversation : Conversation = await ConversationsRepository.findById(id);
    if(conversation != null) {
        conversation.addMessage(req.body.pseudo1, req.body.text)
        await ConversationsRepository.update(conversation)
        res.status(StatusCodes.OK).send("Message envoyé avec succès")
        return
    }
    id = req.body.pseudo2 + ',' + req.body.pseudo1;
    conversation = await ConversationsRepository.findById(id)
    if(conversation != null) {
        conversation.addMessage(req.body.pseudo1, req.body.text)
        await ConversationsRepository.update(conversation)
        res.status(StatusCodes.OK).send("Message envoyé avec succès")
        return
    }
    res.status(StatusCodes.NOT_FOUND).send("La conversation n'existe pas");
})

conversationRouter.post('/read', async (req, res) => {
    let id = req.body.pseudo1 + ',' + req.body.pseudo2;
    let conversation : Conversation = await ConversationsRepository.findById(id);
    if(conversation != null) {
        conversation.readMessages(req.body.pseudo1)
        res.status(StatusCodes.OK).send("Messages lus")
        return
    }
    id = req.body.pseudo2 + ',' + req.body.pseudo1;
    conversation = await ConversationsRepository.findById(id)
    if(conversation != null) {
        conversation.readMessages(req.body.pseudo1)
        res.status(StatusCodes.OK).send("Messages lus")
        return
    }
    res.status(StatusCodes.NOT_FOUND).send("La conversation n'existe pas");
})

conversationRouter.get('/', async (req, res) => {
    const id  = req.get('login');
    const messages = [];
    let conversations : Conversation[] = await ConversationsRepository.find();
    conversations.forEach(async (c, i, a) => {
        let pseudos = c.getPseudos();
        if(pseudos.includes(id)){
            let data = await db
            .collection('Conversations/' + c.id + '/Messages')
            .orderBy('timestamp', 'desc')
            .limit(1)
            .get()
            data.docs.forEach(d => messages.push({
                    id : c.id,
                    read : d.data().read,
                    text : d.data().text,
                    sender : d.data().sender,
                    timestamp : d.data().timestamp
                }
                ))
        }
        i++;
        console.log(i, a.length)
        if(i === a.length) {
            await new Promise(f => setTimeout(f, 50));
            res.status(StatusCodes.OK).send(messages)
        }
            
        
    })
})

//function callback (req, res, messages) { console.log('m3 : ', messages); }

module.exports = conversationRouter;
