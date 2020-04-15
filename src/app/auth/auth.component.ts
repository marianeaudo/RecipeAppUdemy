import { Component, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription, Observable } from 'rxjs';
import { AuthService, AuthResponseData } from './auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html'
})
export class AuthComponent implements OnDestroy{
    isLoginMode = true;
    authSubscription: Subscription;
    isLoading = false;
    error: string = null;

    constructor(private authService: AuthService, private router: Router) {

    }

    onSwitchMode() {
        this.isLoginMode = !this.isLoginMode;
    }

    onSubmit(form: NgForm) {
        if (!form.valid) {
            return;
        }
            const email = form.value.email;
            const password = form.value.password;

            let authObs: Observable<AuthResponseData>;
            
            this.isLoading = true;

            if(this.isLoginMode) {
                authObs = this.authService.login(email, password);
            } else {
                authObs = this.authService.signup(email, password);
            }

            this.authSubscription = authObs.subscribe((resData) => {
                this.isLoading = false;
                this.router.navigate(['/recipes']);
            }, (errorMessage) => {
                this.error = errorMessage;
                this.isLoading = false;
            });

            form.reset();
    }

    onHandleError() {
        this.error = null;
    }

    ngOnDestroy() {
        if (this.authSubscription != null)
        this.authSubscription.unsubscribe();
    }

}