import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ButtonModule } from "primeng/button";
import { IconFieldModule } from "primeng/iconfield";
import { InputIconModule } from "primeng/inputicon";
import { SelectModule } from "primeng/select";
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { DataViewModule } from 'primeng/dataview';
import { OrderListModule } from 'primeng/orderlist';
import { PaginatorModule } from 'primeng/paginator';
import { PickListModule } from 'primeng/picklist';
import { SelectButtonModule } from 'primeng/selectbutton';
import { TagModule } from 'primeng/tag';
import { debounceTime, of, Subject, switchMap, tap } from 'rxjs';
import { DoctorService } from '@operations/services/doctor.service';
import { RouterModule } from '@angular/router';
import { AuthService } from 'app/core/services/auth.service';
import { SupplierService } from '@operations/services/supplier.service';
@Component({
  selector: 'app-doctors',
  imports:  [
           TableModule, RouterModule,
           CommonModule, DataViewModule, FormsModule, SelectButtonModule, PickListModule, OrderListModule, TagModule, ButtonModule,PaginatorModule, InputIconModule, IconFieldModule, InputTextModule,SelectModule
        ],
  templateUrl: './doctors.component.html',
  styleUrl: './doctors.component.scss'
})
export class DoctorsComponent {
  doctorService = inject(DoctorService)
  supplierService = inject(SupplierService)
  authService = inject(AuthService)
    role = this.authService.userRole
totalRecords: number;
  filter: any= {}
  searchSubject = new Subject()
products: any[];
selectedCountry: any;

ngOnInit(){
  this.search()
}

loadDoctorsData(filter){
    this.doctorService.getDoctors(filter).subscribe((res:any) => {
        this.products = res['data']
    });

}
loadSuppliersData(filter){
    this.supplierService.getSuppliers(filter).subscribe((res:any) => {
        this.products = res['data']
    });

}
loadData(page){
  console.log(page);
    page = page / 10 + 1;
    this.filter.page = page

  if (this.role == 'doctor') {
    this.loadSuppliersData(this.filter)
  }
  else if(this.role == 'supplier'){
    this.loadDoctorsData(this.filter)
  }
}
countries = [
  {
    name : "ALL",
    value : false ,
  },
  {
    name : "interacted",
    value : true ,
  },
  
  
]


  // loadPage(page){
  //       console.log(page);
  //        page = page / 10 + 1;
  //        this.filter.page = page
  //        this.loadData(this.filter)
  //   }
    search(){
     this.searchSubject.pipe(
    debounceTime(500),
    switchMap((filter) => {
      // عدل الفلتر مثلاً حسب القيمة الجديدة
      if (this.role === 'doctor') {
        return this.supplierService.getSuppliers(this.filter);
      } 
      else if (this.role === 'supplier') {
        return this.doctorService.getDoctors(this.filter);
      }
    })
  ).subscribe((res: any) => {
    if (res) {
      this.products = res.data;
      this.totalRecords = res.meta.total;
    }
  });
    }
    onSearch(value){
      this.filter.search = value
      this.searchSubject.next(this.filter)
    }
    onChangeCategory(value){
      this.filter.interacted_only = value
      this.searchSubject.next(this.filter)
    }

}
