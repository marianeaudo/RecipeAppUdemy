import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  UrlTree,
} from "@angular/router";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map, take } from "rxjs/operators";
import { Store } from "@ngrx/store";

import { User } from "./user.model";
import * as fromApp from "../store/app.reducer";
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
    private store: Store<fromApp.AppState>
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    router: RouterStateSnapshot
  ):
    | Promise<boolean | UrlTree>
    | Observable<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.store.select("auth").pipe(
      take(1),
      map((authState) => {
        return authState.user;
      }),
      map((user: User) => {
        const isAuth = user ? true : false;
        if (isAuth) {
          return true;
        }
        return this.router.createUrlTree(["/auth"]);
      })
    );
  }
}
