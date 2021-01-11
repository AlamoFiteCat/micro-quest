import { Page } from './page';

export interface Quest {
  id: string;
  name: string;
  bookId: string;
  bookName: string;
  chapterId: string;
  chapterName: string;
  pages: Page[];
}
