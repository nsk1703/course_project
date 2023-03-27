import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Recipe } from 'src/app/models/recipe.model';
import { RecipeService } from 'src/app/recipes/services/recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

	id: number;
	recipe: Recipe;

	constructor(private recipeService: RecipeService,
				private router: Router,
				private activeRoute: ActivatedRoute) { }

	ngOnInit() {
		this.activeRoute.params
			.subscribe(
				(params: Params) => {
					this.id = +params['id'];
					this.recipe = this.recipeService.getRecipe(+params['id']);
				}
			)
	}

	onAddToShoppingList(){
		this.recipeService.addIngredientToList(this.recipe.ingredients);
	}

	onEditRecipe(){
		this.router.navigate(['edit'], {relativeTo: this.activeRoute})
	}

	onDeleteRecipe(){
		this.recipeService.deleteRecipe(this.id);
		this.router.navigate(['../'], {relativeTo: this.activeRoute})	
	}  

}
