import { Directive, ViewContainerRef } from "@angular/core";

@Directive({
    selector: '[appPlaceholder]'
})
export class PlaceholderDirective {

    // ViewContainerRef nous permet d'avoir des informations sur l'endroit où
    // elle sera appelé dans le template et d'y ajouter un composant programmé

    constructor(public viewContainerRef: ViewContainerRef){}
}