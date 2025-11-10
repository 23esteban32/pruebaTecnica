import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { NgChartsModule } from 'ng2-charts';
import { ChartType, ChartOptions } from 'chart.js';
import { DashboardService } from '../services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MatCardModule, NgChartsModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  totalVentas = 0;
  totalOrdenes = 0;
  ticketPromedio = 0;
  topProductos: any[] = [];

  salesChartData: any = { labels: [], datasets: [] };
  salesChartOptions: ChartOptions = { responsive: true };
  salesChartType: ChartType = 'line';

  topProductsChartData: any = { labels: [], datasets: [] };
  topProductsChartOptions: ChartOptions = { responsive: true };
  topProductsChartType: ChartType = 'bar';

  paymentMethodsChartData: any = { labels: [], datasets: [] };
  paymentMethodsChartOptions: ChartOptions = { responsive: true };
  paymentMethodsChartType: ChartType = 'doughnut';

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.loadKPIs();
    this.loadCharts();
  }

  loadKPIs() {
    var token = localStorage.getItem('token');
    if (token){

    }else{
      token = ""
    }
    this.dashboardService.getKPIs(token).subscribe({
      //pruebas
      
      next: (res) => {
        console.log(res.data);
        this.totalVentas = res.data.totalVentas;
        this.totalOrdenes = res.data.totalOrdenes;
        this.ticketPromedio = res.data.ticketPromedio;
        this.topProductos = res.data.topProductos;
      },
      error: (err) => console.error('Error cargando KPIs', err)
    });
  }

  loadCharts() {
    var token = localStorage.getItem('token');
    if (token){
      
    }else{
      token = ""
    }
    this.dashboardService.getSalesByDay(token).subscribe({
      next: (res) => {
        this.salesChartData = {
          labels: res.data.map((r: any) => r.fecha),
          datasets: [{ data: res.data.map((r: any) => r.total), label: 'Ventas' }]
        };
      }
    });

    this.dashboardService.getTopProducts(token).subscribe({
      next: (res) => {
        this.topProductsChartData = {
          labels: res.data.map((r: any) => r.name),
          datasets: [{ data: res.data.map((r: any) => r.total_vendido), label: 'Unidades vendidas' }]
        };
      }
    });

    this.dashboardService.getPaymentMethods(token).subscribe({
      next: (res) => {
        this.paymentMethodsChartData = {
          labels: res.data.map((r: any) => r.payment_method),
          datasets: [{ data: res.data.map((r: any) => r.cantidad), label: 'Pagos' }]
        };
      }
    });
  }

}
