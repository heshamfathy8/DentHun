import { Component, inject, signal, ViewChild } from '@angular/core';
import { ProductService } from '@login/services/product.service';
import { CrudComponent } from '@shared/pages/crud/crud.component';
import { PackageComponent } from '@shared/pages/package/package.component';


@Component({
  selector: 'app-current-orders',
  imports: [
        PackageComponent
     ],
  templateUrl: './current-orders.component.html',
  styleUrl: './current-orders.component.scss'
})
export class CurrentOrdersComponent {
 productService = inject(ProductService)
 products = signal([])
cols;

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
        this.products.set( data);
    });

    this.cols = [
                { field: '', header: 'Code', customExportHeader: 'Product Code' },
                { field: 'name', header: 'Name' },
                { field: '', header: 'Image' },
                 { field: 'price', header: 'Price' },
                { field: 'price', header: 'Quantity' },
                { field: 'category', header: 'Category' },
                { field: 'rating', header: 'Reviews' },
                { field: 'inventoryStatus', header: 'Status' },
            ];
}

}
