const StoryModel = require('../models/story.model');
const sm = new StoryModel();
class StoryController {
  getAllBooks() {
    return sm.fetchAllBooks();
  }

  getChaptersForBook(bookId) {
    return sm.fetchAllBookChapters(bookId);
  }

  getQuestsForChapter(chapterId) {
    return sm.fetchAllChapterQuests(chapterId);
  }
}

module.exports = StoryController;
