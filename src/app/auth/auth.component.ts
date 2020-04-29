import { Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { AuthService, AuthResponseData } from './auth.service';
import * as fromApp from '../store/app.reducer';
import * as fromAuthActions from './store/auth.actions';
import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceholderDirective } from '../shared/placeholder/placeholder.directive';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html'
})
export class AuthComponent implements OnInit, OnDestroy{
    isLoginMode = true;
    authSubscription: Subscription;
    isLoading = false;
    error: string = null;
    @ViewChild(PlaceholderDirective, { static: false }) alertHost: PlaceholderDirective;
    private closeSub: Subscription;


    constructor(
      private authService: AuthService,
      private router: Router,
      private store: Store<fromApp.AppState>,
      private componentFactoryResolver: ComponentFactoryResolver,
      ) {

    }

    ngOnInit() {
      this.authSubscription = this.store.select('auth').subscribe((authState) => {
        this.isLoading = authState.loading;
        this.error = authState.authError;
        if (this.error) {
          this.showErrorAlert(this.error);
        }
      });
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
                this.store.dispatch(new fromAuthActions.LoginStart({
                  email: email,
                  password: password
                }));
            } else {
                authObs = this.authService.signup(email, password);
            }

            form.reset();
    }

    onHandleError() {
        this.error = null;
    }

    ngOnDestroy() {
        if (this.authSubscription != null)
        this.authSubscription.unsubscribe();
    }

    private showErrorAlert(message: string) {
      const alertCmpFactory = this.componentFactoryResolver.resolveComponentFactory(
        AlertComponent
      );
      const hostViewContainerRef = this.alertHost.viewContainerRef;
      hostViewContainerRef.clear();

      const componentRef = hostViewContainerRef.createComponent(alertCmpFactory);

      componentRef.instance.message = message;
      this.closeSub = componentRef.instance.close.subscribe(() => {
        this.closeSub.unsubscribe();
        hostViewContainerRef.clear();
      });
    }


}
