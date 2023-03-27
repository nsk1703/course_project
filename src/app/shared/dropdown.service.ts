import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { RecipeService } from '../recipes/services/recipe.service';
import { IRecipe, Recipe} from '../models/recipe.model'
import { BehaviorSubject } from 'rxjs';
import { exhaustMap, map, take, tap } from 'rxjs/operators';
import { Account } from '../auth/account.model';
import { AuthService } from '../auth/auth.service';

@Injectable({providedIn: 'root'})
export class DropdownService {

    private httpParams = new HttpParams();
    // Ici l'on veut pour sauvegarder toutes les donnees (recipes) dans firebase
    // Nous aurons pu le faire dans recipeService, 
    // Mais il faudrait organiser le code
    constructor(
        private http: HttpClient, 
        private recipesService: RecipeService,
        private authService: AuthService,
       
    ){}

   
    // listData = new BehaviorSubject<IRecipe>({});
        

    saveData(){
        // La meme chose dans le fetchData peut etre fait ici,
        // mais allons utiliser le interceptor pour ce cas, 
        // mais un interceptor s'executera pour tout le projet, donc pour les requetes qui sortiront 
        // ayant besoin de token
        const recipes = this.recipesService.getRecipes();

       // puisse que l'on a pas besoin du subscribe dans le component qui consommera le service,
       // l'on peut ou pas souscrire ici
        return this.http.put('https://ng-course-project-245f4-default-rtdb.europe-west1.firebasedatabase.app/recipes.json',
              recipes
        ).subscribe((response)=>{
            console.log(response);
            
        })
    }

    // 1 ere methode fonctionnel par la creation d'un subject par lequel va heriter un recipe-list-component
    // mais nous voyons que les donnees doivent toujours arriver par son propre Subject "listRecipesChanged",
    // Donc nous pouvons y avoir acces par une methode de son service
    fetchData(){
        // Lorsqu'une recette n'a pas d'ingredient, cet attribut n'apparait pas
        // Donc nous devons mapper par un pipe, pour changer le retour que l'on a poster dans la BD
        // ...recipe veut dire que l'on veut tous les attributs     
        return this.http.get<IRecipe[]>(

            'https://ng-course-project-245f4-default-rtdb.europe-west1.firebasedatabase.app/recipes.json'
             
        ).pipe(
           map(recipes => {
            return recipes.map(recipe => {
                return {
                    ...recipe, 
                    ingredients: recipe.ingredients ? recipe.ingredients : []
                };
            });
           }),
            // tap permet d'executer n'importe quel code sur les donnees sans les endommager
            tap(recipes => {
                this.recipesService.setRecipes(recipes);  
            })
        )
        
    }                
}