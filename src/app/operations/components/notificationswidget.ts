import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { HighlightNumbersPipe } from "../../shared/pipes/highlight-numbers-pipe.pipe";
import { SupplierService } from '@operations/services/supplier.service';

@Component({
    standalone: true,
    selector: 'app-notifications-widget',
    imports: [ButtonModule, MenuModule, CommonModule, HighlightNumbersPipe],
    template: `
    <div class="card">
        <div class="flex items-center justify-between mb-6">
            <div class="font-semibold text-xl">Notifications</div>
        </div>

        <span class="block text-muted-color font-medium mb-4">TODAY</span> 
        <ul class="p-0 mx-0 mt-0 mb-6 list-none">
         <li
            *ngFor="let noti of notifications.today"
            class="flex items-center py-2 border-b border-surface"
            >
            <div
                class="w-12 h-12 flex items-center justify-center rounded-full mr-4 shrink-0"
                [ngClass]="[
                'bg-' + noti.color + '-100',
                'dark:bg-' + noti.color + '-400/10'
                ]"
            >
                <i class="pi !text-xl" [ngClass]="['pi-'+noti.icon  ,'text-' + noti.color + '-500']"></i>
            </div>

            <p class="text-surface-900 dark:text-surface-0 leading-normal" [innerHTML]="noti.content | highlightNumbers">
            </p>
        </li>
        </ul>

        <span class="block text-muted-color font-medium mb-4">YESTERDAY</span>
        <ul class="p-0 m-0 list-none mb-6">
             <li
            *ngFor="let noti of notifications.yesterday"
            class="flex items-center py-2 border-b border-surface"
            >
            <div
                class="w-12 h-12 flex items-center justify-center rounded-full mr-4 shrink-0"
                [ngClass]="[
                'bg-' + noti.color + '-100',
                'dark:bg-' + noti.color + '-400/10'
                ]"
            >
                <i class="pi !text-xl" [ngClass]="['pi-'+noti.icon  ,'text-' + noti.color + '-500']"></i>
            </div>

            <p class="text-surface-900 dark:text-surface-0 leading-normal" [innerHTML]="noti.content | highlightNumbers">
            </p>
        </li>
        </ul>
        <span class="block text-muted-color font-medium mb-4">Older</span>
        <ul class="p-0 m-0 list-none">
             <li
            *ngFor="let noti of notifications.older"
            class="flex items-center py-2 border-b border-surface"
            >
            <div
                class="w-12 h-12 flex items-center justify-center rounded-full mr-4 shrink-0"
                [ngClass]="[
                'bg-' + noti.color + '-100',
                'dark:bg-' + noti.color + '-400/10'
                ]"
            >
                <i class="pi !text-xl" [ngClass]="['pi-'+noti.icon  ,'text-' + noti.color + '-500']"></i>
            </div>

            <p class="text-surface-900 dark:text-surface-0 leading-normal" [innerHTML]="noti.content | highlightNumbers">
            </p>
        </li>
        </ul>
    </div>`
})
export class NotificationsWidget {

    supplierService = inject(SupplierService)
    notifications

    ngOnInit(){
     this.loadData()
    }

    loadData(){
        this.supplierService.getNotifications().subscribe(res=>{
            this.notifications = res['data']
        })
    }

}
