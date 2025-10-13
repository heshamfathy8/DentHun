import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ProductService, Product } from '@login/services/product.service';
import { ButtonModule } from 'primeng/button';
import { DataViewModule } from 'primeng/dataview';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { OrderListModule } from 'primeng/orderlist';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { PickListModule } from 'primeng/picklist';
import { SelectModule } from 'primeng/select';
import { SelectButtonModule } from 'primeng/selectbutton';
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'app-products',
  imports: [CommonModule, DataViewModule, FormsModule, SelectButtonModule, PickListModule, OrderListModule, TagModule, ButtonModule,PaginatorModule, InputIconModule, IconFieldModule, InputTextModule,SelectModule ,RouterModule],
  providers: [ProductService],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {

   @Input() favo: any 
   @Input() totalRecords: any 
   @Input() products: any[]
   @Input() categories: any[]
   @Input() sorts: any[]
   @Output() DataChange = new EventEmitter<any>();
   
searchValue
filter:any = {}
selectedCountry
sorted
 countries = [
            { name: 'Australia', id: 'AU' },
        ];
 layout: 'list' | 'grid' = 'list';

    options = ['list', 'grid'];


    sourceCities: any[] = [];

    targetCities: any[] = [];

    orderCities: any[] = [];

    searchText


    getSeverity(status) {
        switch (status) {
            case 'INSTOCK':
                return 'success';

            case 'LOWSTOCK':
                return 'warn';

            case 'OUTOFSTOCK':
                return 'danger';

            default:
                return 'info';
        }
    }
     first: number = 0;

    rows: number = 10;

    onPageChange(event: PaginatorState) {
        let page = event.page + 1
        this.filter.page =page
        this.DataChange.emit({name : "filter" , filter : this.filter})
    }
    onFilter(key,value){
        this.filter[key] = value
         this.DataChange.emit({name : "filter" , filter : this.filter})
    }

    buy(product ,index){
         this.DataChange.emit({name : "buy" , product : product , index : index})
    }
    markAsFavorite(product ,index){
         this.DataChange.emit({name : "favorite" , product : product , index : index})
    }
}
