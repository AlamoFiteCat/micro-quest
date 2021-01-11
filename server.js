// [Imports]
const express = require('express');
const cors = require('./const/cors.const');
const router = require('./const/router.const');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const path = require('path');
const setup = require('./setup');
const session = require('./const/session.const');
const firebase = require('./const/firebase.const');

const app = express();
const PORT = process.env.PORT || 8080;
const HOST = process.env.HOST || '0.0.0.0';

app.set('trust proxy', 1);

// [Security]
app.use(helmet.hidePoweredBy());
app.use(
  helmet.referrerPolicy({
    policy: 'no-referrer',
  })
);
app.use(helmet.hsts({ maxAge: 0 }));
app.use(helmet.ieNoOpen());
app.use(helmet.noSniff());
app.use(
  helmet({
    frameguard: {
      action: 'deny',
    },
  })
);
app.use(helmet.xssFilter());
// app.use(
//   helmet.contentSecurityPolicy({
//     directives: {
//       // [Set this up eventually]
//     },
//   })
// );

app.use(cors);
app.use(express.static(path.join(__dirname, 'static')));

app.get(/^\/(?!api).*/, function (req, res) {
  res.sendFile(path.join(__dirname, 'static', 'index.html'));
});

app.use(session);

// [Parsing]
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// [Router]
app.use('/api', router);

app.listen(PORT, HOST, () => {
  if (process.env.ENVIRONMENT == 'dev') {
    console.log('Server is up and running at http://localhost:8080');
  }
});
