import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { StoryPageComponent } from 'src/app/components/story/story-page/story-page.component';
import { StoryRoutingModule } from '../story-routing/story-routing.module';
import { BookPageComponent } from 'src/app/components/story/book-page/book-page.component';
import { ChapterPageComponent } from 'src/app/components/story/chapter-page/chapter-page.component';
import { QuestPageComponent } from 'src/app/components/story/quest-page/quest-page.component';

@NgModule({
  declarations: [
    StoryPageComponent,
    BookPageComponent,
    ChapterPageComponent,
    QuestPageComponent,
  ],
  imports: [CommonModule, SharedModule, StoryRoutingModule],
})
export class StoryModule {}
