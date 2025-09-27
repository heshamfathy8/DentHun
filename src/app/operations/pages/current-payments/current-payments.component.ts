import { Component, inject, signal, ViewChild } from '@angular/core';
import { ProductService } from '@login/services/product.service';
import { CrudComponent } from '@shared/pages/crud/crud.component';


@Component({
  selector: 'app-current-payments',
   imports: [
          CrudComponent
       ],
  templateUrl: './current-payments.component.html',
  styleUrl: './current-payments.component.scss'
})
export class CurrentPaymentsComponent {
 productService = inject(ProductService)
 products = signal([])
cols;

@ViewChild('Crud') crud!: CrudComponent;

 ngOnInit() {
  this.loadData();
}
ngAfterViewInit(){
  this.crud.DataChange.subscribe(event=>{
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
