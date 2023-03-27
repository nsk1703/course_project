import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IRecipe } from 'src/app/models/recipe.model';
import { RecipeService } from 'src/app/recipes/services/recipe.service';
import { DropdownService } from 'src/app/shared/dropdown.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {

	private subsc: Subscription;
	listRecipes: IRecipe[] = [];

	constructor(private recipeService: RecipeService,
				private router: Router,
				private activatedRoute: ActivatedRoute,
				private dropDownService: DropdownService) { }

	ngOnInit() {
		this.listRecipes = this.recipeService.getRecipes();
		// console.log('list', this.listRecipes);
		this.subsc = this.recipeService.listRecipesChanged
			.subscribe(
				(recipe: IRecipe[]) => {
					this.listRecipes = recipe;
				}
			)

		// this.subsc = this.dropDownService.listData
		//                  .subscribe((recipe: IRecipe) => {
        //                      this.listRecipes = recipe
		//                  })

	}

	ngOnDestroy(): void {
		this.subsc.unsubscribe();
	}


	onNewRecipes(){
		// Ici l'on redirige l'utilisateur vers la route du formulaire d'ajout
		// qui possede la meme route active, mais l'on ajoute seulement /new
		this.router.navigate(['add'], {relativeTo: this.activatedRoute})
	}
}
