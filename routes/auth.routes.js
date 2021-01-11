const router = require('express').Router();
const errorHandler = require('../utils/error.handler');
const AuthController = require('../controllers/auth.controller');
const ac = new AuthController();

router.post('/login', (req, res) => {
  ac.loginUser(req.body)
    .then(async (data) => {
      const profileDoc = await process.firebase
        .firestore()
        .collection('users')
        .doc(req.body.email)
        .get();

      const profileData = profileDoc.data();

      req.session.user = {
        email: profileData.email,
        username: profileData.username,
        data: data,
      };
      res.status(200).json({
        currentEmail: req.body.email,
        currentUsername: profileData.username,
      });
    })
    .catch((error) => {
      const errorObject = errorHandler('login', error);
      res.status(errorObject.code).json({
        message: errorObject.message,
      });
    });
});

router.post('/logout', (req, res) => {
  ac.logoutUser()
    .then(() => {
      (req.session.user = false), (req.session.profileData = false);
      res.status(200).json({
        currentEmail: false,
        currentUsername: false,
      });
    })
    .catch(() => {
      res.status(400).json({});
    });
});

router.post('/register', (req, res) => {
  ac.registerUser(req.body)
    .then((data) => {
      req.session.user = {
        email: req.body.email,
        username: req.body.username,
        data: data,
      };
      res.status(200).json({
        currentEmail: req.body.email,
        currentUsername: req.body.username,
      });
    })
    .catch((error) => {
      const errorObject = errorHandler('register', error);
      res.status(errorObject.code).json({
        message: errorObject.message,
      });
    });
});

router.get('/current', (req, res) => {
  if (req.session.user) {
    res.status(200).json({
      currentEmail: req.session.user.email,
      currentUsername: req.session.user.username,
    });
  } else {
    res.status(200).json({
      currentEmail: false,
      currentUsername: false,
    });
  }
});

module.exports = router;
