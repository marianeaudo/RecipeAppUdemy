import { Injectable, EventEmitter } from '@angular/core';
import { Recipe } from '../recipes/recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppinglistService } from './shoppinglist.service';

@Injectable()
export class RecipebookService {

    private recipes: Recipe[] = [
        new Recipe(
            'A Tasty Schnitzel Recipe',
            'A super-tasty Schnitzel - just awesome!',
            'https://upload.wikimedia.org/wikipedia/commons/7/72/Schnitzel.JPG',
            [
                new Ingredient('Meat', 1),
                new Ingredient('French Fries', 20)
            ]
            ),
        new Recipe(
            'Big Fat Burger',
            'What else you need to say?',
            'https://upload.wikimedia.org/wikipedia/commons/b/be/Burger_King_Angus_Bacon_%26_Cheese_Steak_Burger.jpg',
            [
                new Ingredient('Buns', 2),
                new Ingredient('Meat', 1)
            ]
            )
      ];

    recipeSelected = new EventEmitter<Recipe>();

    constructor(private shoppinglistService: ShoppinglistService) {

    }

    getRecipeById(id: number) {
        return this.recipes.slice()[id];
    }

    getRecipes() {
        //permet de retourner une copie de recipes et non le tableau recipes du service
        return this.recipes.slice();
    }

    addToShoppingList(ingredients: Ingredient[]) {
        this.shoppinglistService.addIngredients(ingredients);
    }

    
}