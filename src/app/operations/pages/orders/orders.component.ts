import { CommonModule } from '@angular/common';
import { Component, inject, Input, signal, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SupplierService } from '@operations/services/supplier.service';
import { PackageComponent } from '@shared/pages/package/package.component';
import { AuthService } from 'app/core/services/auth.service';
import { ButtonModule } from 'primeng/button';
import { DataViewModule } from 'primeng/dataview';
import { DatePickerModule } from 'primeng/datepicker';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { OrderListModule } from 'primeng/orderlist';
import { PaginatorModule } from 'primeng/paginator';
import { PickListModule } from 'primeng/picklist';
import { SelectModule } from 'primeng/select';
import { SelectButtonModule } from 'primeng/selectbutton';
import { TagModule } from 'primeng/tag';
import { debounceTime, distinctUntilChanged, Subject, switchMap } from 'rxjs';


@Component({
  selector: 'app-orders',
  imports: [
         PackageComponent,DatePickerModule,
         CommonModule, DataViewModule, FormsModule, SelectButtonModule, PickListModule, OrderListModule, TagModule, ButtonModule,PaginatorModule, InputIconModule, IconFieldModule, InputTextModule,SelectModule
      ],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent {

  supplierService = inject(SupplierService)
  authService = inject(AuthService)
  role = this.authService.userRole
 products = signal([])
 @Input() filter :any= {}
 totalRecords
  cols;
  sorted
  countries=[]
  selectedCountry
  searchSubject = new Subject<string>();

@ViewChild('Package') Package!: PackageComponent;
 ngOnInit() {
  this.loadData({page : 1});
  this.onSearch()
}
ngAfterViewInit(){
  this.Package.DataChange.subscribe(event=>{
    switch (event.name) {
      case 'delete order':
        this.deleteOrder(event.order,event.index)
        console.log(event.product);
        break;

      case 'add':
        console.log(event.product);
        break;

      case 'update':
        console.log(event.product);
        this.updateProduct(event.product , event.oldProduct)
        break;

     case 'paginate':
        console.log(event.filter);
        this.loadData(event.filter)
        break;
    
      default:
        break;
    }



  })
}
loadData(filter={}){
  this.filter.page = filter['page']
    this.supplierService.getOrders(this.filter).subscribe((res:any) => {
      console.log(res['data']);
        this.products.set(res['data']);
        this.totalRecords =res.meta.total
    });
}
 exportCSV(){
  this.supplierService.ordersExportCSV().subscribe((res: Blob) => {
    const fileURL = window.URL.createObjectURL(res);
    const a = document.createElement('a');
    a.href = fileURL;
    a.download = 'report.xlsx';  // 👈 choose your file name
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(fileURL); // cleanup
  });
}
onGlobalFilter(){
   this.searchSubject.next(this.filter)
}
search(search){
  this.filter.search = search
  this.searchSubject.next(this.filter)
}
onSearch() {
  this.searchSubject.pipe(
    debounceTime(300),
      // distinctUntilChanged(), 
      switchMap((val) =>  this.supplierService.getOrders(this.changeFormat(val)))
    )
    .subscribe(res=>{
        this.products.set( res['data']);
         this.totalRecords =res['meta'].total
    })
}
deleteOrder(order,index){
  this.supplierService.deleteOrder(order.id).subscribe(res=>{
    this.products().splice(index,1)
  })
}   
updateProduct(product , oldProduct){
  this.supplierService.updateOrderProduct(product).subscribe(res=>{
      oldProduct.quantity = oldProduct.quantity - product.quantity
    })
}   
changeFormat(val){
  let obj = {
    id : val?.id,
    page : val?.page,
    search : val?.search,
    from_date : val?.rangeDate?.[0],
    to_date : val?.rangeDate?.[1]
  }
return obj
}

}
