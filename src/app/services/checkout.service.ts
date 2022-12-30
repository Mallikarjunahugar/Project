import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environment';
import { PaymentInfo } from '../common/payment-info';
import { Purchase } from '../common/purchase';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  private purchaseUrl= environment.luv2shopApiUrl + '/checkout/purchase';
  private paymentUrl= environment.luv2shopApiUrl + '/api/checkout/payment-intent';

  constructor(private httpClient:HttpClient) { }

  placeOrder(purchase:Purchase):Observable<any>{
    return this.httpClient.post<Purchase>(this.purchaseUrl,purchase);
  }
  createPaymentIntent(PaymentInfo: PaymentInfo): Observable<any>{
    return this.httpClient.post<PaymentInfo>(this.paymentUrl,PaymentInfo);
  }
  
}
