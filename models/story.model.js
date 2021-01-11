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
}

module.exports = StoryModel;
