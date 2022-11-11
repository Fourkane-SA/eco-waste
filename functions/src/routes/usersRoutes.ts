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
    res.json( await UsersRepository.find());
});

/**
 * Create a new user
 */
userRouter.post('/', async (req, res) => {
    const user = new Users();
    const r = req.body;
    user.init(r.id, r.firstName, r.lastName, r.password, r.description);
    UsersRepository.create(user)
        .then(() => res.status(StatusCodes.CREATED).send("L'utilisateur a été créé"))
        .catch(() => {
            if(r.id === undefined || r.firstName === undefined || r.lastName === undefined || r.password === undefined || r.description === undefined) {
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
    let user : Users = await UsersRepository.findById(req.params.id)
    if(user === null)
        res.status(StatusCodes.NOT_FOUND).send("L'utilisateur n'existe pas")
    res.json(user)
})

/**
 * Try to login
 */
userRouter.post('/login',async (req, res) => {
    let user : Users = await UsersRepository.findById(req.body.id)
    if(user === null)
        res.status(StatusCodes.NOT_FOUND).send("L'utilisateur n'existe pas")
    if(user.login(req.body.password))
        res.setHeader('login',user.id).status(StatusCodes.OK).send("Connexion effectuée")
    res.status(StatusCodes.UNAUTHORIZED).send("Mot de passe incorrect")
})


/**
 * Delete a user
 */
userRouter.delete('/:id', async (req, res) => {
    if(req.params.id != req.headers.login)
        res.status(StatusCodes.UNAUTHORIZED).send("Vous ne pouvez pas supprimer cet utilisateur")
    UsersRepository.delete(req.params.id)
        .then(() => res.status(StatusCodes.OK).send("Utilisateur supprimé"))
})

/**
 * Update a user
 */
userRouter.patch('/:id', async (req, res) => {
    if(req.params.id != req.headers.login)
        res.status(StatusCodes.UNAUTHORIZED).send("Vous ne pouvez pas modifier cet utilisateur")
    let user : Users = await UsersRepository.findById(req.params.id)
    if(user === null)
        res.status(StatusCodes.NOT_FOUND).send("L'utilisateur n'existe pas")
    user.update(req.body.firstName, req.body.lastName, req.body.description)
    await UsersRepository.update(user)
    res.status(StatusCodes.OK).send("Utilisateur modifié avec succès")
        
})

module.exports = userRouter;
