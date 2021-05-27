import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EducationSystemService {
  apiUrl = environment.apiUrl;
  link = 'api/educationSystem';

  constructor(private http: HttpClient) {}

  getAllEducationSystems(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${this.link}`);
  }
  getEducationSystemById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${this.link}/${id}`);
  }
  deleteEducationSystem(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${this.link}/${id}`);
  }
  updateEducationSystem(educationSystem): Observable<any> {
    return this.http.put<any>(
      `${this.apiUrl}/${this.link}/${educationSystem._id}`,
      educationSystem
    );
  }
  createEducationSystem(educationSystem): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${this.link}/`, educationSystem);
  }
}
