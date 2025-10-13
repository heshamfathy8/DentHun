import { Component, inject, Input, OnInit, signal, ViewChild } from '@angular/core';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { RatingModule } from 'primeng/rating';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ProductService } from '@login/services/product.service';
import { PackageComponent } from '@shared/pages/package/package.component';
import { SupplierService } from '@operations/services/supplier.service';
import { AuthService } from 'app/core/services/auth.service';
import { Subject, debounceTime, switchMap } from 'rxjs';
import { IconFieldModule } from "primeng/iconfield";
import { InputIconModule } from "primeng/inputicon";
import { DatePickerModule } from "primeng/datepicker";
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { DoctorService } from '@operations/services/doctor.service';

@Component({
  selector: 'app-packages',
  imports: [TableModule, TagModule, ToastModule, RatingModule, ButtonModule,FormsModule, InputTextModule, CommonModule, PackageComponent, IconFieldModule, InputIconModule, DatePickerModule],
   providers: [ProductService, MessageService],
  templateUrl: './packages.component.html',
  styleUrl: './packages.component.scss'
})
export class PackagesComponent {

  supplierService = inject(SupplierService)
  doctorService = inject(DoctorService)
  messageService = inject(MessageService)
  authService = inject(AuthService)
  products = signal([])
  role = this.authService.userRole
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
DataChange(event){
     switch (event.name) {
      case 'buy':
        console.log(event.product);
        this.addToCard(event.product)
        break;

      case 'delete order':
        this.deleteOrder(event.order,event.index)
        console.log(event.order);
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
loadData(filter={}){
  this.filter.page = filter['page']
    this.supplierService.getOrders(this.filter).subscribe((res:any) => {
      console.log(res['data']);
        this.products.set(res['data']);
        this.totalRecords =res.meta.total
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
product.is_added = true
   this.doctorService.addToCard(data).subscribe((res) => {
    this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Product added to Card',
          life: 3000
    });
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
