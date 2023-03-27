import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const appRoutes: Routes = [
    // pathMatch permet de nous rediriger ici si la route dans l'url est vide, donc ceci ferait 
    // que cette route soit par defaut

    // Nous avons le meme composant, pour ajouter et modifier une recette, car la vue sera la meme
    // Nous ne devons jamais passer une route simple apres une route possedant un parametre
    {path: "", redirectTo: "/recipes", pathMatch: 'full'},
    {
        path: 'auth',
        loadChildren: () =>
            import('./auth/auth-module').then((m) => m.AuthModule)
    },
    {
        path: 'recipes',
        loadChildren: () => 
            import('./recipes/recipes.module').then((m) => m.RecipesModule),
    },
    {
        path: 'shopping-list',
        loadChildren: () => 
            import('./shopping/shopping.module').then((m) => m.ShoppingModule)
    },

];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
 
}