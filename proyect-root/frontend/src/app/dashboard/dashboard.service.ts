import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private apiUrl = 'http://localhost:3000/api/v1'; // Ajusta si tu backend corre en otro puerto

  constructor(private http: HttpClient) {}

  // KPIs generales
  getKPIs(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/dashboard/kpis`);
  }

  // Ventas por día / serie temporal
  getSalesByDay(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/dashboard/sales-by-day`);
  }

  // Top productos
  getTopProducts(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/dashboard/top-products`);
  }

  // Métodos de pago (dona)
  getPaymentMethods(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/dashboard/payment-methods`);
  }
}
