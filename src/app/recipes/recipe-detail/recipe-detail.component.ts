import { Component, OnInit, OnDestroy} from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipebookService } from 'src/app/services/recipebook.service';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss']
})
export class RecipeDetailComponent implements OnInit, OnDestroy {
  recipe: Recipe;
  id: number;
  idsubscription: Subscription;

  constructor(private recipebookService: RecipebookService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.idsubscription = this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.recipe = this.recipebookService.getRecipeById(this.id);
      }
    );
  }

  onAddToShoppingList() {
    
  }

  // onAddToShoppingList(ingredients: Ingredient[]) {
  //   this.recipebookService.addToShoppingList(this.recipe.ingredients);
  // }

  onEditRecipe() {
    // this.router.navigate(['edit'], {relativeTo: this.route});
    this.router.navigate(['../', this.id, 'edit'], {relativeTo: this.route});
  }

  ngOnDestroy() {
    this.idsubscription.unsubscribe();
  }
}
