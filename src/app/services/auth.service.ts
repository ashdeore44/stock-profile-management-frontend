import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8000/auth';
  private userName: string | null = null;
  private portfolioUrl = 'http://localhost:8000/portfolio';
 private loginUrl = 'http://localhost:8000/auth/login';

  constructor(private http: HttpClient, private router: Router) {}

  register(userName: string, password: string, email:String): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, { userName, password, email });
  }

  login(userName: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { userName, password });
  }

  getPortfolio(userName: string): Observable<any> {
    return this.http.get(`${this.portfolioUrl}/${userName}`);
  }


}
