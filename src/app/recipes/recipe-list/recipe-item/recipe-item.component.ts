import { Component, OnInit, Input} from '@angular/core';
import { Recipe } from '../../recipe.model';
import { RecipebookService } from 'src/app/services/recipebook.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.scss']
})
export class RecipeItemComponent implements OnInit {

  @Input() recipe: Recipe;

  constructor(private recipebookService: RecipebookService) { }

  ngOnInit() {
  }

  onSelected() {
    this.recipebookService.recipeSelected.emit(this.recipe);
  }

}
