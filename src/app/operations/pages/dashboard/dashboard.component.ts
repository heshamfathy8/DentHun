import { Component, inject } from '@angular/core';
import { BestSellingWidget } from '@operations/components/bestsellingwidget';
import { NotificationsWidget } from '@operations/components/notificationswidget';
import { RecentSalesWidget } from '@operations/components/recentsaleswidget';
import { RevenueStreamWidget } from '@operations/components/revenuestreamwidget';
import { StatsWidget } from '@operations/components/statswidget';
import { SupplierService } from '@operations/services/supplier.service';

@Component({
  selector: 'app-dashboard',
  standalone:true,
  imports: [StatsWidget, RecentSalesWidget, BestSellingWidget, RevenueStreamWidget, NotificationsWidget],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  private readonly supplierService = inject(SupplierService)
  data:any

  ngOnInit(){
    this.loadData();
  }

  loadData(){
    this.supplierService.getDashboard().subscribe((res:any) => {
      console.log(res['data']);
      
      this.data = res['data']
    });
}

}
