const firebase = require('firebase');

const {
  apiKey,
  authDomain,
  databaseURL,
  projectId,
  storageBucket,
  messagingSenderId,
  appId,
} = process.env;

const config = {
  apiKey,
  authDomain,
  databaseURL,
  projectId,
  storageBucket,
  messagingSenderId,
  appId,
};

const app = firebase.initializeApp(config);

if (!process.firebase) {
  process.firebase = app;
} else {
  console.log('Firebase connection already established.');
}

module.exports = app;
