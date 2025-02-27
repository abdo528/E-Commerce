import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  constructor(private _HttpClient: HttpClient) { }
  addAddress(data: object): Observable<any> {
    return this._HttpClient.post(`${environment.baseUrl}/api/v1/addresses`, data)
  }
  removeAddress(id: string): Observable<any> {
    return this._HttpClient.delete(`${environment.baseUrl}/api/v1/addresses/${id}`)
  }
  getSpecificAddress(id: string): Observable<any> {
    return this._HttpClient.get(`${environment.baseUrl}/api/v1/addresses/${id}`)
  }
  getLoogedAddress(): Observable<any> {
    return this._HttpClient.get(`${environment.baseUrl}/api/v1/addresses`)
  }
}
