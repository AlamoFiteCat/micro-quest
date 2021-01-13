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

  startQuest(questId, heroId) {
    return sm.startQuestWithHero(questId, heroId);
  }

  endQuest(questId, heroId, status) {
    return sm.endQuestWithHero(questId, heroId, status);
  }
}

module.exports = StoryController;
