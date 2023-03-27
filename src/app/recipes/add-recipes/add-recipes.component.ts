import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Recipe } from 'src/app/models/recipe.model';
import { RecipeService } from 'src/app/recipes/services/recipe.service';

@Component({
  selector: 'app-add-recipes',
  templateUrl: './add-recipes.component.html',
  styleUrls: ['./add-recipes.component.css']
})
export class AddRecipesComponent implements OnInit {
// Ce composant sert a l'edition et l'ajout d'une recette
	id: number;
	editMode = false;

	recipeForm: FormGroup;
	constructor(private activedRoute: ActivatedRoute,
				private router: Router,
				private formBuild: FormBuilder,
				private recipeService: RecipeService){}

	ngOnInit() {
		
		console.log('recipeForm',this.recipeForm);
		
		// console.log('recipeForm',this.recipeForm);
		// On essaie de definir un mode edition ou ajout
		this.activedRoute.params
			.subscribe(
				(params: Params) => {
					if(params['id']){
						this.id = params['id'];
						this.editMode = params['id'] != null;
					}
				}
			)
		this.initForm();
		console.log(this.editMode);
		console.log('ingredients',this.ingredients.controls);
		console.log('recipeForm2',this.recipeForm);
	}

	get ingredients(): FormArray {
		return this.recipeForm.get('ingredients') as FormArray;
	}

	get addRfm() {
		return this.recipeForm.controls;
	}

	private initForm(){
		let recipeName = '';
		let recipeImagePath = '';
		let recipeDescription = '';
		let recipeIngredients = this.formBuild.array([])

		if(this.editMode){
			const recipe = this.recipeService.getRecipe(this.id)

			recipeName = recipe.name;
			recipeImagePath = recipe.imagePath;
			recipeDescription = recipe.description;

			if(recipe.ingredients){
				for(let ingredient of recipe.ingredients){
					recipeIngredients.push(
						this.formBuild.group({
							'name': [ingredient.name, Validators.required],
							'amount': [ingredient.amount, [
								Validators.required, 
								Validators.pattern('/^[1-9]+[0-9]*$/')
							]]
						})
					)
				}
			}
				
		}

		this.recipeForm = this.formBuild.group({
			name: [recipeName, Validators.required],
			imagePath: [recipeImagePath, Validators.required],
			description: [recipeDescription],
			ingredients: recipeIngredients
		});
	}

	onSubmit(){
		if(!this.editMode)
			this.recipeService.addRecipe(this.recipeForm.value);
		else
			this.recipeService.updateRecipes(this.id, this.recipeForm.value);

		this.onCancel();
	}

	onCancel(){
		this.router.navigate(['../'], {relativeTo: this.activedRoute})
	}

	onAddIngredient(){
		this.ingredients.push(
			this.formBuild.group({
				'name': ['', Validators.required],
				'amount': ['', [
					Validators.required, 
					Validators.pattern('^[1-9]+[0-9]*$')
				]]
			})
		)

	}

	deleteIngredient(index: number){ 
		this.ingredients.removeAt(index)
	}

}
