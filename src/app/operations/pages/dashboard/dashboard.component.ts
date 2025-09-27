import { Component } from '@angular/core';
import { BestSellingWidget } from '@operations/components/bestsellingwidget';
import { NotificationsWidget } from '@operations/components/notificationswidget';
import { RecentSalesWidget } from '@operations/components/recentsaleswidget';
import { RevenueStreamWidget } from '@operations/components/revenuestreamwidget';
import { StatsWidget } from '@operations/components/statswidget';

@Component({
  selector: 'app-dashboard',
  standalone:true,
  imports: [StatsWidget, RecentSalesWidget, BestSellingWidget, RevenueStreamWidget, NotificationsWidget],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

}
