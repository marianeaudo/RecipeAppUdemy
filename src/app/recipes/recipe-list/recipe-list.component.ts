import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipebookService } from 'src/app/services/recipebook.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [];

  constructor(private recipebookService: RecipebookService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.recipes = this.recipebookService.getRecipes();
  }

  onNewRecipe() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }
}
