const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');
const app = express();

// Automatically allow cross-origin requests
app.use(cors({ origin: true }));

app.get('/', (req, res) => {
  res.end("test");
});

// Expose Express API as a single Cloud Function:
exports.api = functions.region('europe-west1').https.onRequest(app);
