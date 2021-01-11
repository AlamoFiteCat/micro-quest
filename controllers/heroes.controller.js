const HeroesModel = require('../models/heroes.model');
const hm = new HeroesModel();

class HeroesController {
  getHeroesForPlayer(user) {
    return hm.fetchAllHeroesForPlayer(user);
  }

  createHeroForPlayer(hero, user) {
    return hm.createNewHeroForPlayer(hero, user);
  }
}

module.exports = HeroesController;
