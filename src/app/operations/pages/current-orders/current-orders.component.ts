import { Component, inject, signal, ViewChild } from '@angular/core';
import { SupplierService } from '@operations/services/supplier.service';
import { PackageComponent } from '@shared/pages/package/package.component';
import { AuthService } from 'app/core/services/auth.service';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-current-orders',
  imports: [
        PackageComponent
  ],
  templateUrl: './current-orders.component.html',
  styleUrl: './current-orders.component.scss'
})
export class CurrentOrdersComponent {

  private readonly supplierService = inject(SupplierService)
  private readonly authService = inject(AuthService)
  private readonly message = inject(MessageService)

  orders = signal([])
  cols;
  role =  this.authService.userRole
totalRecords

@ViewChild('Package') Package!: PackageComponent;


ngOnInit() {
  this.loadData();
}

ngAfterViewInit(){
  this.Package.DataChange.subscribe(event=>{
    switch (event.name) {
      case 'delete order':
        this.deleteOrder(event.order,event.index,event.i)
        console.log(event.product);
        break;

      case 'change status':
        this.changeOrderStatus(event.order,event.index , event.status)
        console.log(event.order);
        break;

      case 'add':
        console.log(event.product);
        break;

      case 'update':
        console.log(event.product);
        this.updateProduct(event.product , event.oldProduct ,event.order)
        break;

     case 'paginate':
        console.log(event.page);
        this.loadData(event.page)
        break;
    
      default:
        break;
    }

  })
}
  deleteOrder(order: any, index: any , i?) {
    
    this.supplierService.deleteOrder(order).subscribe((res) => {
      order.created_at ?
      this.orders().splice(index,1)
      :
      this.orders()[index]?.products?.splice(i,1)

      this.message.add({
         severity: 'success',
         summary: 'Success',
         detail: 'order delivered successfully!'
       });
    });
  }
  changeOrderStatus(order: any, index: any ,status) {
    this.supplierService.changeOrderStatus(order.id,status).subscribe((res) => {
      if (status.status == 'delivered' || status.status == 'rejected') {
        this.orders().splice(index,1)
      }
      else if (status.status == 'preparing') {
        order.status = 'preparing'
      }
      this.message.add({
         severity: 'success',
         summary: 'Success',
         detail: `order ${status?.status} successfully!`
       });
    });
  }
  // cancelOrder(order: any, index: any) {
  //   this.supplierService.getOrders(order.id).subscribe((res) => {
  //     this.orders().splice(index,1)
  //     this.message.add({
  //        severity: 'success',
  //        summary: 'Success',
  //        detail: 'order canceled successfully!'
  //      });
  //   });
  // }
  // pendOrder(order: any) {
  //   this.supplierService.getOrders(order.id).subscribe((res) => {
  //     this.message.add({
  //        severity: 'success',
  //        summary: 'Success',
  //        detail: 'order pending successfully!'
  //      });
  //   });
  // }
  updateProduct(product , oldProduct ,order){
    this.supplierService.updateCurrentProduct(product).subscribe(res=>{
    oldProduct.quantity = product.quantity
    order.total_order_price = res['data']
    this.message.add({
         severity: 'success',
         summary: 'Success',
         detail: `order updated successfully!`
       });
    })
}   
loadData(page=1){
    this.supplierService.getCurrentOrders(page).subscribe((res:any) => {
      console.log(res['data']);
        this.orders.set(res['data']);
        this.totalRecords = res.meta.total
    });
  
}

}
