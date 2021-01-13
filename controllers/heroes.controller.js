const HeroesModel = require('../models/heroes.model');
const hm = new HeroesModel();

class HeroesController {
  getHeroesForPlayer(user) {
    return hm.fetchAllHeroesForPlayer(user);
  }

  createHeroForPlayer(hero, user) {
    return hm.createNewHeroForPlayer(hero, user);
  }

  updateHeroAfterCombat(hero, health, reward) {
    return hm.updateHeroAfterCombat(hero, health, reward);
  }
}

module.exports = HeroesController;
