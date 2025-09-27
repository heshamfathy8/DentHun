import { Component, inject, signal, ViewChild } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ProductService } from '@login/services/product.service';
import { CrudComponent } from '@shared/pages/crud/crud.component';

@Component({
  selector: 'app-clients',
  imports: [CrudComponent],
  templateUrl: './clients.component.html',
  styleUrl: './clients.component.scss'
})
export class ClientsComponent {
 productService = inject(ProductService)
 products = signal([])
 router = inject(Router)
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

showDetails(e){
  this.router.navigate(['/operations/client-details',e.id])
}
}
