import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Quest } from 'src/app/intefaces/quest';
import { Hero } from 'src/app/interfaces/hero';
import { HeroesService } from 'src/app/services/heroes.service';
import { StoryService } from 'src/app/services/story.service';

@Component({
  selector: 'app-chapter-page',
  templateUrl: './chapter-page.component.html',
  styleUrls: ['./chapter-page.component.scss'],
})
export class ChapterPageComponent implements OnInit, OnDestroy {
  @Input() chapterQuests: Quest[];

  heroSelectionForm = new FormGroup({
    selectedHero: new FormControl('', Validators.required),
    selectedQuest: new FormControl('', Validators.required),
  });

  heroList: Hero[];
  heroSubscription: Subscription;
  questAvailableSubscription: Subscription;
  currentHero: Hero;
  currentQuest: Quest;
  choiceLocked = false;
  questAvailable = false;

  constructor(
    private heroes: HeroesService,
    private story: StoryService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.heroSubscription = this.heroes.heroList.subscribe((data: Hero[]) => {
      this.heroList = data;
    });
    this.questAvailableSubscription = this.story.questAvailable.subscribe(
      (data) => {
        if (data) {
          this.router.navigateByUrl(`/story/quest/${this.currentQuest.id}`, {
            state: { quest: this.currentQuest, hero: this.currentHero },
          });
        }
      }
    );
    this.heroes.fetchHeroesForCurrentUser();
  }

  onLockChoice(): void {
    this.heroList.forEach((hero) => {
      if (hero.name === this.heroSelectionForm.value.selectedHero) {
        this.currentHero = hero;
      }
    });

    this.chapterQuests.forEach((quest) => {
      if (this.heroSelectionForm.value.selectedQuest === quest.id) {
        this.currentQuest = quest;
      }
    });

    if (!!this.currentHero && !!this.currentQuest) {
      this.heroSelectionForm.disable();
      this.choiceLocked = true;
    }
  }

  onStartQuest(): void {
    this.story.startQuestProgression(
      this.currentQuest.id,
      this.currentHero.name
    );
  }

  ngOnDestroy(): void {
    this.heroSubscription.unsubscribe();
  }
}
