import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AuthInterceptorService } from '../auth/auth-interceptor.service';

@NgModule({
    providers: [
        { 
          provide: HTTP_INTERCEPTORS,
          useClass: AuthInterceptorService,
          multi: true
        }
    ],
})
export class CoreModule{}
// Le CoreModule est celui de tous les services(mais il est conseillé de les mettre en providedIn),
// aussi pour tout autre module externe ou dépendances (ngx, interceptors), car le but est 
// de rendre AppComponent bien léger et lisible