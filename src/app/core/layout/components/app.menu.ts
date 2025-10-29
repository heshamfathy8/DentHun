import { Component, effect, inject, signal, WritableSignal } from '@angular/core';
import { CommonModule, NgSwitch } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AppMenuitem } from './app.menuitem';
import { AuthService } from 'app/core/services/auth.service';
import { DoctorService } from '@operations/services/doctor.service';

@Component({
    selector: 'app-menu',
    standalone: true,
    imports: [CommonModule, AppMenuitem, RouterModule],
    template: `<ul class="layout-menu">
        <ng-container *ngFor="let item of model; let i = index">
            <li app-menuitem *ngIf="!item.separator" [item]="item" [index]="i" [root]="true"></li>
            <li *ngIf="item.separator" class="menu-separator"></li>
        </ng-container>
    </ul> `
})
export class AppMenu {
    model = []
    authService = inject(AuthService)
    doctorService = inject(DoctorService)
    role =this.authService.userRole
    cardNum = this.doctorService.$cartNum

  updateMenuBadge = effect(() => {
    const myCart = this.model[0]?.items?.find(i => i.label === 'My Cart');
    if (myCart) {
      myCart.badge.value = this.cardNum();
    }
  });

    ngOnInit() {
        switch (this.role) {
            case "supplier":
                     this.model = [
                            {
                            label: 'Pages',
                            items: [
                                { label: 'Dashboard', icon: 'pi pi-fw pi-objects-column', routerLink: ['/operations/dashboard'] },
                                // { label: 'home', icon: 'pi pi-fw pi-table', routerLink: ['/operations/home'] },
                                // { label: 'Products', icon: 'pi pi-fw pi-shopping-bag', routerLink: ['/uikit/list'] },
                                { label: 'Doctors', icon: 'pi pi-fw pi-users', routerLink: ['/operations/doctors'] },
                                // { label: 'Current Payments', icon: 'pi pi-fw pi-dollar', routerLink: ['/operations/current-payments'],badge:{severity:"primary",value:"3"}},
                                { label: 'Payments', icon: 'pi pi-fw pi-wallet', routerLink: ['/operations/payments'] },
                                { label: 'Current Orders', icon: 'pi pi-fw pi-send', routerLink: ['/operations/current-orders'],badge:{severity:"primary",value:"3"} },
                                { label: 'Orders', icon: 'pi pi-fw pi-list', routerLink: ['/operations/orders'] },
                                { label: 'Store', icon: 'pi pi-fw pi-shop', routerLink: ['/operations/store']},
                                { label: 'Packages', icon: 'pi pi-shopping-bag', routerLink: ['/operations/packages'] },
                                { label: 'Receipts', icon: 'pi pi-fw pi-receipt', routerLink: ['/operations/receipts']},
                                { label: 'refound-orders', icon: 'pi pi-fw pi-sync', routerLink: ['/operations/refound-orders']},
                                // { label: 'Reports', icon: 'pi pi-fw pi-chart-bar', routerLink: ['/operations/reports']},
                                ]
                            },
                        ];
                break;
            case "doctor":
                     this.model = [
                            {
                            label: 'Pages',
                            items: [
                                { label: 'Dashboard', icon: 'pi pi-fw pi-objects-column', routerLink: ['/operations/dashboard'] },
                                { label: 'Queue', icon: 'pi pi-fw pi-arrow-right-arrow-left', routerLink: ['/operations/queue'] },
                                { label: 'Clients', icon: 'pi pi-fw pi-users', routerLink: ['/operations/clients'] },
                                { label: 'Suppliers', icon: 'pi pi-fw pi-users', routerLink: ['/operations/doctors'] },
                                { label: 'Current Payments', icon: 'pi pi-fw pi-dollar', routerLink: ['/operations/current-payments'],badge:{severity:"primary",value:"3"}},
                                { label: 'Payments', icon: 'pi pi-fw pi-wallet', routerLink: ['/operations/payments'] },
                                { label: 'Current Orders', icon: 'pi pi-fw pi-send', routerLink: ['/operations/current-orders'],badge:{severity:"primary",value:"3"} },
                                { label: 'Orders', icon: 'pi pi-fw pi-list', routerLink: ['/operations/orders'] },
                                { label: 'Shopping', icon: 'pi pi-cart-arrow-down', routerLink: ['/operations/shopping'] },
                                { label: 'My Cart', icon: 'pi pi-shopping-cart', routerLink: ['/operations/my-cart'],badge:{severity:"primary",value: this.cardNum()} },
                                { label: 'Packages', icon: 'pi pi-shopping-bag', routerLink: ['/operations/packages'] },
                                { label: 'Store', icon: 'pi pi-fw pi-shop', routerLink: ['/operations/store']},
                                { label: 'Receipts', icon: 'pi pi-fw pi-receipt', routerLink: ['/operations/receipts']},
                                // { label: 'Reports', icon: 'pi pi-fw pi-chart-bar', routerLink: ['/operations/reports']},
                                ]
                            },
                        ];
                break;
        
            default:
                break;
        }

    
    }
}

