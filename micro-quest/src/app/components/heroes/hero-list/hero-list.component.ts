import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Hero } from 'src/app/interfaces/hero';
import { HeroesService } from 'src/app/services/heroes.service';

@Component({
  selector: 'app-hero-list',
  templateUrl: './hero-list.component.html',
  styleUrls: ['./hero-list.component.scss'],
})
export class HeroListComponent implements OnInit, OnDestroy {
  heroList: Hero[];
  heroListSubscription: Subscription;
  selectedHero: Hero;

  constructor(private heroes: HeroesService) {}

  ngOnInit(): void {
    this.heroListSubscription = this.heroes.heroList.subscribe((data) => {
      this.heroList = data;
      console.log(this.heroList);
    });
    this.heroes.fetchHeroesForCurrentUser();
  }

  onSelectHero(heroName: string): void {
    this.heroList.forEach((hero: Hero) => {
      if (hero.name === heroName) {
        this.selectedHero = hero;
      }
    });
  }

  ngOnDestroy(): void {
    this.heroListSubscription.unsubscribe();
  }
}
