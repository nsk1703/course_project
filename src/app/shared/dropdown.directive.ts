import { 
    Directive, 
    ElementRef, 
    HostBinding, 
    HostListener 
} from "@angular/core";

@Directive({
    selector: '[appDropdown]'
})
export class DropdownDirectives{

    // Ici nous voulons ouvrir une liste déroulante lors du clic sur son bouton
    @HostBinding('class.open') open = false;

    // ngOnInit(){
    //     this.open = false
    // }
    // // @HostListener('click') onClick(ev: Event){
    //     this.open = !this.open;
    // }
    // Autre methode
    // @HostListener('document:click', ['$event']) toggleOpen(event: Event){
    //     this.open = this.eltRef.nativeElement.contains(event.target) ? !this.open : false
    // }

    @HostListener('click') toggleOpen(){
        this.open = !this.open;
    }

    constructor(private eltRef: ElementRef){}
}