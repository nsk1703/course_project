import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { AddRecipesComponent } from "./add-recipes/add-recipes.component";
import { RecipeDetailComponent } from "./recipe-detail/recipe-detail.component";
import { RecipeItemComponent } from "./recipe-item/recipe-item.component";
import { RecipeListComponent } from "./recipe-list/recipe-list.component";
import { RecipesRoutingModule } from "./recipes-routing.module";
import { RecipesStartComponent } from "./recipes-start/recipes-start.component";
import { RecipesComponent } from "./recipes.component";
import { SharedLibsModule } from "../shared/shared-libs.module";
import { RecipeResolver } from "../resolvers/recipe-resolver";

@NgModule({
    declarations: [
        RecipesComponent,
        RecipeListComponent,
        RecipeDetailComponent,
        RecipeItemComponent,
        AddRecipesComponent,
        RecipesStartComponent,
    ],
    imports: [
        SharedLibsModule,
        RecipesRoutingModule
    ], 
    providers:[
        RecipeResolver,
    ]
})
export class RecipesModule {}