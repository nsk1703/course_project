import { HttpErrorResponse } from "@angular/common/http";
import { Component, ComponentFactoryResolver, OnDestroy, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { Observable, Subscription } from "rxjs";
import { AlertComponent } from "../shared/alert/alert.component";
import { PlaceholderDirective } from "../shared/placeholder/placeholder.directive";
import { IAuth } from "./auth-interface";
import { AuthService } from "./auth.service";

@Component({
    selector: 'app-auth',
    templateUrl: 'auth.component.html'
})
export class AuthComponent implements OnDestroy{
    
    isLoginMode = true;
    isLoading = false;
    error!: HttpErrorResponse;
    // AuthComponent est un viewChild de la directive, car il utilise la directive dans sa vue
    @ViewChild(PlaceholderDirective, {static: false}) alertHost: PlaceholderDirective
    private closeSub: Subscription
    constructor(private authService: AuthService,
                private router: Router,
                private componentFactoryResolver: ComponentFactoryResolver){}

    onSwitchMode(){
        this.isLoginMode = !this.isLoginMode;
    }

    onSubmitForm(form: NgForm){
        console.log(form);

        if(!form.valid){
            return;
        }

        let authObs: Observable<IAuth>;

        const email = form.value.email;
        const password = form.value.password;

        this.isLoading = true;

        if(this.isLoginMode){
            authObs =  this.authService.signIn(email, password)
        }else{
            authObs = this.authService.signUp(email, password)          
        }
        authObs.subscribe({
            next: resData => {
                console.log(resData);
                this.isLoading = false;
                this.router.navigate(['/recipes'])
            },
// Apres avoir changer l'erreur dans le pipe, on recupere l'erreur passe dans le throwError ici
            error: (errorMessage) => {
                console.log(errorMessage);
                this.error = errorMessage;
                this.showErrorAlert(errorMessage);
                this.isLoading = false;
            }
        })
        form.reset();
    }

    ngOnDestroy(): void {
        if(this.closeSub){
            this.closeSub.unsubscribe();
        }
    }

    private showErrorAlert(message: string){
        // On prepare un factory qui créera notre composant alert
        const alertCmpFactory = 
            this.componentFactoryResolver.resolveComponentFactory(
                AlertComponent
            )
        // apres avoir preparé notre viewContainer dans la directive et l'ayant appelé ici(alertHost)
        // on recupere la reference, on l'efface dans tous les composants qui pourront le contenir
        const hostViewContainer = this.alertHost.viewContainerRef;

        hostViewContainer.clear();
        const componentRef =  hostViewContainer.createComponent(alertCmpFactory);

        componentRef.instance.message = message;
        this.closeSub = componentRef.instance.close.subscribe(
            () => {
                this.closeSub.unsubscribe();
                hostViewContainer.clear();
            }
        )
        
    }
}