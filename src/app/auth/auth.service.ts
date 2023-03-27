import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { IAuth } from './auth-interface';
import { BehaviorSubject, Observable, pipe, Subject, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { Router } from '@angular/router';
import { Account } from "./account.model";

@Injectable({providedIn: 'root'})
export class AuthService {

    // BehaviorSubject est comme Subjecct, mais nous permet aussi de recuperer les données pas seulement
    // a la fin dans la subscribe
    account = new BehaviorSubject<Account>(null);
    private tokenExpirationTimer: any;
    
    constructor(private http: HttpClient,
                private router: Router
    ){}

    signUp(email: string, password:string): Observable<IAuth>{

        return  this.http.post<IAuth>(
                    'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBE9FdHiaO2PqwDf-DSzR5t2idbuV4rgbg',
                    {
                        email: email,
                        password: password,
                        returnSecureToken: true
                    }
                ).pipe(
                        catchError(errorRes => this.handleError(errorRes)),
                        // Ici l'on permet a l'utilisateur de se connecter directement
                        tap(resData => {
                            this.handleAuthentication(
                                    resData.localId, 
                                    resData.email, 
                                    resData.idToken, 
                                    +resData.expiresIn
                                )
                        })
                        
                    )
                
    }

    
    signIn(email: string, password: string): Observable<IAuth>{
        console.log(email, password);
        
        return this.http.post<IAuth>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBE9FdHiaO2PqwDf-DSzR5t2idbuV4rgbg',
            {
                email: email,
                password: password,
                returnSecureToken: true
            }
        ).pipe(
            catchError(errorRes => this.handleError(errorRes)),
            tap(resData => {
                this.handleAuthentication(
                    resData.localId, 
                    resData.email, 
                    resData.idToken, 
                    +resData.expiresIn
                )
            })
        )
    }

    autoLogin(){
        const userData: {
            email: string,
            id: string,
            _token: string,
            _tokenExpirationDate: string
        } = JSON.parse(localStorage.getItem('userData'));

        console.log('userData',userData);
        if(!userData){
            return;
        }

        const currentUser = new Account(
            userData.id,
            userData.email,
            userData._token,
            new Date(userData._tokenExpirationDate)
        )
        console.log('currentUser', currentUser);
        
        if(currentUser.token){
            this.account.next(currentUser);
            
            const expirationDate = 
            new Date(userData._tokenExpirationDate).getTime() - 
            new Date().getTime();
            console.log('expirationDate', expirationDate,
                        'new Date(userData._tokenExpirationDate).getTime()', new Date(userData._tokenExpirationDate).getTime());
            
            this.autoLogout(expirationDate);
        }
            
    }

    signOut(){
        this.account.next(null);
        this.router.navigate(['/auth']);
        if(this.tokenExpirationTimer){
            clearTimeout(this.tokenExpirationTimer)
        }
        this.tokenExpirationTimer = null;
     }

    autoLogout(expirationDuration: number){
        this.tokenExpirationTimer = setTimeout(() => {
            this.signOut()
        }, expirationDuration)
    }


    private handleAuthentication(
            userId: string, 
            email: string, 
            token: string, 
            expiresIn: number
        ){
        // On definit la date d'expiration en millisecondes
        // On recupere la date du jour en milliseconde , on y ajoute le temps d'expiration fois 1000        
        const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
        console.log('new Date().getTime()',new Date().getTime(), 
                    'expiresIn', expiresIn,
                    'new Date()', new Date(), 
                    'expirationDate', expirationDate);
        
        const account = new Account(
            userId, 
            email,
            token, 
            expirationDate
        );
        console.log('authAccount', account);
        
        localStorage.setItem('userData', JSON.stringify(account))
        // On passe les informations au Subject qui va distribuer a d'autres Composants
        this.account.next(account)
        
        this.autoLogout(expiresIn * 1000);
    }

    private handleError(errorRes: HttpErrorResponse){
        let errorMessage = 'An error occured';
        console.log(errorRes);
        
        if(!errorRes.error || !errorRes.error.error){
            return throwError(errorMessage);
        }

        switch(errorRes.error.error.message){
            case 'EMAIL_NOT_FOUND': 
                errorMessage = 'This email does not found';
                break;
            case 'EMAIL_EXISTS':
                errorMessage = 'This email exists';
                break;
            case 'INVALID_PASSWORD':
                errorMessage = 'This email exists';
                break;
        }
        return throwError(errorMessage);
    }
}