import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  constructor(private _HttpClient: HttpClient) { }
  checkoutSession(id: string, data: object): Observable<any> {
    return this._HttpClient.post(`${environment.baseUrl}/api/v1/orders/checkout-session/${id}?url=http://localhost:4200`, {
      "shippingAddress": data
    })
  }
  cashOrder(id: string, data: object): Observable<any> {
    return this._HttpClient.post(`${environment.baseUrl}/api/v1/orders/${id}`, {
      "shippingAddress": data
    })
  }
  getAllOrders(): Observable<any> {
    return this._HttpClient.get(`${environment.baseUrl}/api/v1/orders`)
  }
  getUserOrders(id: string): Observable<any> {
    return this._HttpClient.get(`${environment.baseUrl}/api/v1/orders/user/${id}`)
  }
}
