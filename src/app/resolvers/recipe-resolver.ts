import { IRecipe } from '../models/recipe.model';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

import { DropdownService } from '../shared/dropdown.service';

@Injectable()
export class RecipeResolver implements Resolve<IRecipe> {

    // Un resolver est fait pour recuperer les données pour un element ayant son id
    // dans l'url et il faudrait cette id pour recuperer ses informations
    // Faudrait donc effectuer une requete qui varecharger les informations de cette page
    // lorsque l'on va reactualiser
    constructor(private dropDownService: DropdownService){}
    resolve(
        route: ActivatedRouteSnapshot, 
        state: RouterStateSnapshot
    ):Observable<any>
    {
        // Nous ne faisons pas une requete pour un parametre d'id parce le listing generale est aussi present
        // sur la meme page
        return this.dropDownService.fetchData();
    }
}