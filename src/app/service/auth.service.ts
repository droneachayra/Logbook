import { HttpClient, HttpHandler } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }
  reglogbook(data: any): Observable<any> {
    return this.http.post('http://localhost:8080/auth/register', data)
  }
  signup(data: any): Observable<any> {
    return this.http.post('http://localhost:8080/auth/register', data)
  }

  signin(data: any): Observable<any> {
    return this.http.post('http://localhost:8080/auth/login', data)
  }

}
