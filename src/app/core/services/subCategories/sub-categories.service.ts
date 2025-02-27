import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class SubCategoriesService {

  constructor(private _HttpClient: HttpClient) { }

  getAllSubCategories(): Observable<any> {
    return this._HttpClient.get(`${environment.baseUrl}/api/v1/subcategories`)
  }
  getSpecificSubCategories(id: string): Observable<any> {
    return this._HttpClient.get(`${environment.baseUrl}/api/v1/subcategories/${id}`)
  }
  getAllSubCategoriesOnCategories(id: string): Observable<any> {
    return this._HttpClient.get(`${environment.baseUrl}/api/v1/categories/${id}/subcategories`)
  }
}
