import { CommonModule } from '@angular/common';
import { Component, inject, signal, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductService } from '@login/services/product.service';
import { CrudComponent } from '@shared/pages/crud/crud.component';
import { PackageComponent } from '@shared/pages/package/package.component';
import { ButtonModule } from 'primeng/button';
import { DataViewModule } from 'primeng/dataview';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { OrderListModule } from 'primeng/orderlist';
import { PaginatorModule } from 'primeng/paginator';
import { PickListModule } from 'primeng/picklist';
import { SelectModule } from 'primeng/select';
import { SelectButtonModule } from 'primeng/selectbutton';
import { TagModule } from 'primeng/tag';


@Component({
  selector: 'app-orders',
  imports: [
         PackageComponent,
         CommonModule, DataViewModule, FormsModule, SelectButtonModule, PickListModule, OrderListModule, TagModule, ButtonModule,PaginatorModule, InputIconModule, IconFieldModule, InputTextModule,SelectModule
      ],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent {

  productService = inject(ProductService)
 products = signal([])
  cols;
  sorted
  countries=[]
  selectedCountry

@ViewChild('Package') Package!: PackageComponent;
 ngOnInit() {
  this.loadData();
}
ngAfterViewInit(){
  this.Package.DataChange.subscribe(event=>{
    switch (event.name) {
      case 'delete':
        console.log(event.product);
        break;

      case 'add':
        console.log(event.product);
        break;

      case 'update':
        console.log(event.product);
        break;
    
      default:
        break;
    }



  })
}
loadData(){
    this.productService.getProducts().then((data) => {
      let data2=[
      {
                id: '1004',
                name: 'Bracelet',
                doctor: 'hesham',
                image: 'bracelet.jpg',
                category: 'Accessories',
                price: 15,
                quantity: 73,
                inventoryStatus: 'INSTOCK',
                date: '5-9-2025',
            },
      ]
        this.products.set( data2);
    });

    this.cols = [
      { field: '', header: 'Name' },
      { field: 'name', header: 'Doctor' },
      { field: '', header: 'Image' },
      { field: 'price', header: 'Price' },
      { field: '', header: 'Quantity' },
      { field: '', header: 'Date' },
      { field: 'category', header: 'Category' },
      { field: 'inventoryStatus', header: 'Status' },
   ];
}
  exportCSV() {
      }

}
