import { Component, OnInit } from '@angular/core';
import { Encounter } from 'src/app/interfaces/encounter';
import { Hero } from 'src/app/interfaces/hero';
import { QuestPage } from 'src/app/interfaces/quest-page';

@Component({
  selector: 'app-quest-page',
  templateUrl: './quest-page.component.html',
  styleUrls: ['./quest-page.component.scss'],
})
export class QuestPageComponent implements OnInit {
  numberOfPages: number;
  currentPageNumber = 0;
  pageText: string;
  questName: string;
  currentPage: QuestPage;
  currentEncounter: Encounter;
  currentHero: Hero;
  encounterCurrentHealth: number;

  constructor() {}

  ngOnInit(): void {
    this.numberOfPages = history.state.quest.pages.length - 1;
    this.pageText = history.state.quest.pages[0].pageText;
    this.questName = history.state.quest.name;
    this.currentHero = history.state.hero;
  }

  onPagesControl(control: string): void {
    if (control === 'next') {
      if (this.currentPageNumber < this.numberOfPages) {
        this.currentPageNumber++;
        this.currentPage = history.state.quest.pages[this.currentPageNumber];
        this.pageText = this.currentPage.pageText;
      }
    } else {
      if (this.currentPageNumber > 0) {
        this.currentPageNumber--;
        this.currentPage = history.state.quest.pages[this.currentPageNumber];
        this.pageText = this.currentPage.pageText;
      }
    }

    if (!!this.currentPage.encounter) {
      this.currentEncounter = this.currentPage.encounter;
      this.encounterCurrentHealth = this.currentEncounter.health;
    } else {
      this.currentEncounter = undefined;
    }
  }

  onPlayerAction(): void {
    // [Hero Stats]
    const heroPrimaryModifier = Math.floor(
      (this.currentHero[this.currentHero.primaryStat] - 10) / 2
    );
    const heroArmor =
      this.currentHero.armor +
      Math.floor((this.currentHero.dexterity - 10) / 2);

    // [Enemy Stats]

    // [Combat]

    // 1. Hero Attack
    const heroAttack = Math.floor(Math.random() * 20) + 1 + heroPrimaryModifier;
    if (heroAttack >= this.currentEncounter.armor) {
      const heroDamage =
        Math.floor(Math.random() * 6) + 1 + heroPrimaryModifier;
      this.encounterCurrentHealth -= heroDamage;
    }
    // 2. Enemy Attack
    const enemyAttack =
      Math.floor(Math.random() * 20) +
      1 +
      this.currentEncounter.difficultyModifier;

    if (enemyAttack >= heroArmor) {
      const enemyDamage =
        Math.floor(Math.random() * this.currentEncounter.damage) +
        1 +
        this.currentEncounter.difficultyModifier;
      this.currentHero.currentHealth -= enemyDamage;
    }

    // [Combat Resolution]
  }
}
