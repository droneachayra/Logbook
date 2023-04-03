import { HttpClient, HttpHandler } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly apiUrl = 'http://localhost:8080/auth/';

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

  gettrainer(){
    const url = `${this.apiUrl}getTrainer`;
    return this.http.get(url);
  }

  getdrone(){
    const url = `${this.apiUrl}getDrone`;
    return this.http.get(url);
  }

  SubmitLogbook(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}logbook`, data);
  }

}
