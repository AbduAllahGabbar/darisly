import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  apiUrl = environment.apiUrl;
  link = 'api/course';

  constructor(private http: HttpClient) {}

  getAllCourses(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${this.link}`);
  }
  getAllCoursesWithoutPagination(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${this.link}?pageSize=100`);
  }
  getAllDeletedCourses(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${this.link}/deletedCourses`);
  }
  getCourseById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${this.link}/${id}`);
  }
  deleteCourse(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${this.link}/${id}`);
  }
  updateCourse(course): Observable<any> {
    return this.http.put<any>(
      `${this.apiUrl}/${this.link}/${course._id}`,
      course
    );
  }
  createCourse(course): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${this.link}/`, course);
  }
  searchCourse(course): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${this.link}/search`, course);
  }
}
