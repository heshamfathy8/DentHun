import { Routes } from '@angular/router';
import { LayoutPageComponent } from '../app/core/layout/pages/layout-page/layout-page.component';
import { AuthGuard } from './core/guards/auth.guard';
import { AppLayout } from './core/layout/components/app.layout';

export const routes: Routes = [
    
     { path: '', redirectTo: 'operations', pathMatch: 'full' },
      {
        path: 'login',
        loadComponent: () =>
          import('@login/components/login/login.component').then((m) => m.LoginComponent),
        data: { breadcrumb: 'login' },
      },
      {
        path: 'register',
        loadComponent: () =>
          import('@login/components/register/register.component').then((m) => m.RegisterComponent),
        data: { breadcrumb: 'login' },
      },
      {
        path: 'forget-password',
        loadComponent: () =>
          import('@login/components/forget-password/forget-password.component').then((m) => m.ForgetPasswordComponent),
        data: { breadcrumb: 'login' },
      },
      {
        path: 'operations',
        // canActivateChild: [AuthGuard()],
        component: AppLayout,
        children: [
          { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
          {
            path: 'home',
            loadComponent: () =>
              import(
                '@operations/pages/home/home.component'
              ).then((m) => m.HomeComponent),
           
          },
          {
            path: 'dashboard',
            loadComponent: () =>
              import(
                '@operations/pages/dashboard/dashboard.component'
              ).then((m) => m.DashboardComponent),
           
          },
          {
            path: 'notifications',
            loadComponent: () =>
              import(
                '@operations/components/notificationswidget'
              ).then((m) => m.NotificationsWidget),
           
          },
          {
            path: 'store',
            loadComponent: () =>
              import(
                '@operations/pages/store/store.component'
              ).then((m) => m.StoreComponent),
           
          },
          {
            path: 'doctors',
            loadComponent: () =>
              import(
                '@operations/pages/doctors/doctors.component'
              ).then((m) => m.DoctorsComponent),
           
          },
          {
            path: 'current-payments',
            loadComponent: () =>
              import(
                '@operations/pages/current-payments/current-payments.component'
              ).then((m) => m.CurrentPaymentsComponent),
           
          },
          {
            path: 'current-orders',
            loadComponent: () =>
              import(
                '@operations/pages/current-orders/current-orders.component'
              ).then((m) => m.CurrentOrdersComponent),
           
          },
          {
            path: 'orders',
            loadComponent: () =>
              import(
                '@operations/pages/orders/orders.component'
              ).then((m) => m.OrdersComponent),
           
          },
          {
            path: 'payments',
            loadComponent: () =>
              import(
                '@operations/pages/payments/payments.component'
              ).then((m) => m.PaymentsComponent),
           
          },
          {
            path: 'receipts',
            loadComponent: () =>
              import(
                '@operations/pages/receipts/receipts.component'
              ).then((m) => m.ReceiptsComponent),
           
          },
          {
            path: 'reports',
            loadComponent: () =>
              import(
                '@operations/pages/reports/reports.component'
              ).then((m) => m.ReportsComponent),
           
          },
          {
            path: 'doctor-details/:id',
            loadComponent: () =>
              import(
                '@operations/pages/doctor-details/doctor-details.component'
              ).then((m) => m.DoctorDetailsComponent),
          },
          {
            path: 'suppliers',
            loadComponent: () =>
              import(
                '@operations/pages/suppliers/suppliers.component'
              ).then((m) => m.SuppliersComponent),
          },
          {
            path: 'shopping',
            loadComponent: () =>
              import(
                '@operations/pages/shopping/shopping.component'
              ).then((m) => m.ShoppingComponent),
          },
          {
            path: 'packages',
            loadComponent: () =>
              import(
                '@operations/pages/packages/packages.component'
              ).then((m) => m.PackagesComponent),
          },
          {
            path: 'products-details/:id',
            loadComponent: () =>
              import(
                '@operations/pages/product-details/product-details.component'
              ).then((m) => m.ProductDetailsComponent),
          },
          {
            path: 'favorites',
            loadComponent: () =>
              import(
                '@operations/pages/favorites/favorites.component'
              ).then((m) => m.FavoritesComponent),
          },
          {
            path: 'queue',
            loadComponent: () =>
              import(
                '@operations/pages/queue/queue.component'
              ).then((m) => m.QueueComponent),
          },
          {
            path: 'clients',
            loadComponent: () =>
              import(
                '@operations/pages/clients/clients.component'
              ).then((m) => m.ClientsComponent),
          },
          {
            path: 'client-details/:id',
            loadComponent: () =>
              import(
                '@operations/pages/client-details/client-details.component'
              ).then((m) => m.ClientDetailsComponent),
          },
          {
            path: 'profile',
            loadComponent: () =>
              import(
                '@operations/pages/profile/profile.component'
              ).then((m) => m.ProfileComponent),
          },
          {
            path: 'my-cart',
            loadComponent: () =>
              import(
                '@operations/pages/my-cart/my-cart.component'
              ).then((m) => m.MyCartComponent),
          },
          {
            path: 'create-package',
            loadComponent: () =>
              import(
                '@operations/pages/create-package/create-package.component'
              ).then((m) => m.CreatePackageComponent),
          },
       
        ],
      },
  { path: '**', redirectTo: 'user/profile' }
];
