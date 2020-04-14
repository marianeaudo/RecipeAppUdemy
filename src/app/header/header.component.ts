import { Component, OnDestroy, OnInit} from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { User } from '../auth/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  isAuthenticated = false;
  fetchRecipesSbuscription: Subscription;
  userSubscription: Subscription;

  constructor(private dataStorage: DataStorageService, private authService: AuthService) {

  }

  ngOnInit() {
    this.userSubscription = this.authService.user.subscribe((user: User) => {
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
