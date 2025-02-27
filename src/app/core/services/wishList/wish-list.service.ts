import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class WishListService {
  constructor(private _HttpClient: HttpClient) { }
  addProductToWishList(id: string): Observable<any> {
    return this._HttpClient.post(`${environment.baseUrl}/api/v1/wishlist`, {
      "productId": id
    })
  }
  removeProductFromWishList(id: string): Observable<any> {
    return this._HttpClient.delete(`${environment.baseUrl}/api/v1/wishlist/${id}`,)
  }
  getLoggedUserToWishList(): Observable<any> {
    return this._HttpClient.get(`${environment.baseUrl}/api/v1/wishlist`,)
  }
}
