import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { RecipebookService } from '../services/recipebook.service';
import { Recipe } from '../recipes/recipe.model';
import { map, tap, take, exhaustMap } from 'rxjs/operators'
import { AuthService } from '../auth/auth.service';

@Injectable({ providedIn: 'root' })
export class DataStorageService {

    constructor(private httpClient: HttpClient, private recipeService: RecipebookService, private authService: AuthService) {

    }

    storeRecipes() {
        const recipes = this.recipeService.getRecipes();
        this.httpClient.put('https://udemyrecipesapp.firebaseio.com/recipes.json', recipes).subscribe((response) => {
        });
    }

    fetchRecipes() {
        return this.authService.user.pipe(take(1), exhaustMap(user => {
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