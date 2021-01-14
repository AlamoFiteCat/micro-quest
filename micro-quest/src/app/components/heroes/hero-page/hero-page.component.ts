import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Hero } from 'src/app/interfaces/hero';
import { HeroesService } from 'src/app/services/heroes.service';

@Component({
  selector: 'app-hero-page',
  templateUrl: './hero-page.component.html',
  styleUrls: ['./hero-page.component.scss'],
})
export class HeroPageComponent implements OnInit {
  @Input() hero: Hero;

  constructor(private heroes: HeroesService) {}

  ngOnInit(): void {}

  onEquipItem(itemId: string): void {
    this.hero.gear.forEach((item) => {
      if (item.itemId === itemId) {
        if (item.equipped) {
          item.equipped = false;
        } else {
          item.equipped = true;
        }
      }
    });
  }

  onLockEqupment(): void {
    this.heroes.lockHeroEquipment(this.hero.name, this.hero.gear);
  }
}
