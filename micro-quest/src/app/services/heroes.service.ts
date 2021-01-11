import { Injectable } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { Hero } from '../interfaces/hero';

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
}
