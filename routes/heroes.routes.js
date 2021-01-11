const router = require('express').Router();
const errorHandler = require('../utils/error.handler');
const HeroesController = require('../controllers/heroes.controller');
const hc = new HeroesController();

router.get('/', (req, res) => {
  if (req.session.user.username) {
    hc.getHeroesForPlayer(req.session.user.username)
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((error) => {
        const errorObject = errorHandler('firestore', error);
        res.status(errorObject.code).json({
          message: errorObject.message,
        });
      });
  }
});

router.post('/create', (req, res) => {
  hc.createHeroForPlayer(req.body.hero, req.session.user.username)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((error) => {
      const errorObject = errorHandler('firestore', error);
      res.status(errorObject.code).json({
        message: errorObject.message,
      });
    });
});

module.exports = router;
