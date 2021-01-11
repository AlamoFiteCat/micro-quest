import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Book } from 'src/app/interfaces/book';
import { StoryService } from 'src/app/services/story.service';

@Component({
  selector: 'app-story-page',
  templateUrl: './story-page.component.html',
  styleUrls: ['./story-page.component.scss'],
})
export class StoryPageComponent implements OnInit, OnDestroy {
  bookList: Book[];
  bookListSubscription: Subscription;

  constructor(private story: StoryService) {}

  ngOnInit(): void {
    this.bookListSubscription = this.story.bookList.subscribe((data) => {
      this.bookList = data;
    });
    this.story.fetchAllBooks();
  }

  ngOnDestroy(): void {
    this.bookListSubscription.unsubscribe();
  }
}
