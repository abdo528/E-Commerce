import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartItemCount: BehaviorSubject<number> = new BehaviorSubject(0)
  constructor(private _HttpClient: HttpClient) { }
  addProductToCart(id: string): Observable<any> {
    return this._HttpClient.post(`${environment.baseUrl}/api/v1/cart`, {
      "productId": id
    })
  }
  getLogedToCart(): Observable<any> {
    return this._HttpClient.get(`${environment.baseUrl}/api/v1/cart`)
  }
  removeSpecificCart(id: string): Observable<any> {
    return this._HttpClient.delete(`${environment.baseUrl}/api/v1/cart/${id}`)
  }
  updateSpecificCart(id: string, newCount: number): Observable<any> {
    return this._HttpClient.put(`${environment.baseUrl}/api/v1/cart/${id}`, {
      count: newCount
    })
  }
  clearUserCart(): Observable<any> {
    return this._HttpClient.delete(`${environment.baseUrl}/api/v1/cart`)
  }
}
