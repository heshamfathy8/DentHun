import { Component, inject, Input, OnInit, signal, ViewChild } from '@angular/core';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { RatingModule } from 'primeng/rating';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
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
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-packages',
  imports: [TableModule, TagModule, ToastModule, RatingModule, ButtonModule,FormsModule, InputTextModule, CommonModule, PackageComponent, IconFieldModule, InputIconModule, DatePickerModule],
   providers: [ProductService],
  templateUrl: './packages.component.html',
  styleUrl: './packages.component.scss'
})
export class PackagesComponent {

  supplierService = inject(SupplierService)
  doctorService = inject(DoctorService)
  message = inject(MessageService)
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
        this.addToCard(event.product , event.index)
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
    
      case 'update':
        console.log(event.product);
        this.updateProduct(event.product ,event.order)
        break;

      case 'activate':
        console.log(event.order);
        this.activate(event.order)
        break;
    
      default:
        break;
    }
}
loadData(filter={}){
  this.filter.page = filter['page']
    this.supplierService.getPackages(this.filter).subscribe((res:any) => {
      console.log(res['data']);
        this.products.set(res['data']);
        this.totalRecords =res.meta.total
    });
}
markAsFavorite(product , index){
  this.doctorService.markAsFavorite(product.id).subscribe((res) => {
     product.favorite = true
    this.message.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Product added to favorites',
          life: 3000
    });
  });
}  
addToCard(product,index){
  let data = {
  "notes": "يرجى التوصيل بعد الساعة 5 مساءً",
  "payment_method": "مدفوعات" // "الكترونى" , "كاش" , مدفوعات
}
   this.doctorService.addPackageToCard(product.id ,data).subscribe((res) => {
    this.message.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Package added to Current Order',
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
      switchMap((val) =>  this.supplierService.getPackages(this.changeFormat(val)))
    )
    .subscribe(res=>{
        this.products.set( res['data']);
         this.totalRecords =res['meta'].total
    })
}
deleteOrder(order,index){
  this.supplierService.deletePackage(order).subscribe(res=>{
    this.products().splice(index,1)
  this.message.add({
        severity: 'success',
        summary: 'Successful',
        detail: 'Item Deleted Successfully',
        life: 3000
      });
  })
}   
updateProduct(product ,order){
    // console.log(product);
    // let x = {
    // "id": 2,
    // "doctor_name": "Doctor",
    // "notes": "يرجى التوصيل بعد الساعة 5 مساءً",
    // "status": "delivered",
    // "status_name": "تم التوصيل",
    // "total_order_price": 2546,
    // "created_at": "2025-09-28",
    // "products": [
    //     {
    //         "id": 3,
    //         "product_id": 22,
    //         "category_id": 6,
    //         "category_name": "تقويم الأسنان",
    //         "name": "hesham22",
    //         "desc": "heshamskasdasd",
    //         "img": "https://dental-link.azda-cs.com/storage/products/YIwubSDPtAyLaO1dZBwennFlZ0zFTAD9SgCJYET9.png",
    //         "price": 1000,
    //         "quantity": 2,
    //         "quantityAvailable": "2",
    //         "total_price": 2000
    //     },
    //     {
    //         "id": 4,
    //         "product_id": 21,
    //         "category_id": 6,
    //         "category_name": "تقويم الأسنان",
    //         "name": "sdfd",
    //         "desc": "asd",
    //         "img": "https://dental-link.azda-cs.com/storage/products/4SvFTjMj8Sbe3PaWIBvGqkz4Hqs6Njf4LgTjfcKb.png",
    //         "price": 546,
    //         "quantity": 1,
    //         "quantityAvailable": "56",
    //         "total_price": 546
    //     }
    // ]
    // }
  // Object.assign(order,x)
  // this.supplierService.updatePackage(product).subscribe(res=>{
  //   })
}   
activate(order) {
  this.supplierService.activate(order.id).subscribe({
    next: (res) => {
      this.message.add({
        severity: 'success',
        summary: 'Successful',
        detail: 'Activate changed',
        life: 3000
      });
    },
    error: () => {
      // لو حصل error رجّع الحالة القديمة
      order.checked = !order.checked;
    }
  });
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
