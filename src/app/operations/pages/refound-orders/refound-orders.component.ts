import { SupplierService } from '@operations/services/supplier.service';
import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import {  ConfirmationService, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ConfirmDialogModule } from "primeng/confirmdialog";

@Component({
  selector: 'app-refound-orders',
   imports: [CommonModule, CardModule, ButtonModule, ConfirmDialogModule],
   providers: [ ConfirmationService],
  templateUrl: './refound-orders.component.html',
  styleUrl: './refound-orders.component.scss'
})
export class RefoundOrdersComponent {

  constructor(
        private confirmationService: ConfirmationService,
        private supplierService: SupplierService,
        private message: MessageService
    ) {}

    ngOnInit(){
      this.getData()
    }

  items = signal([]);

  getData(){
    this.supplierService.getRefoundOrders().subscribe(res=>{
      this.items.set(res['data'])
    })
  }

  onCancel(item,index) {
          this.confirmationService.confirm({
              message: 'Are you sure you want to reject ' + item.name + '?',
              header: 'Reject',
              icon: 'pi pi-exclamation-triangle red',
               acceptButtonProps: {
                  label: 'Reject',
                  severity: 'danger',
              },
               rejectButtonProps: {
                  label: 'Cancel',
                  severity: 'secondary',
                  outlined: true,
              },
              accept: () => {
                 this.changeStatus(item,'rejected',index)
              }
          });
  }
  
  onConfirm(item , index) {
      this.confirmationService.confirm({
          message: 'Are you sure you want to confirm ' + item.name + '?',
          header: 'Confirm',
          icon: 'pi pi-check-circle',
            acceptButtonProps: {
              label: 'Confirm',
              severity: 'success',
          },
            rejectButtonProps: {
              label: 'Cancel',
              severity: 'secondary',
              outlined: true,
          },
          accept: () => {
              this.changeStatus(item,'confirmed',index)
          }
      });
  }

  changeStatus(item,status,index){
    let data = {
      status: status
    }
    this.supplierService.changeRefoundOrdersStatus(item,data).subscribe(res=>{
      this.items().splice(index,1)
      this.message.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Request status has been changed successfully!',
          life: 3000
      });

    })
  }
}
