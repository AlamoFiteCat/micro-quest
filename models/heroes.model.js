class HeroesModel {
  fetchAllHeroesForPlayer(user) {
    return new Promise((resolve, reject) => {
      process.firebase
        .firestore()
        .collection('heroes')
        .where('user', '==', user)
        .get()
        .then((querySnapshot) => {
          let data = [];
          querySnapshot.forEach((doc) => {
            data.push({ id: doc.id, ...doc.data() });
          });
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  createNewHeroForPlayer(hero, heroUser) {
    return new Promise((resolve, reject) => {
      process.firebase
        .firestore()
        .collection('heroes')
        .doc(hero.name)
        .set({
          armor: 10,
          charisma: hero.charisma,
          critical: 0,
          dexterity: hero.dexterity,
          f_dead: false,
          haste: 0,
          health: 12,
          intelligence: hero.intelligence,
          level: 1,
          mastery: 0,
          name: hero.name,
          picture: hero.picture,
          primaryStat: hero.primaryStat,
          story: hero.story,
          strength: hero.strength,
          user: heroUser,
          versatility: 0,
        })
        .then((response) => {
          resolve(response);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
}

module.exports = HeroesModel;
