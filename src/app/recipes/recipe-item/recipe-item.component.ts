import { Component, Input, Output, OnInit,EventEmitter } from '@angular/core';
import { Recipe } from 'src/app/models/recipe.model';
import { RecipeService } from 'src/app/recipes/services/recipe.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {

  // Etant le children, il "recoit" ici du parent par @Input, 
  // pour lier le recipe en entrée du composant pour donner a sa vue.
  @Input() recipe: Recipe;
  @Input() index: number;

  // Ici Etant toujours children, il "envoit" 
  // au parent un evenement emis(avec ou sans information)
  // Apres plus besoin de lui, puisse que l'on a crée un service 
  // pour se charger de l'inter-communication entre composants
  // @Output() recipeSelected = new EventEmitter<void>();
  constructor(private reciperService: RecipeService) { }

  ngOnInit() {
  }

  // onSelected(){
  //   this.reciperService.recipeSelected.emit(this.recipe);
  // }

}
