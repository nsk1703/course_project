import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { AuthService } from "../auth/auth.service";
import { DropdownService } from "../shared/dropdown.service";

@Component({
    selector: 'app-header',
    templateUrl: 'header.component.html'
})

export class HeaderComponent implements OnInit, OnDestroy{

    isAuthenticated = false;
    private subsc: Subscription;
    constructor(
        private dropDown: DropdownService,
        private authService: AuthService
        ){}

    ngOnInit(): void {
        this.subsc = this.authService.account.subscribe(
            account => {
                // !!account => !account ? false : true
                this.isAuthenticated = !!account;
                console.log(!account);
                console.log(!!account);
                
                
            }
        );
    }

    onSaveData(){
        this.dropDown.saveData()
    }

    onFetchData(){
        this.dropDown.fetchData().subscribe();
    }

    onLogout(){
        this.authService.signOut();
    }

    ngOnDestroy(): void {
        this.subsc.unsubscribe();
    }

}