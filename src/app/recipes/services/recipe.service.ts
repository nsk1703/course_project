import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { IRecipe, Recipe } from 'src/app/models/recipe.model';
import { Ingredients } from 'src/app/shared/models/ingredients.model';
import { ShoppingService } from '../../services/shopping.service';

// Ce service a besoin de ShoppingService pour inserer les ingredients dans la liste de Shopping
@Injectable({providedIn: 'root'})
export class RecipeService {

	listRecipesChanged = new Subject<IRecipe[]>();
	private listRecipes: IRecipe[] = [];
  	// private listRecipes: IRecipe[] = [
	// 	new Recipe(
	// 		// 1,
	// 		'A Test Recipe', 
	// 		'Simply test', 
	// 		'https://cdn.pixabay.com/photo/2020/02/02/15/07/meat-4813261_960_720.jpg',
	// 		[
	// 			new Ingredients("Meat", 2500),
	// 			new Ingredients("Onion", 150)
	// 		]
	// 	),
	// 	new Recipe(
	// 		// 2,
	// 		'Another Test Recipe', 
	// 		'Simply test', 
	// 		'https://cdn.pixabay.com/photo/2015/09/16/20/10/dough-943245__340.jpg',
	// 		[
	// 			new Ingredients("Flour", 2000),
	// 			new Ingredients("Sugar", 500)
	// 		]
	// 	)
  	// ];

	constructor(private slService: ShoppingService,
		        private http: HttpClient) { }

	setRecipes(recipes: IRecipe[]){
        this.listRecipes = recipes;
		this.listRecipesChanged.next(this.listRecipes.slice())
	}
	   
	getRecipes(){
		return this.listRecipes.slice();
	}

	getRecipe(index: number){
		return this.listRecipes[index]
	}

	addIngredientToList(ingredient: Ingredients[]){
		this.slService.addIngredient(ingredient);
	}

	addRecipe(recipe: IRecipe){
		this.listRecipes.push(recipe);
		this.listRecipesChanged.next(this.listRecipes.slice())
	}

	updateRecipes(index: number, recipe: Recipe){
		this.listRecipes[index] = recipe;
		this.listRecipesChanged.next(this.listRecipes.slice());
	}

	deleteRecipe(index: number){
		this.listRecipes.splice(index, 1);
		this.listRecipesChanged.next(this.listRecipes.slice());
	}
}

