import { map } from 'rxjs';
import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { SupplierService } from '@operations/services/supplier.service';

@Component({
    standalone: true,
    selector: 'app-best-selling-widget',
    imports: [CommonModule, ButtonModule, MenuModule],
    template: ` <div class="card">
        <div class="flex justify-between items-center mb-6">
            <div class="font-semibold text-xl">Best Selling Products</div>
         
        </div>
        <ul class="list-none p-0 m-0">
            <li *ngFor="let product of products;let i = index" class="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                <div>
                    <span class="text-surface-900 dark:text-surface-0 font-medium mr-2 mb-1 md:mb-0">{{product.name}}</span>
                    <div class="mt-1 text-muted-color">{{product.category_name}}</div>
                </div>
                <div class="mt-2 md:mt-0 flex items-center">
                    <div class="bg-surface-300 dark:bg-surface-500 rounded-border overflow-hidden w-40 lg:w-24" style="height: 8px">
                        <div [ngClass]="{
                        'bg-cyan-500': colors[i] === 'cyan',
                        'bg-pink-500': colors[i] === 'pink',
                        'bg-orange-500': colors[i] === 'orange',
                        'bg-green-500': colors[i] === 'green',
                        'bg-purple-500': colors[i] === 'purple'
                    }" [class]="'bg-'+ colors[i] +'-500 h-full'" style="width: 50%">
                    </div>
                </div>
                    <span   [ngClass]="{
                        'text-cyan-500': colors[i] === 'cyan',
                        'text-pink-500': colors[i] === 'pink',
                        'text-orange-500': colors[i] === 'orange',
                        'text-green-500': colors[i] === 'green',
                        'text-purple-500': colors[i] === 'purple'
                    }"
                    class="ml-4 font-medium"
                    >%{{product.percentage}}
                </span>
                </div>
            </li>
        </ul>
    </div>`
})
export class BestSellingWidget {

   @Input() products!: any[];

  colors = [ "orange", "cyan","pink",  "green", "purple"];
   
}
