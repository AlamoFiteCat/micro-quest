import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Quest } from 'src/app/intefaces/quest';
import { StoryService } from 'src/app/services/story.service';
import { Chapter } from '../../../intefaces/chapter';

@Component({
  selector: 'app-book-page',
  templateUrl: './book-page.component.html',
  styleUrls: ['./book-page.component.scss'],
})
export class BookPageComponent implements OnInit, OnDestroy {
  chapters: Chapter[];
  chapterSubscription: Subscription;
  bookURL: string;
  bookId: string;
  selectedChapter: string;

  quests: Quest[];
  questSubscription: Subscription;

  constructor(private story: StoryService) {}

  ngOnInit(): void {
    this.bookURL = window.location.href;
    this.bookId = this.bookURL.substr(33, window.location.href.length - 1);
    this.chapterSubscription = this.story.chapterList.subscribe((data) => {
      this.chapters = data;
    });
    this.questSubscription = this.story.questList.subscribe((data) => {
      this.quests = data;
    });
    this.story.fetchAllBookChapters(this.bookId);
  }

  onSelectChapter(chapterId: string): void {
    this.story.fetchAllChapterQuests(chapterId);
  }

  ngOnDestroy(): void {
    this.chapterSubscription.unsubscribe();
    this.questSubscription.unsubscribe();
  }
}
