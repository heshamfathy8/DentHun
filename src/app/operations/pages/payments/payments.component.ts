import { Component, inject, signal, ViewChild } from '@angular/core';
import { ProductService } from '@login/services/product.service';
import { CrudComponent } from '@shared/pages/crud/crud.component';


@Component({
  selector: 'app-payments',
  imports: [
           CrudComponent
        ],
  templateUrl: './payments.component.html',
  styleUrl: './payments.component.scss'
})
export class PaymentsComponent {
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
      { field: 'quantity', header: 'Price' },
      { field: '', header: 'Quantity' },
      { field: '', header: 'Date' },
      { field: 'category', header: 'Category' },
      { field: 'inventoryStatus', header: 'Status' },
   ];
}


}
