import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GradeService {
  apiUrl = environment.apiUrl;
  link = 'api/grade';

  constructor(private http: HttpClient) {}

  getAllGrades(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${this.link}`);
  }
  getAllGradesWithoutPagination(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${this.link}?pageSize=20`);
  }
  getGradeById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${this.link}/${id}`);
  }
  deleteGrade(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${this.link}/${id}`);
  }
  updateGrade(grade): Observable<any> {
    return this.http.put<any>(
      `${this.apiUrl}/${this.link}/${grade._id}`,
      grade
    );
  }
  createGrade(grade): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${this.link}/`, grade);
  }
}
