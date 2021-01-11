import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Quest } from 'src/app/intefaces/quest';
import { Hero } from 'src/app/interfaces/hero';
import { HeroesService } from 'src/app/services/heroes.service';

@Component({
  selector: 'app-chapter-page',
  templateUrl: './chapter-page.component.html',
  styleUrls: ['./chapter-page.component.scss'],
})
export class ChapterPageComponent implements OnInit, OnDestroy {
  @Input() chapterQuests: Quest[];

  heroSelectionForm = new FormGroup({
    selectedHero: new FormControl('', Validators.required),
  });

  heroList: Hero[];
  heroSubscription: Subscription;
  currentHero: Hero;

  constructor(private heroes: HeroesService) {}

  ngOnInit(): void {
    this.heroSubscription = this.heroes.heroList.subscribe((data: Hero[]) => {
      this.heroList = data;
    });
    this.heroes.fetchHeroesForCurrentUser();
  }

  onLockChoice(): void {
    this.heroList.forEach((hero) => {
      if (hero.name === this.heroSelectionForm.value.selectedHero) {
        this.currentHero = hero;
        this.heroSelectionForm.disable();
      }
    });
  }

  ngOnDestroy(): void {
    this.heroSubscription.unsubscribe();
  }
}
