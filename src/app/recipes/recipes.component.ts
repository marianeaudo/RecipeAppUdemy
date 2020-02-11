import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from './recipe.model';
import { RecipebookService } from '../services/recipebook.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss']
})
export class RecipesComponent implements OnInit {
  selectedRecipe: Recipe;

  constructor(private recipebookService: RecipebookService) { }

  ngOnInit() {
    this.recipebookService.recipeSelected.subscribe(
      (recipe: Recipe) => {
        this.selectedRecipe = recipe;
      }
    );
  }

}
