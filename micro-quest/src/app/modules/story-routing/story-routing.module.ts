import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BookPageComponent } from 'src/app/components/story/book-page/book-page.component';
import { QuestPageComponent } from 'src/app/components/story/quest-page/quest-page.component';
import { StoryPageComponent } from 'src/app/components/story/story-page/story-page.component';

const routes: Routes = [
  { path: '', component: StoryPageComponent, data: { animation: 'StoryPage' } },
  { path: 'book/:id', component: BookPageComponent },
  {
    path: 'quest/:id',
    component: QuestPageComponent,
    data: { animation: 'StoryPage' },
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StoryRoutingModule {}
