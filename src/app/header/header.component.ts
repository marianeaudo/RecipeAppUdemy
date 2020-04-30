import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { Store } from "@ngrx/store";
import { map } from "rxjs/operators";

import { User } from "../auth/user.model";
import * as fromApp from "../store/app.reducer";
import * as fromAuthActions from "../auth/store/auth.actions";
import * as fromRecipeActions from "../recipes/store/recipe.actions";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated = false;
  userSubscription: Subscription;

  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit() {
    this.userSubscription = this.store
      .select("auth")
      .pipe(
        map((authData) => {
          return authData.user;
        })
      )
      .subscribe((user: User) => {
        this.isAuthenticated = !user ? false : true;
      });
  }

  onSaveData() {
    this.store.dispatch(new fromRecipeActions.StoreRecipes());
  }

  onFetchData() {
    this.store.dispatch(new fromRecipeActions.FetchRecipes());
  }

  onLogout() {
    this.store.dispatch(new fromAuthActions.Logout());
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }
}
