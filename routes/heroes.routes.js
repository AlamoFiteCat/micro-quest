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

router.put('/afterCombat', (req, res) => {
  if (req.session.user) {
    hc.updateHeroAfterCombat(req.body.hero, req.body.health, req.body.reward)
      .then(() => {
        res.status(200).json({
          message: 'Hero updated!',
        });
      })
      .catch((error) => {
        const errorObject = errorHandler('firestore', error);
        res.status(errorObject.code).json({
          message: errorObject.message,
        });
      });
  }
});

router.put('/lockEquipment', (req, res) => {
  console.log(req.body);
  if (req.session.user) {
    hc.lockHeroEquipment(req.body.hero, req.body.equipment)
      .then(() => {
        res.status(200).json({
          message: 'Equipment updated!',
        });
      })
      .catch((error) => {
        const errorObject = errorHandler('firestore', error);
        res.status(errorObject.code).json({
          message: errorObject.message,
        });
      });
  }
});

module.exports = router;
