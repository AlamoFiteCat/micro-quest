import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Encounter } from 'src/app/interfaces/encounter';
import { Hero } from 'src/app/interfaces/hero';
import { QuestPage } from 'src/app/interfaces/quest-page';
import { StoryService } from 'src/app/services/story.service';
import { combatLogResolver } from '../../../utils/combat-utilities';

@Component({
  selector: 'app-quest-page',
  templateUrl: './quest-page.component.html',
  styleUrls: ['./quest-page.component.scss'],
})
export class QuestPageComponent implements OnInit {
  @ViewChild('prevBtn') prevBtnRef: ElementRef;
  @ViewChild('nextBtn') nextBtnRef: ElementRef;
  @ViewChild('endQuestBtn') endQuestBtnRef: ElementRef;

  numberOfPages: number;
  currentPageNumber = 0;
  pageText: string;
  questName: string;
  currentPage: QuestPage;
  currentEncounter: Encounter;
  currentHero: Hero;
  encounterCurrentHealth: number;
  combatLog: string[] = [];
  lastPage: boolean;

  constructor(private story: StoryService) {}

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
      // [Lock Prev/Next Buttons]
      this.prevBtnRef.nativeElement.disabled = true;
      this.nextBtnRef.nativeElement.disabled = true;
    } else {
      this.currentEncounter = undefined;
    }

    if (this.currentPage.lastPage) {
      this.lastPage = true;
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

    // [Combat]
    // 1. Hero Attack
    const heroAttack = Math.floor(Math.random() * 20) + 1 + heroPrimaryModifier;
    let heroDamage = 0;
    if (heroAttack >= this.currentEncounter.armor) {
      heroDamage = Math.floor(Math.random() * 6) + 1 + heroPrimaryModifier;
      this.encounterCurrentHealth -= heroDamage;
    }

    const heroCombatLog = combatLogResolver(
      this.currentHero.name,
      this.currentHero.weapon,
      heroAttack - this.currentEncounter.armor,
      heroDamage,
      this.encounterCurrentHealth,
      this.currentEncounter.name
    );
    this.combatLog.push(heroCombatLog);

    // 2. Enemy Attack
    const enemyAttack =
      Math.floor(Math.random() * 20) +
      1 +
      this.currentEncounter.difficultyModifier;
    let enemyDamage = 0;

    if (enemyAttack >= heroArmor) {
      enemyDamage =
        Math.floor(Math.random() * this.currentEncounter.damage) +
        1 +
        this.currentEncounter.difficultyModifier;
      this.currentHero.currentHealth -= enemyDamage;
    }

    const enemyCombatLog = combatLogResolver(
      this.currentEncounter.name,
      this.currentEncounter.weapon,
      enemyAttack - heroArmor,
      enemyDamage,
      this.currentHero.currentHealth,
      this.currentHero.name
    );
    this.combatLog.push(enemyCombatLog);

    if (
      this.currentHero.currentHealth <= 0 ||
      this.encounterCurrentHealth <= 0
    ) {
      this.prevBtnRef.nativeElement.disabled = false;
      this.nextBtnRef.nativeElement.disabled = false;
    }
  }

  onQuestEnd(): void {
    this.story.endQuestProgression(
      history.state.quest.id,
      this.currentHero.name
    );
  }
}
