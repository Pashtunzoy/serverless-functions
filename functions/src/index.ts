import * as express from 'express';
import * as functions from 'firebase-functions';

/* eslint-disable no-console */
const app = express();

app.get('/', function(req, res) {
  res.send('Hello from Functions');
});


// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

// export const helloWorld = functions.https.onRequest((request, response) => {
//   response.send("Hello from Firebase!");
// });

exports.functions = functions.https.onRequest(app);