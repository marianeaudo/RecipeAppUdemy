import { Component, Input } from '@angular/core';
import { Recipe } from './recipes/recipe.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  chosenComponent: string = 'recipe';

  onNavigate(selection: string) {
    this.chosenComponent = selection;
  }
 }
