import { getRepository } from 'fireorm';
import * as express from 'express';
import {Users} from "../models/Users";
import * as admin from "firebase-admin";
import * as fireorm from "fireorm";
import {StatusCodes} from "http-status-codes";
const userRouter = express();
const firestore = admin.firestore();
fireorm.initialize(firestore);
const UsersRepository = getRepository(Users);

/**
 * Get all the users 
 */
userRouter.get('/', async (req, res) => {
    const users : Users[] = await UsersRepository.find();
    res.json( users);
});

/**
 * Create a new user
 */
userRouter.post('/', async (req, res) => {
    const user = new Users();
    const r = req.body;
    user.init(r.id, r.firstName, r.lastName, r.password);
    UsersRepository.create(user)
        .then(() => res.status(StatusCodes.CREATED).send("L'utilisateur a été créé"))
        .catch(() => {
            if(r.id === undefined || r.firstName === undefined || r.lastName === undefined || r.password === undefined) {
                res.status(StatusCodes.BAD_REQUEST).send("Tous les champs obligatoires doivent être remplis")
            } else {
                res.status(StatusCodes.UNAUTHORIZED).send("Ce pseudo est déjà pris")
            }
        });
})

/**
 * get a user by id
 */
userRouter.get('/:id',async (req, res) => {
    UsersRepository.findById(req.params.id)
        .then(u =>  {
            if(u === null)
                res.status(404).send("L'utilisateur n'existe pas")
            res.json(u)
        })
})

module.exports = userRouter;
