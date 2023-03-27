import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AddRecipesComponent } from "./add-recipes/add-recipes.component";
import { RecipeDetailComponent } from "./recipe-detail/recipe-detail.component";
import { RecipesStartComponent } from "./recipes-start/recipes-start.component";
import { RecipesComponent } from "./recipes.component";
import { AuthGuard } from "../auth/auth.guard";
import { RecipeResolver } from '../resolvers/recipe-resolver';

const recipesRoutes: Routes = [
    {
    
        path: "", 
        component: RecipesComponent, 
        canActivate:[AuthGuard],
        children: [
            {path: "", component: RecipesStartComponent},
            {path: "add", component: AddRecipesComponent},
            {
                path: ":id", 
                component: RecipeDetailComponent, 
                resolve: [RecipeResolver]},  
            {
                path: ":id/edit", 
                component: AddRecipesComponent, 
                resolve: [RecipeResolver]
            }
        ]
    
    }
]
@NgModule({
    imports: [RouterModule.forChild(recipesRoutes)],
    exports: [RouterModule]
})
export class RecipesRoutingModule {}