const serverless = require('serverless-http');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const Handlebars = require('handlebars');
const fs = require('fs');
const cors = require('cors');
require('dotenv').config();


const app = express();
app.use(express.static('template'));
app.use(cors({
  origin: true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

const template = fs.readFileSync('./template/email.hjs', 'utf-8');
const compiledTemplate = Handlebars.compile(template);


// Stripe library usage
const {
  MAILGUN_API_KEY,
  MAILGUN_DOMAIN,
  FROM_WHO
} = process.env;
const mailgun = require('mailgun-js')({
  apiKey: MAILGUN_API_KEY,
  domain: MAILGUN_DOMAIN
});
const stripe = require("stripe")(process.env.TEST_STRIPE_SECRET);



// app.get('/', function (req, res) {
//   res.send('Hello World!')
// });

// app.get('/test', function (req, res) {
//   res.json({
//     'test': 'Test Object'
//   });
// });

app.post('/payment', (req, res) => {
  const reciptNumb = 'ST'+Math.floor(Math.random() * 1000000000);
  const {token, email, event} = req.body;
  stripe.charges.create({
    amount: parseInt(req.body.amount),
    currency: "aud",
    source: token,
    description: "Charge for asifkhannoorzai@gmail.com",
    metadata: {
      email: email,
      reciptNumber: reciptNumb,
      event: event
    }
  }, function(err, charge) {
      if(err) {
        res.json({err});
      } else {
        const {email, reciptNumber} = charge.metadata;
        const d = new Date();
        let amount = parseInt(req.body.amount/100);
        const ticketNumb = (amount/40);
        amount = amount.toFixed(2);
        const data = {
          from: FROM_WHO,
          to: email,
          subject: 'ShowTech Recipt',
          html: compiledTemplate({reciptNumb: reciptNumber, email, ticketNumb,  amount, city: event, date: d.toLocaleDateString() })
        };
        mailgun.messages().send(data, function (error, body) {
          if (err) throw err;
        });
        res.json(charge);
      }
  });
});

module.exports.handler = serverless(app);