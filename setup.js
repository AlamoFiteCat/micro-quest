const fs = require('fs');

const addToEnvironment = (json) => {
  for (const [key, value] of Object.entries(json)) {
    process.env[`${key}`] = value;
  }
};

if (process.env.ENVIRONMENT == 'dev') {
  // [Firebase]
  let fbFile = fs.readFileSync('./firebase.js').toString();
  fbFile = fbFile.substr(21, fbFile.length - 25);
  addToEnvironment(JSON.parse(fbFile));
}
