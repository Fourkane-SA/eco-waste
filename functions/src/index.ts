import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as express from 'express';
//import * as bodyParser from 'body-parser';
import * as fireorm from 'fireorm';

admin.initializeApp();
const cors = require('cors');

const app = express();


const userRoute = require('./routes/usersRoutes');
const conversationRoute = require('./routes/conversationRoutes');

const firestore = admin.firestore();
fireorm.initialize(firestore);
// Automatically allow cross-origin requests
app.use(cors({ origin: true }));
app.use(express.static('public'));


app.use('/users', userRoute);
app.use('/conversations', conversationRoute);

// Expose Express API as a single Cloud Function:
exports.api = functions.region('europe-west1').https.onRequest(app);
