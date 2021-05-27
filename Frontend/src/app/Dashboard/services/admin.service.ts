import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DashboardAdminService {
  apiUrl = environment.apiUrl;
  link = 'api/admin';

  constructor(private http: HttpClient) {}

  getAllAdmins(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${this.link}`);
  }
  getAdminById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${this.link}/${id}`);
  }
  deleteAdmin(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${this.link}/${id}`);
  }
  updateAdmin(admin): Observable<any> {
    return this.http.put<any>(
      `${this.apiUrl}/${this.link}/${admin._id}`,
      admin
    );
  }
  createAdmin(admin): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${this.link}/`, admin);
  }
}
