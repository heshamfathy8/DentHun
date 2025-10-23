import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { DoctorService } from '@operations/services/doctor.service';
import { ProductsComponent } from '@shared/pages/products/products.component';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-shopping',
   imports: [CommonModule,ProductsComponent],
  templateUrl: './shopping.component.html',
  styleUrl: './shopping.component.scss',
})
export class ShoppingComponent {

private readonly doctorService = inject(DoctorService)
  private readonly messageService = inject(MessageService)
  // private readonly authService = inject(AuthService)

  products= signal([])
  totalRecords: any;
  categories :any[]
  sorts = [
    {name: 'Recent' , id:''},
    {name: 'Low Price' , id:'asc'},
    {name: 'High Price' , id:'desc'},
    // {name: 'Best Sellers' , id:''},
  ]

ngOnInit(){
  this.loadData({page :1})
  this.getCategories()
}
 DataChange(event){
     switch (event.name) {
      case 'buy':
        console.log(event.product);
        this.addToCard(event.product)
        break;

      case 'favorite':
        console.log(event.product);
        this.markAsFavorite(event.product , event.index)
        break;

      case 'filter':
        console.log(event.filter);
        this.loadData(event.filter)
        break;

     
    
      default:
        break;
    }
}
loadData(filter){
    this.doctorService.getShopProducts(filter).subscribe((res) => {
        this.products.set(res['data']);
        this.totalRecords = res['meta'].total
    });
  }
markAsFavorite(product , index){
  this.doctorService.markAsFavorite(product.id).subscribe((res) => {
     product.favorite = true
    this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Product added to favorites',
          life: 3000
    });
  });
}  
addToCard(product){
  let data = {
    product_id: product.id,
}
this.doctorService.addToCard(data).subscribe((res) => {
     product.is_added = true
    this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Product added to Card',
          life: 3000
    });
    this.doctorService.$cartNum.update(val => val + 1)
    localStorage.setItem('CartNum',this.doctorService.$cartNum().toString())
  });
}  
getCategories(){
   this.doctorService.getCategories().subscribe((res) => {
        this.categories = res['data']
    });
}

}
