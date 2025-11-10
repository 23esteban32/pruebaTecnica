// src/app/services/dashboard.service.ts
import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private http = inject(HttpClient);
  private baseUrl = 'http://localhost:3000/api';


  getKPIs(token:string): Observable<any> {
     const headers = new HttpHeaders({
            'Authorization' : `Bearer ${token}`
        });
    return this.http.get(`${this.baseUrl}/dashboard/kpis`,{headers});
  }

  getKPIsFiltered(token:string,from: string, to: string): Observable<any> {
    const headers = new HttpHeaders({
            'Authorization' : `Bearer ${token}`
        });
    return this.http.get(`${this.baseUrl}/dashboard/kpis-filtered?from=${from}&to=${to}`,{headers});
  }

  getSalesByDay(token:string): Observable<any> {
    const headers = new HttpHeaders({
            'Authorization' : `Bearer ${token}`
        });
    return this.http.get(`${this.baseUrl}/dashboard/sales-by-day`,{headers});
  }

  getTopProducts(token:string): Observable<any> {
    const headers = new HttpHeaders({
            'Authorization' : `Bearer ${token}`
        });
    return this.http.get(`${this.baseUrl}/dashboard/top-products`,{headers});
  }

  getPaymentMethods(token:string): Observable<any> {
    const headers = new HttpHeaders({
            'Authorization' : `Bearer ${token}`
        });
    return this.http.get(`${this.baseUrl}/dashboard/payment-methods`,{headers});
  }
}
