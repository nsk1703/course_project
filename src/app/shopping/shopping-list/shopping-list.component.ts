import { Component, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { ShoppingService } from 'src/app/services/shopping.service';
import { Ingredients } from 'src/app/shared/models/ingredients.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: 'shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
    private subsc: Subscription;
    ingredients!: Ingredients[];

    constructor(private shoppingService: ShoppingService) {
    }

    ngOnInit() {
        this.ingredients = this.shoppingService.getIngredients();
        this.subsc = this.shoppingService.ingredientAdded
                            .subscribe(
                                (ingredient: Ingredients[]) => {
                                    this.ingredients = ingredient
                                }
                            )
    }

    onIngredientAdded(ingredient: Ingredients){
        this.shoppingService.addIngredients(ingredient);
    }

    ngOnDestroy(): void {
        this.subsc.unsubscribe();
    }

    editForm(index: number){
        this.shoppingService.startingEditIngredient.next(index)
    }
}
