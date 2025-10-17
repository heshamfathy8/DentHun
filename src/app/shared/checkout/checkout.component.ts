import { CommonModule } from '@angular/common';
import { Component, computed, effect, inject, Input, signal, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { DoctorService } from '@operations/services/doctor.service';
import { SupplierService } from '@operations/services/supplier.service';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputText, InputTextModule } from "primeng/inputtext";

@Component({
  selector: 'app-checkout',
   imports: [CommonModule, FormsModule, InputNumberModule, RouterModule, FormsModule, ButtonModule, InputTextModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent {
private readonly supplier = inject(SupplierService)
  private readonly messageService = inject(MessageService)
  private readonly router = inject(Router)
@Input() products = signal([])
@Input() notes 
@Input() packageName 
@Input() id 
@Input() initPrice = 0
totalPrice
quantity= []
total = computed(() =>
    this.products().reduce((sum, item) => sum + item.price * item.amount(), 0)
  );


  constructor() {
    effect(() => {
     this.totalPrice =  this.total()
    });
  }
  ngAfterViewInit(){
    this.totalPrice = this.initPrice
  }

 createPackage(){
  let data ={
    name: this.packageName,
    desc: this.notes,
    price: this.totalPrice,
    products:  this.products().map(item => 
        ({
          id : item.id,
          quantity : item.amount(),
        })
      ),
  }
this.supplier.CreatePackage(data).subscribe((res:any) => {
      this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Package Created Successful',
          life: 3000
    });
    this.router.navigateByUrl('/operations/packages')
    });
 }
 updatePackage(){
  let data ={
    name: this.packageName,
    desc: this.notes,
    price: this.totalPrice,
    products:  this.products().map(item => 
        ({
          id : item.product_id,
          quantity : item.amount(),
        })
      ),
  }
this.supplier.updatePackage(data,this.id).subscribe((res:any) => {
      this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Package Updated Successful',
          life: 3000
    });
    this.router.navigateByUrl('/operations/packages')
    });
 }
//  remove(product ,index){
//   this.doctorService.removeFromCart(product.id).subscribe((res) => {
//     this.products.update(items =>
//       { items.splice(index,1)
//        return [...items]}
//       );
//      product.favorite = true
//     this.messageService.add({
//           severity: 'success',
//           summary: 'Successful',
//           detail: 'Product Removed Successful',
//           life: 3000
//     });
//   });

//  }
//  addToFavorites(product){
//    this.doctorService.markAsFavorite(product.id).subscribe((res) => {
//    product.favorite = true
//     this.messageService.add({
//           severity: 'success',
//           summary: 'Successful',
//           detail: 'Product added to favorites',
//           life: 3000
//     });
//   });
//  }


}
