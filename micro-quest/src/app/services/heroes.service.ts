import { Injectable } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { Hero } from '../interfaces/hero';
import { Reward } from '../interfaces/reward';
import { Item } from '../interfaces/item';

@Injectable({
  providedIn: 'root',
})
export class HeroesService {
  heroList = new Subject<Hero[]>();

  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private router: Router
  ) {}

  fetchHeroesForCurrentUser(): Subscription {
    return this.http
      .get(`${environment.apiUrl}/heroes`, { withCredentials: true })
      .subscribe(
        (data: Hero[]) => {
          this.heroList.next(data);
        },
        (response) => {
          this.toastr.error(response.error.message, 'Error!');
        }
      );
  }

  createNewHero(hero: Hero): Subscription {
    return this.http
      .post(
        `${environment.apiUrl}/heroes/create`,
        { hero },
        { withCredentials: true }
      )
      .subscribe(
        () => {
          this.fetchHeroesForCurrentUser();
          this.router.navigate(['heroes']);
        },
        (response) => {
          this.toastr.error(response.error.message, 'Error!');
        }
      );
  }

  updateHeroAfterCombat(
    heroId: string,
    heroHealth: number,
    encounterReward: Reward
  ): Subscription {
    return this.http
      .put(
        `${environment.apiUrl}/heroes/afterCombat`,
        { hero: heroId, health: heroHealth, reward: encounterReward },
        { withCredentials: true }
      )
      .subscribe(
        (data) => {
          this.toastr.info('Combat finished!', 'Info');
        },
        (response) => {
          this.toastr.error(response.error.message, 'Error!');
        }
      );
  }

  lockHeroEquipment(heroId: string, heroEquipment: Item[]): Subscription {
    return this.http
      .put(
        `${environment.apiUrl}/heroes/lockEquipment`,
        { hero: heroId, equipment: heroEquipment },
        { withCredentials: true }
      )
      .subscribe(
        () => {
          this.toastr.info('Hero equipment updated!');
          this.router.navigate(['heroes']);
        },
        (response) => {
          this.toastr.error(response.error.message, 'Error!');
        }
      );
  }
}
