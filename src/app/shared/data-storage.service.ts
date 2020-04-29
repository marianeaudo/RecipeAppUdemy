import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap, take, exhaustMap } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { RecipebookService } from '../services/recipebook.service';
import { Recipe } from '../recipes/recipe.model';
import * as fromApp from '../store/app.reducer';

@Injectable({ providedIn: 'root' })
export class DataStorageService {

    constructor(
      private httpClient: HttpClient,
      private recipeService: RecipebookService,
      private store: Store<fromApp.AppState>
                ) {

    }

    storeRecipes() {
        const recipes = this.recipeService.getRecipes();
        this.httpClient.put('https://udemyrecipesapp.firebaseio.com/recipes.json', recipes).subscribe((response) => {
        });
    }

    fetchRecipes() {
        return this.store.select('auth')
        .pipe(
          take(1),
          map((authData) => {
            return authData.user
          }),
          exhaustMap(user => {
            return this.httpClient.get<Recipe[]>('https://udemyrecipesapp.firebaseio.com/recipes.json')
                .pipe(map((recipes) => {
                    return recipes.map((recipe) => {
                        return { ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : [] }
                    });
                }), tap((recipes) => {
                    this.recipeService.setRecipe(recipes)
                }));
        }));
    }


}
