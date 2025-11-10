import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardService } from '../dashboard.service';
import { MatCardModule } from '@angular/material/card';
import { NgChartsModule } from 'ng2-charts';
import { ChartOptions, ChartData, ChartType } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MatCardModule, NgChartsModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  // KPIs
  totalSales = 0;
  totalOrders = 0;
  averageTicket = 0;
  topProducts: any[] = [];

  // Gráficos
  salesByDayData: ChartData<'line'> = { labels: [], datasets: [] };
  topProductsData: ChartData<'bar'> = { labels: [], datasets: [] };
  paymentMethodsData: ChartData<'doughnut'> = { labels: [], datasets: [] };

  constructor(private dashboardService: DashboardService) {}

  ngOnInit() {
    this.loadKPIs();
    this.loadSalesByDay();
    this.loadTopProducts();
    this.loadPaymentMethods();
  }

  loadKPIs() {
    this.dashboardService.getKPIs().subscribe(res => {
      this.totalSales = res.totalSales;
      this.totalOrders = res.totalOrders;
      this.averageTicket = res.averageTicket;
      this.topProducts = res.topProducts;
    });
  }

  loadSalesByDay() {
    this.dashboardService.getSalesByDay().subscribe(res => {
      this.salesByDayData = {
        labels: res.map((r: any) => r.date),
        datasets: [{ label: 'Ventas', data: res.map((r: any) => r.total), borderColor: 'blue', fill: false }]
      };
    });
  }

  loadTopProducts() {
    this.dashboardService.getTopProducts().subscribe(res => {
      this.topProductsData = {
        labels: res.map((r: any) => r.name),
        datasets: [{ label: 'Cantidad vendida', data: res.map((r: any) => r.quantity), backgroundColor: 'green' }]
      };
    });
  }

  loadPaymentMethods() {
    this.dashboardService.getPaymentMethods().subscribe(res => {
      this.paymentMethodsData = {
        labels: res.map((r: any) => r.method),
        datasets: [{ data: res.map((r: any) => r.total), backgroundColor: ['red','blue','green','orange'] }]
      };
    });
  }
}
