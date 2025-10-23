import { map } from 'rxjs';
import { Component, inject } from '@angular/core';
import { RippleModule } from 'primeng/ripple';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { ProductService } from '@login/services/product.service';
import { SupplierService } from '@operations/services/supplier.service';

@Component({
    standalone: true,
    selector: 'app-recent-sales-widget',
    imports: [CommonModule, TableModule, ButtonModule, RippleModule],
    template: `<div class="card !mb-8">
        <div class="font-semibold text-xl mb-4">Recent Sales</div>
        <p-table [value]="products" [paginator]="true" [rows]="5" responsiveLayout="scroll">
            <ng-template #header>
                <tr>
                    <th>Image</th>
                    <th >Name </th>
                    <th >Price </th>
                    <th>Doctor</th>
                    <th>Date</th>
                </tr>
            </ng-template>
            <ng-template #body let-product>
                <tr>
                    <td >
                        <img [src]="product.img " class="shadow-lg" alt="{{ product.name }}" width="50" />
                    </td>
                    <td>{{ product.doctor_name }}</td>
                    <td >{{ product.price  }}</td>
                    <td>
                       {{ product.name }}
                    </td>
                    <td >
                       {{ product.date }}
                    </td>
                </tr>
            </ng-template>
        </p-table>
    </div>`,
})
export class RecentSalesWidget {

    private readonly supplierService = inject(SupplierService)
    products!: any[];

    ngOnInit() {
        this.supplierService.getOrders({page:1}).subscribe((res) => 
        {
            console.log(res['data'])
            this.products =  res['data'].flatMap(order => order.products.map((product:any)=> ({...product , doctor_name: order.name , date: order.created_at  })))

         }   
    );
    }
}
