import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { DoctorService } from '@operations/services/doctor.service';
import { MessageService } from 'primeng/api';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from "primeng/button";

@Component({
  selector: 'app-my-cart',
  imports: [CommonModule, FormsModule, InputNumberModule, RouterModule, FormsModule, ButtonModule],
  templateUrl: './my-cart.component.html',
  styleUrl: './my-cart.component.scss'
})
export class MyCartComponent {

 private readonly doctorService = inject(DoctorService)
  private readonly messageService = inject(MessageService)
  private readonly router = inject(Router)
 products = signal([])
quantity= []
total = computed(() =>
    this.products().reduce((sum, item) => sum + item.price * item.amount(), 0)
  );
notes: any;
 ngOnInit(){
  this.getProducts()
 }

 getProducts(){
   this.doctorService.getCardProducts().subscribe((res:any) => {
      console.log(res['data']);
      this.products.set(res['data']);

      this.products.update(items =>
      items.map( item => ({ ...item , amount : signal(1)}))
      )
    });
 }
 checkout(){
    let data ={
      products : this.products().map(item => 
        ({
          id : item.id,
          quantity : item.amount(),
        })
      ),
        notes : this.notes
    }
   this.doctorService.checkout(data).subscribe((res:any) => {
      localStorage.removeItem('CartNum')
      this.doctorService.$cartNum.set(0)
      this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Order Sent Successful',
          life: 3000
    });
    this.router.navigateByUrl('/operations/shopping')
    });
 }
 remove(product ,index){
  this.doctorService.removeFromCart(product.id).subscribe((res) => {
    this.products.update(items =>
      { items.splice(index,1)
       return [...items]}
      );
      product.favorite = true
      this.doctorService.$cartNum.update(val=> val -1)
      localStorage.setItem('CartNum',this.doctorService.$cartNum().toString())
    this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Product Removed Successful',
          life: 3000
    });
  });

 }
 addToFavorites(product){
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


}
