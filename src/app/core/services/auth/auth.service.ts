import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';
import { jwtDecode } from 'jwt-decode'
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  decode: any = null
  constructor(private _HttpClient: HttpClient, private _Router: Router) { }

  sendRegister(data: object): Observable<any> {
    return this._HttpClient.post(`${environment.baseUrl}/api/v1/auth/signup`, data)
  }
  sendLogin(data: object): Observable<any> {
    return this._HttpClient.post(`${environment.baseUrl}/api/v1/auth/signin`, data)
  }
  saveTokenDecode(): void {
    if (localStorage.getItem('userToken') !== null) {
      this.decode = jwtDecode(localStorage.getItem('userToken')!)
    }
  }
  signOut(): void {
    localStorage.removeItem('userToken')
    this.decode = null
    this._Router.navigate(['/login'])
  }
  setEmailVerify(data: object): Observable<any> {
    return this._HttpClient.post(`${environment.baseUrl}/api/v1/auth/forgotPasswords`, data)
  }
  setCodeVerify(data: object): Observable<any> {
    return this._HttpClient.post(`${environment.baseUrl}/api/v1/auth/verifyResetCode`, data)
  }
  setResetPassword(data: object): Observable<any> {
    return this._HttpClient.put(`${environment.baseUrl}/api/v1/auth/resetPassword`, data)
  }
  updateLogedUserData(data: object): Observable<any> {
    return this._HttpClient.put(`${environment.baseUrl}/api/v1/users/updateMe/`, data)
  }
  updateLogedUserPassword(data: object): Observable<any> {
    return this._HttpClient.put(`${environment.baseUrl}/api/v1/users/changeMyPassword`, data)
  }
}
