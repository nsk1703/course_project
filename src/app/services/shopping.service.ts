import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredients } from 'src/app/shared/models/ingredients.model';

@Injectable({providedIn: 'root'})
export class ShoppingService {

	startingEditIngredient = new Subject<number>();
	ingredientAdded = new Subject<Ingredients[]>();
	private ingredients: Ingredients[] = [
		new Ingredients('Tomatoes', 25),
		new Ingredients('Apple', 30)
	];

	constructor() { }

	addIngredients(ingredient: Ingredients){
		// L'on recupère bien l'ingrédient ajouté ici, 
		// mais pas ajouté dynamiquement dans le tableau de départ
		// Faudrait utiliser un Subject, pour être a l'écoute et 
		// et eveillé le tableau
		console.log('ingredients', ingredient);
		this.ingredients.push(ingredient);
		this.ingredientAdded.next(this.ingredients.slice());
	}

	getIngredients(){
		return this.ingredients.slice();
	}

	getIngredient(index: number){
		return this.ingredients[index]
	}

	addIngredient(ingredient: Ingredients[]){
		// Operateur d'étalement, permet de charger dans un tableau ou objet 
		// une liste d'éléments etant dans un tableau ou un autre objet.
		this.ingredients.push(...ingredient);
		this.ingredientAdded.next(this.ingredients.slice());
	}

	updateIngredient(index: number, editedIngredient: Ingredients){
		this.ingredients[index] = editedIngredient;
		// On met a jour le Subject qui est porteur d'information de notre modele
		this.ingredientAdded.next(this.ingredients.slice());

	}

	deleteIngredient(index: number){
		this.ingredients.splice(index, 1);
		this.ingredientAdded.next(this.ingredients.slice());
	}
}
