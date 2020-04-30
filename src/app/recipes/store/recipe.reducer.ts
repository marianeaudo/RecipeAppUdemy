import { Recipe } from "../recipe.model";
import * as fromRecipeActions from "./recipe.actions";

export interface State {
  recipes: Recipe[];
}

const initialState: State = {
  recipes: [],
};

export function recipeReducer(
  state: State = initialState,
  action: fromRecipeActions.RecipesActions
) {
  switch (action.type) {
    case fromRecipeActions.SET_RECIPES:
      return {
        ...state,
        recipes: action.payload,
      };
    case fromRecipeActions.ADD_RECIPE:
      return {
        ...state,
        recipes: [...state.recipes, action.payload],
      };
    case fromRecipeActions.UPDATE_RECIPE:
      const updatedRecipe = {
        ...state.recipes[action.payload.index],
        ...action.payload.newRecipe,
      };

      const updatedRecipes = [...state.recipes];
      updatedRecipes[action.payload.index] = updatedRecipe;

      return {
        ...state,
        recipes: updatedRecipes,
      };
    case fromRecipeActions.DELETE_RECIPE:
      return {
        ...state,
        recipes: state.recipes.filter((recipe, index) => {
          return index !== action.payload;
        }),
      };
    default:
      return state;
  }
}
