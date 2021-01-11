import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { CurrentUser } from '../../../interfaces/current-user';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  userSubscription: Subscription;
  userLogged = false;
  currentUser: CurrentUser;
  constructor(private auth: AuthService) {}

  ngOnInit(): void {
    this.userSubscription = this.auth.currentUser.subscribe(
      (data: CurrentUser) => {
        if (data.currentEmail) {
          this.currentUser = data;
          this.userLogged = true;
        } else {
          this.userLogged = false;
        }
      }
    );
    this.auth.fetchCurrentUser();
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }

  onUserLogout(): void {
    this.auth.logoutUser();
    this.currentUser = undefined;
  }
}
