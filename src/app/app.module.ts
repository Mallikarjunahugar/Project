import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductService } from './services/product.service';
import { ProductCategoryMenuComponent } from './components/product-category-menu/product-category-menu.component';
import { SearchComponent } from './components/search/search.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CartStatusComponent } from './components/cart-status/cart-status.component';
import { CartDetailsComponent } from './components/cart-details/cart-details.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { LoginStatusComponent } from './components/login-status/login-status.component';
import{OktaAuthGuard, OktaAuthModule,
OktaCallbackComponent,OKTA_CONFIG } from '@okta/okta-angular';
import{OktaAuth, toRelativeUrl } from '@okta/okta-auth-js';
import myAppConfig from './config/my-app-config';
import{OAuthModule} from 'angular-oauth2-oidc';
import { OrderHistoryComponent } from './components/order-history/order-history.component';
import { Router } from '@okta/okta-signin-widget/types/packages/@okta/courage-dist/types';
import { AuthInterceptorService } from './services/auth-interceptor.service';

//const oktaConfig = myAppConfig.oidc;
//const oktaAuth = new OktaAuth(oktaConfig);
const oktaConfig = Object.assign({
  onAuthRequired:(_oktaAuth:any,injector:Injector) =>{
    const router = injector.get(Router);
    router.navigate(['/login']);
  }
},myAppConfig.oidc)


/*function sendToLoginPage(_oktaAuth:OktaAuth,injector:Injector){
  const router = injector.get(Router);
  router.navigate(['/login']);
}*/

const routes: Routes = [ 
  {path: 'order-history', component:OrderHistoryComponent,
canActivate:[OktaAuthGuard]},
  {path: 'login/callback', component:OktaCallbackComponent},
  {path:'login', component:LoginComponent}, 
  {path: 'checkout',component:CheckoutComponent},
  {path: 'cart-details',component:CartDetailsComponent},
  {path: 'products/:id',component:ProductDetailsComponent},
  {path: 'search/:keyword', component: ProductListComponent},
  {path: 'category/:id', component: ProductListComponent},
  {path: 'category', component: ProductListComponent},
  {path: 'products', component: ProductListComponent},
  {path: '', redirectTo: '/products', pathMatch: 'full'},
  {path: '**', redirectTo: '/products', pathMatch: 'full'}
];

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ProductCategoryMenuComponent,
    SearchComponent,
    ProductDetailsComponent,
    CartStatusComponent,
    CartDetailsComponent,
    CheckoutComponent,
    LoginComponent,
    LoginStatusComponent,
    OrderHistoryComponent
    ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    HttpClientModule,
    NgbModule,
    ReactiveFormsModule,
    OktaAuthModule,
    OAuthModule.forRoot()
  ],
  providers: [ProductService, {provide: OKTA_CONFIG, useValue:{OktaAuth}},
  {provide: HTTP_INTERCEPTORS, useClass:AuthInterceptorService, multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
