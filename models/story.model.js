const errorHandler = require('../utils/error.handler');

class StoryModel {
  fetchAllBooks() {
    return new Promise((resolve, reject) => {
      process.firebase
        .firestore()
        .collection('books')
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

  fetchAllBookChapters(bookId) {
    return new Promise((resolve, reject) => {
      process.firebase
        .firestore()
        .collection('chapters')
        .where('bookId', '==', bookId)
        .get()
        .then((querySnapshot) => {
          let data = [];
          querySnapshot.forEach((doc) => {
            data.push({ ...doc.data() });
          });
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  fetchAllChapterQuests(chapterId) {
    return new Promise((resolve, reject) => {
      process.firebase
        .firestore()
        .collection('quests')
        .where('chapterId', '==', chapterId)
        .get()
        .then((querySnapshot) => {
          let data = [];
          querySnapshot.forEach((doc) => {
            data.push({ ...doc.data() });
          });
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  startQuestWithHero(questId, heroId) {
    return new Promise((resolve, reject) => {
      let questFound;
      process.firebase
        .firestore()
        .collection('progression')
        .where('heroId', '==', heroId)
        .get()
        .then((querySnapshot) => {
          let allHeroProgressions = [];
          querySnapshot.forEach((doc) => {
            allHeroProgressions.push({ ...doc.data() });
          });

          // [Go through all quests started or completed by the hero]
          allHeroProgressions.forEach((progression) => {
            if (progression.questId === questId) {
              questFound = progression;
              // [If the quest was found and complete it, prevent the hero from doing it again]
              if (progression.status === 1) {
                reject({
                  code: 400,
                  message: 'This hero has already completed this quest!',
                });
              }
              // [If the quest was found but wasn't completed, just resolve immediatelly]
              else {
                resolve({
                  code: 200,
                  message: 'Quest restarted!',
                });
              }
            }
          });

          // [If the quest wasnt found, start it]
          if (!questFound) {
            process.firebase
              .firestore()
              .collection('progression')
              .doc()
              .set({
                questId: questId,
                heroId: heroId,
                status: 0,
              })
              .then(() => {
                resolve({
                  code: 200,
                  message: 'Quest started!',
                });
              });
          }
        })
        .catch((error) => {
          const errorObject = errorHandler('firestore', error);
          reject(errorObject);
        });
    });
  }

  endQuestWithHero(questId, heroId) {
    console.log(questId, heroId);
    return new Promise((resolve, reject) => {
      process.firebase
        .firestore()
        .collection('progression')
        .where('heroId', '==', heroId)
        .get()
        .then((querySnapshot) => {
          let allHeroProgressions = [];
          querySnapshot.forEach((doc) => {
            allHeroProgressions.push({ id: doc.id, ...doc.data() });
          });
          console.log(allHeroProgressions);
          allHeroProgressions.forEach((progression) => {
            if (progression.questId === questId) {
              process.firebase
                .firestore()
                .collection('progression')
                .doc(progression.id)
                .update({
                  status: 1,
                })
                .then(() => {
                  resolve({
                    code: 200,
                    message: 'Quest completed!',
                  });
                })
                .catch((error) => {
                  const errorObject = errorHandler('firestore', error);
                  reject(errorObject);
                });
            }
          });
        });
    });
  }
}

module.exports = StoryModel;
