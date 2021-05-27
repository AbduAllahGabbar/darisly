import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class CodeService {
  apiUrl = environment.apiUrl;
  link = 'api/code';

  constructor(private http: HttpClient) {}

  getAllCodes(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${this.link}`);
  }
  getAllCodesWithoutPagination(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${this.link}?pageSize=20`);
  }
  getCodeById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${this.link}/${id}`);
  }
  deleteCode(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${this.link}/${id}`);
  }
  updateCode(code): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${this.link}/${code._id}`, code);
  }
  createCode(code): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${this.link}/`, code);
  }
}
