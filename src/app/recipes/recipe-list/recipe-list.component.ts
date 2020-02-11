import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipebookService } from 'src/app/services/recipebook.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [];

  constructor(private recipebookService: RecipebookService) { }

  ngOnInit() {
    this.recipes = this.recipebookService.getRecipes();
  }

}
