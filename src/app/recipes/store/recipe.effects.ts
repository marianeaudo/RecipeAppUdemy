import { Actions, Effect, ofType } from "@ngrx/effects";
import { switchMap, map, withLatestFrom } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";

import * as fromRecipesActions from "../store/recipe.actions";
import { Recipe } from "../recipe.model";
import * as fromApp from "../../store/app.reducer";
import { dispatch } from "rxjs/internal/observable/pairs";

@Injectable()
export class RecipeEffects {
  @Effect()
  fetchRecipes = this.actions$.pipe(
    ofType(fromRecipesActions.FETCH_RECIPES),
    switchMap((fetchAction) => {
      return this.httpClient.get<Recipe[]>(
        "https://udemyrecipesapp.firebaseio.com/recipes.json"
      );
    }),
    map((recipes) => {
      return recipes.map((recipe) => {
        return {
          ...recipe,
          ingredients: recipe.ingredients ? recipe.ingredients : [],
        };
      });
    }),
    map((recipes: Recipe[]) => {
      return new fromRecipesActions.SetRecipes(recipes);
    })
  );

  @Effect({
    dispatch: false,
  })
  storeRecipes = this.actions$.pipe(
    ofType(fromRecipesActions.STORE_RECIPES),
    withLatestFrom(this.store.select("recipes")),
    switchMap(([actionData, recipesState]) => {
      return this.httpClient.put(
        "https://udemyrecipesapp.firebaseio.com/recipes.json",
        recipesState.recipes
      );
    })
  );

  constructor(
    private actions$: Actions,
    private httpClient: HttpClient,
    private store: Store<fromApp.AppState>
  ) {}
}
