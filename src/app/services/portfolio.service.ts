import { Injectable } from '@angular/core';
import { HttpClient,HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { Portfolio } from './../model/portfolio.model';

@Injectable({
  providedIn: 'root',
})
export class PortfolioService{
  private portfolioUrl = 'http://localhost:8000/portfolio';
   private userName= '';

constructor(private http: HttpClient, private authService: AuthService) {}

   getPortfolio(userName: string): Observable<any> {
     return this.http.get(`${this.portfolioUrl}?userName=${userName}`);
   }

    addStock(userName: string ,ticker: string, quantity: number): Observable<any> {
      //const userName = this.authService.getUserName();
      return this.http.post(`${this.portfolioUrl}/add?userName=${userName}`, { userName,ticker, quantity });
    }

  removeStock(userName: string ,ticker: string, quantity: number): Observable<any> {
    return this.http.post(`${this.portfolioUrl}/remove`, { userName,ticker,quantity });
  }

  getTotalValue(userName: string): Observable<any> {
    return this.http.get(`${this.portfolioUrl}/value?userName=${userName}`);
  }

 calculateTotalValue(userName: string): Observable<number> {
    const params = new HttpParams().set('userName', userName);
    return this.http.get<number>(`${this.portfolioUrl}/value`, { params });
  }

}
