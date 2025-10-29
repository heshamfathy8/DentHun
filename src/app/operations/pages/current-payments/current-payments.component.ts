import { SupplierService } from '@operations/services/supplier.service';
import { Component, inject, signal, ViewChild } from '@angular/core';
import { CrudComponent } from '@shared/pages/crud/crud.component';
import { AuthService } from 'app/core/services/auth.service';
import { MessageService } from 'primeng/api';
import { DoctorService } from '@operations/services/doctor.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-current-payments',
   imports: [
          CrudComponent
       ],
  templateUrl: './current-payments.component.html',
  styleUrl: './current-payments.component.scss'
})
export class CurrentPaymentsComponent {
 doctorService = inject(DoctorService)
 authService = inject(AuthService)
 message = inject(MessageService)
 router = inject(Router)
 payments = signal([])
 role =  this.authService.userRole
 cols;

totalRecords

@ViewChild('Crud') crud!: CrudComponent;

ngOnInit() {
  this.loadData();
  this.setColumns()
}
DataChange(event){
     switch (event.name) {
      case 'cancel':
        this.cancelPayment(event.product , event.index)
        break;

      case 'confirm':
        this.confirmPayment(event.product , event.index)
        break;

      default:
        break;
    }

}
loadData(){
    this.doctorService.getCurrentPayments().subscribe((res:any) => {
      
      res.data.forEach(item => {
        item.paid = item.requested_paid ?? item.paid
      });
        this.payments.set( res['data']);
       
    });

}
setColumns(){
  this.cols = [
      { field: 'name', header: 'Name' },
      { field: 'paid', header: 'Payment' },
      { field: 'date', header: 'Date' },
      { field: 'remaining', header: 'Remaining' },
   ];
}
confirmPayment(payment ,index){
   let data = {status : 'confirmed'}
   this.doctorService.confirmPayment(payment.id ,data).subscribe((res) => {
    this.payments().splice(index ,1)
        this.message.add({ severity: 'success', summary: 'Product Confirmed', detail: 'Payment Confirmed successfully', life: 3000 });
          this.crud.productDialog = false
    });

}
cancelPayment(payment ,index){
  let data = {status : 'rejected'}
  this.doctorService.cancelPayment(payment.id ,data).subscribe((res) => {
    this.payments().splice(index ,1)
        this.message.add({ severity: 'success', summary: 'Product Rejected', detail: 'Payment rejected successfully', life: 3000 });
          this.crud.productDialog = false
    });
}

}
