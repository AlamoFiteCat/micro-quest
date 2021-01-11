import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Hero } from 'src/app/interfaces/hero';
import { HeroesService } from 'src/app/services/heroes.service';

@Component({
  selector: 'app-hero-create',
  templateUrl: './hero-create.component.html',
  styleUrls: ['./hero-create.component.scss'],
})
export class HeroCreateComponent implements OnInit {
  constructor(private heroes: HeroesService) {}
  // [Hero Primary Stats]
  strength: number;
  dexterity: number;
  intelligence: number;
  charisma: number;

  heroPoints: number;

  heroForm = new FormGroup({
    heroName: new FormControl('', Validators.required),
    heroPicture: new FormControl('', Validators.required),
    heroBackstory: new FormControl('', Validators.required),
    heroPrimaryStat: new FormControl('', Validators.required),
  });

  ngOnInit(): void {
    this.strength = 10;
    this.dexterity = 10;
    this.intelligence = 10;
    this.charisma = 10;

    this.heroPoints = 10;
  }

  onHeroSubmit(): void {
    const {
      heroName,
      heroPicture,
      heroBackstory,
      heroPrimaryStat,
    } = this.heroForm.value;
    const newHero: Hero = {
      name: heroName,
      picture: heroPicture,
      story: heroBackstory,
      strength: this.strength,
      dexterity: this.dexterity,
      intelligence: this.intelligence,
      charisma: this.charisma,
      primaryStat: heroPrimaryStat,
    };

    this.heroes.createNewHero(newHero);
  }

  onChangeStat(stat: string, type: string): void {
    switch (stat) {
      case 'strength':
        if (type === 'add') {
          // [add strength]
          if (this.heroPoints > 0 && this.strength < 15) {
            this.strength++;
            this.heroPoints--;
          }
        } else {
          // [remove strength]
          if (this.strength > 10) {
            this.strength--;
            this.heroPoints++;
          }
        }
        break;
      case 'dexterity':
        if (type === 'add') {
          // [add dexterity]
          if (this.heroPoints > 0 && this.dexterity < 15) {
            this.dexterity++;
            this.heroPoints--;
          }
        } else {
          // [remove dexterity]
          if (this.dexterity > 10) {
            this.dexterity--;
            this.heroPoints++;
          }
        }
        break;
      case 'intelligence':
        if (type === 'add') {
          // [add intelligence]
          if (this.heroPoints > 0 && this.intelligence < 15) {
            this.intelligence++;
            this.heroPoints--;
          }
        } else {
          // [remove intelligence]
          if (this.intelligence > 10) {
            this.intelligence--;
            this.heroPoints++;
          }
        }
        break;
      case 'charisma':
        if (type === 'add') {
          // [add charisma]
          if (this.heroPoints > 0 && this.charisma < 15) {
            this.charisma++;
            this.heroPoints--;
          }
        } else {
          // [remove charisma]
          if (this.charisma > 10) {
            this.charisma--;
            this.heroPoints++;
          }
        }
        break;
    }
  }
}
