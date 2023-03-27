import { Injectable } from "@angular/core";
import { HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from "@angular/common/http";


import { AuthService } from "./auth.service";
import { exhaustMap, take } from "rxjs/operators";

@Injectable()

export class AuthInterceptorService implements HttpInterceptor {

    constructor(private authService: AuthService){}
    intercept(req: HttpRequest<any>, next: HttpHandler)
    {
        // Grace au BehaviorSubject account, on peut recuperer ses informations pas seulement a la fin dans le subscribe
        // et on peut faire ceci
        // le unsubscribe est automatique
        return this.authService.account.pipe(
            // Take(1) permet de recuperer un seul element du tableau, le dernier
            take(1),
            // exhaustMap nous permet d'appeler un Obsersable dans un observable, comme dans ce cas
            // Il recupere les données du premier Observable et retourne un nouveau observable qui utilisera ces données
            // et remplacera l'ancien
            exhaustMap(account => {
                if(!account){
                    return next.handle(req);
                }
                const modifierReq = req.clone(
                    {
                        // Donc ayant recuperer le dernier user connecté, on prends son token
                        // Que l'on passe en paramètre a toute requête
                        params: new HttpParams().set('auth', account.token)
                    }
                )
                return next.handle(modifierReq);
            })
        )
    }
}