import { Injectable } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { CurrentUser } from '../interfaces/current-user';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    private router: Router
  ) {}
  currentUser = new Subject<CurrentUser>();

  fetchCurrentUser(): Subscription {
    return this.http
      .get(`${environment.apiUrl}/auth/current`, { withCredentials: true })
      .subscribe((user: CurrentUser) => {
        this.currentUser.next(user);
      });
  }

  registerUser(
    email: string,
    username: string,
    password: string
  ): Subscription {
    return this.http
      .post(
        `${environment.apiUrl}/auth/register`,
        { email, username, password },
        { withCredentials: true }
      )
      .subscribe(
        (user: CurrentUser) => {
          this.currentUser.next(user);
          this.router.navigate(['heroes']);
          this.toastr.success('Welcome, Champion!', 'Success!');
        },
        (response) => {
          this.toastr.error(response.error.message, 'Error!');
        }
      );
  }

  loginUser(email: string, password: string): Subscription {
    return this.http
      .post(
        `${environment.apiUrl}/auth/login`,
        { email, password },
        { withCredentials: true }
      )
      .subscribe(
        (user: CurrentUser) => {
          this.currentUser.next(user);
          this.router.navigate(['heroes']);
          this.toastr.success('Welcome back!', 'Success!');
        },
        (response) => {
          this.toastr.error(response.error.message, 'Error!');
        }
      );
  }

  logoutUser(): Subscription {
    return this.http
      .post(`${environment.apiUrl}/auth/logout`, {}, { withCredentials: true })
      .subscribe(
        (user: CurrentUser) => {
          this.currentUser.next(user);
          this.router.navigate(['auth/login']);
          this.toastr.success('See you later!', 'Success!');
        },
        () => {
          this.toastr.error(
            'We could not log you out at the moment!',
            'Error!'
          );
        }
      );
  }
}
