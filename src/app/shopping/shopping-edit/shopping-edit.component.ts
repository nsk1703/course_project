import { Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ShoppingService } from 'src/app/services/shopping.service';
import { Ingredients } from 'src/app/shared/models/ingredients.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
	subsc : Subscription;
	ingredientEdit: Ingredients
	submitted = false;
	shForm: FormGroup;
	editMode = false;
	itemIndex: number;
	constructor(private slService: ShoppingService, 
				private fbd: FormBuilder) { }

	ngOnInit() {
		this.shForm = this.fbd.group({
		name: ['', Validators.required],
		amount: ['', [Validators.required, Validators.pattern('^[1-9]+[0-9]*$')]
				]
		})
		console.log(this.shForm);
		this.subsc = this.slService.startingEditIngredient.subscribe(
			(index: number) => {
				this.editMode = true;
				this.itemIndex = index;
				this.ingredientEdit = this.slService.getIngredient(index);  
				this.shForm.setValue({
					name: this.ingredientEdit.name,
					amount: this.ingredientEdit.amount
				})
			}
		)
	}
	
	get fm() : any {
		return this.shForm.controls;
	}

	// Ici on a une meme methode d'ajout et d'edition parce le formulaire
	// et la liste sont sur la meme page, donc l'on ne change pas de page lors de la selection
	// Mais on definit un mode edition en booleen
	onSubmit(){
		this.submitted = true;
		const {name, amount} = this.shForm.value;

		const newIngredient = new Ingredients(name, amount);
		if(!this.editMode)
			this.slService.addIngredients(newIngredient);
		else
			this.slService.updateIngredient(this.itemIndex, newIngredient);
		
		this.resetForm();
	}

	resetForm(){
		this.submitted = false;
		this.shForm.reset();
		this.editMode = false;
	}

	ngOnDestroy(): void {
		this.subsc.unsubscribe()
	}

	onClear(){
		this.resetForm();
	}

	onDelete(){
		this.slService.deleteIngredient(this.itemIndex);
		this.onClear();
	}

}
