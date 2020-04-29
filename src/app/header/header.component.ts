import { Component, OnDestroy, OnInit} from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';

import { AuthService } from '../auth/auth.service';
import { User } from '../auth/user.model';
import { DataStorageService } from '../shared/data-storage.service';
import * as fromApp from '../store/app.reducer';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  isAuthenticated = false;
  fetchRecipesSbuscription: Subscription;
  userSubscription: Subscription;

  constructor(private dataStorage: DataStorageService, private authService: AuthService, private store: Store<fromApp.AppState>) {

  }

  ngOnInit() {
    this.userSubscription = this.store
    .select('auth')
    .pipe(map((authData) => {
      return authData.user;
    }))
    .subscribe((user: User) => {
      this.isAuthenticated = !user ? false : true;
    });
  }

  onSaveData() {
    this.dataStorage.storeRecipes();
  }

  onFetchData() {
    this.fetchRecipesSbuscription = this.dataStorage.fetchRecipes().subscribe();
  }

  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy() {
    this.fetchRecipesSbuscription.unsubscribe();
    this.userSubscription.unsubscribe();
  }
}
