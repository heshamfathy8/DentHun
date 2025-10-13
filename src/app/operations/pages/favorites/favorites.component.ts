import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { DoctorService } from '@operations/services/doctor.service';
import { ProductsComponent } from '@shared/pages/products/products.component';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from "primeng/confirmdialog";

@Component({
  selector: 'app-favorites',
 imports: [CommonModule, ProductsComponent, ConfirmDialogModule],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.scss'
})
export class FavoritesComponent {
private readonly doctorService = inject(DoctorService)
  private readonly messageService = inject(MessageService)
  private readonly confirmationService = inject(ConfirmationService)

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
        this.confirmRemove(event.product , event.index)
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
    this.doctorService.getFavorites(filter).subscribe((res) => {
        this.products.set(res['data']);
        this.totalRecords = res['meta'].total
    });
  }
confirmRemove(product , index){
    this.confirmationService.confirm({
            message: 'Are you sure you want to remove the product from favorites?',
            header: 'Remove',
            icon: 'pi pi-exclamation-triangle red',
             acceptButtonProps: {
                label: 'Remove',
                severity: 'danger',
            },
             rejectButtonProps: {
                label: 'Cancel',
                severity: 'secondary',
                outlined: true,
            },
            accept: () => {
              this.removeFromFavorites(product , index)
            }
        });
}  
removeFromFavorites(product , index){
  this.doctorService.removeFromFavorites(product.id).subscribe((res) => {
    this.products().splice(index,1)
    product.favorite = false
    this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Product removed from favorites',
          life: 3000
    });
  });
}  


addToCard(product){
  let data = {
    product_id: product.id,
}
   this.doctorService.addToCard(data).subscribe((res) => {
    this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Product added to Card',
          life: 3000
    });
  });
}  
getCategories(){
   this.doctorService.getCategories().subscribe((res) => {
        this.categories = res['data']
    });
}
}
