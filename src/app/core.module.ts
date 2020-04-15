import { NgModule } from '@angular/core';
import { ShoppinglistService } from './services/shoppinglist.service';
import { RecipebookService } from './services/recipebook.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptorService } from './auth/auth-interceptor.service';

@NgModule({
    providers: [
        ShoppinglistService, RecipebookService, {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true}
    ]
})
export class CoreModule {

}