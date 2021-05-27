import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PackageService {
  apiUrl = environment.apiUrl;
  link = 'api/package';

  constructor(private http: HttpClient) {}

  getAllPackages(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${this.link}`);
  }
  getAllPackagesWithoutPagination(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${this.link}?pageSize=20`);
  }
  getPackageById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${this.link}/${id}`);
  }
  deletePackage(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${this.link}/${id}`);
  }
  updatePackage(data): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${this.link}/${data._id}`, data);
  }
  createPackage(data): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${this.link}/`, data);
  }
}
