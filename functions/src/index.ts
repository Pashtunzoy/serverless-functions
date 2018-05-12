import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as path from 'path';
import Hogan from 'hogan.js';
import * as fs from 'fs';
require('dotenv').config();
// import * as cors from 'cors';

import * as functions from 'firebase-functions';

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

// export const helloWorld = functions.https.onRequest((request, response) => {
//   response.send("Hello from Firebase!");
// });


/* eslint-disable no-console */
const app = express();
app.use(express.static('etc'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

// const template = fs.readFileSync('./etc/email.hjs', 'utf-8');
// const compiledTemplate = Hogan.compile(template);


// Stripe library usage
// const { MAILGUN_API_KEY, MAILGUN_DOMAIN, FROM_WHO } = process.env;
// const mailgun = require('mailgun-js')({ apiKey: MAILGUN_API_KEY, domain: MAILGUN_DOMAIN });
// const stripe = require("stripe")(process.env.TEST_STRIPE_SECRET);


app.get('/test', (req, res) => {
  res.json({'test': 'Test Object'});
});


// app.post('/payment', (req, res) => {
//   const reciptNumb = 'ST' + Math.floor(Math.random() * 1000000000);
//   const { token, email, event } = req.body;
//   stripe.charges.create({
//     amount: parseInt(req.body.amount),
//     currency: "aud",
//     source: token,
//     description: "Charge for asifkhannoorzai@gmail.com",
//     metadata: {
//       email: email,
//       reciptNumber: reciptNumb,
//       event: event
//     }
//   }, function (err, charge) {
//     if (err) {
//       res.json({ err });
//     } else {
//       const { reciptNumber } = charge.metadata;
//       const d = new Date();
//       let amount = parseInt(req.body.amount) / 100;
//       const ticketNumb = (amount / 40);
//       amount = parseInt(amount.toFixed(2));
//       const data = {
//         from: FROM_WHO,
//         to: email,
//         subject: 'ShowTech Recipt',
//         html: compiledTemplate.render({ reciptNumb: reciptNumber, email, ticketNumb, amount, city: event, date: d.toLocaleDateString() })
//       };
//       mailgun.messages().send(data, function (error, body) {
//         if (err) throw err;
//       });
//       res.json(charge);
//     }
//   });
// });

exports.functions = functions.https.onRequest(app);