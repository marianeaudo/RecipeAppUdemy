import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipebookService } from 'src/app/services/recipebook.service';
import { Ingredient } from 'src/app/shared/ingredient.model';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss']
})
export class RecipeDetailComponent implements OnInit {
  @Input() recipe: Recipe;

  constructor(private recipebookService: RecipebookService) { }

  ngOnInit() {
  }

  onAddToShoppingList(ingredients: Ingredient[]) {
    this.recipebookService.addToShoppingList(this.recipe.ingredients);
  }
}
