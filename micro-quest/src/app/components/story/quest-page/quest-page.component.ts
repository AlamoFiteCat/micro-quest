import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Encounter } from 'src/app/interfaces/encounter';
import { Hero } from 'src/app/interfaces/hero';
import { QuestPage } from 'src/app/interfaces/quest-page';
import { Reward } from 'src/app/interfaces/reward';
import { HeroesService } from 'src/app/services/heroes.service';
import { StoryService } from 'src/app/services/story.service';
import {
  combatLogResolver,
  calculateHeroCombat,
  calculateEnemyCombat,
} from '../../../utils/combat-utilities';

@Component({
  selector: 'app-quest-page',
  templateUrl: './quest-page.component.html',
  styleUrls: ['./quest-page.component.scss'],
})
export class QuestPageComponent implements OnInit {
  @ViewChild('prevBtn') prevBtnRef: ElementRef;
  @ViewChild('nextBtn') nextBtnRef: ElementRef;
  @ViewChild('endQuestBtn') endQuestBtnRef: ElementRef;
  @ViewChild('actionBtn') actionBtnRef: ElementRef;

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
  attackOrRun = 'Attack!';

  constructor(private story: StoryService, private heroes: HeroesService) {}

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
    // [If player has to run]
    if (this.attackOrRun === 'Run') {
      this.story.endQuestProgression(
        history.state.quest.id,
        this.currentHero.name,
        0
      );
    }
    // [If player can still fight]
    else {
      // [Hero Attack]
      const heroCombatResult: {
        heroAttack: number;
        heroDamage: number;
      } = calculateHeroCombat(this.currentHero, this.currentEncounter);
      const heroCombatLog = combatLogResolver(
        this.currentHero.name,
        this.currentHero.weapon,
        heroCombatResult.heroAttack - this.currentEncounter.armor,
        heroCombatResult.heroDamage,
        this.encounterCurrentHealth,
        this.currentEncounter.name
      );
      this.encounterCurrentHealth -= heroCombatResult.heroDamage;
      this.combatLog.push(heroCombatLog);

      // [Enemy Attack]
      const enemyCombatResult: {
        enemyAttack: number;
        enemyDamage: number;
        heroArmor: number;
      } = calculateEnemyCombat(this.currentHero, this.currentEncounter);
      const enemyCombatLog = combatLogResolver(
        this.currentEncounter.name,
        this.currentEncounter.weapon,
        enemyCombatResult.enemyAttack - enemyCombatResult.heroArmor,
        enemyCombatResult.enemyDamage,
        this.currentHero.currentHealth,
        this.currentHero.name
      );
      this.combatLog.push(enemyCombatLog);
      this.currentHero.currentHealth -= enemyCombatResult.enemyDamage;

      // [End of Combat Scenario]
      if (
        this.currentHero.currentHealth <= 0 ||
        this.encounterCurrentHealth <= 0
      ) {
        let reward: Reward = {
          experienceReward: this.currentEncounter.expReward,
          itemReward: this.currentEncounter.itemReward,
        };
        // [If the hero was defeated]
        if (this.currentHero.currentHealth < 0) {
          this.currentHero.currentHealth = 0;
          reward = {
            experienceReward: 0,
            itemReward: undefined,
          };
          this.attackOrRun = 'Run!';
        }
        this.heroes.updateHeroAfterCombat(
          this.currentHero.name,
          this.currentHero.currentHealth,
          reward
        );
        this.prevBtnRef.nativeElement.disabled = false;
        this.nextBtnRef.nativeElement.disabled = false;
      }
    }
  }
  onQuestEnd(): void {
    this.story.endQuestProgression(
      history.state.quest.id,
      this.currentHero.name,
      1
    );
  }
}
