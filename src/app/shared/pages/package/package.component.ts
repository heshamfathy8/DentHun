import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from '@login/services/product.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { RatingModule } from 'primeng/rating';
import { TableModule, TableRowExpandEvent, TableRowCollapseEvent } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'app-package',
  imports: [TableModule, TagModule, ToastModule, RatingModule, ButtonModule, CommonModule,ConfirmDialogModule,DialogModule, InputNumberModule,InputTextModule,FormsModule,TooltipModule],
  providers: [ProductService, MessageService ,ConfirmationService],
  templateUrl: './package.component.html',
  styleUrl: './package.component.scss'
})
export class PackageComponent {

     @Input() products: any = signal([])
    @Input() Add: any
    @Input() Pending: any
    @Input() Refound: any
    @Input() Delete: any
    @Input() Update: any
    @Input() filter: any = {}
     @Input() totalRecords 
    @Input() showStatus: any
    @Input() cols!: any[];
    @Input() confirm!: any;
    @Input() Buy: any;
    @Output() DataChange = new EventEmitter<any>();


    expandedRows = {};
  oldProduct:any
  product: any;
  order
  hideDialog: any;
  productDialog: boolean;

    constructor( private messageService: MessageService, private confirmationService: ConfirmationService , private router :Router) {}


    expandAll() {
        this.expandedRows = this.products().reduce((acc, p) => (acc[p.id] = true) && acc, {});
    }
        ngOnInit(){
            setTimeout(() => {
                console.log( this.products());
                
            }, 2000);
        }
    collapseAll() {
        this.expandedRows = {};
    }

    loadPage(page){
        console.log(page);
         page = page / 10 + 1;
         this.filter.page =page
        this.DataChange.emit({name:'paginate',filter: this.filter})
    }

    getStatusSeverity(status: string) {
        switch (status) {
            case 'preparing':
                return 'warn';
            case 'delivered':
                return 'success';
            case 'rejected':
                return 'danger';
        }
    }

    onRowExpand(event: TableRowExpandEvent) {
        this.messageService.add({ severity: 'info', summary: 'Product Expanded', detail: event.data?.name, life: 3000 });
    }

    onRowCollapse(event: TableRowCollapseEvent) {
        this.messageService.add({ severity: 'success', summary: 'Product Collapsed', detail: event.data?.name, life: 3000 });
    }
    deleteProduct(product){}
    openNew(){
        this.router.navigateByUrl('/operations/create-package')
    }
    
    editProduct(product ,order) {
        this.product = { ...product };
        this.oldProduct = product
        this.order = order
        this.productDialog = true;
        
    }
    saveProduct(){
        this.DataChange.emit({name:'update',product: this.product ,oldProduct :this.oldProduct , order : this.order})
        this.productDialog = false;
    }
   
    deleteOrder(order,index,i?){
         this.confirmationService.confirm({
            message: 'Are you sure you want to delete ' + (order.doctor_name ?? order.name) + '?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle red',
             acceptButtonProps: {
                label: 'Delete',
                severity: 'danger',
            },
             rejectButtonProps: {
                label: 'Cancel',
                severity: 'secondary',
                outlined: true,
            },
            accept: () => {
                this.DataChange.emit({name:'delete order' , order : order , index : index ,i:i})

            }
        });
    }
    acceptOrder(order,index){
        console.log(order);
        
         this.confirmationService.confirm({
            message: 'Are you sure the order delivered to ' + (order.doctor_name ?? order.name) + '?',
            header: 'Confirm',
             icon: 'pi pi-check-circle ',
             acceptButtonProps: {
                label: 'confirm',
                severity: 'success',
            },
             rejectButtonProps: {
                label: 'Cancel',
                severity: 'secondary',
                outlined: true,
            },
            accept: () => {
                this.DataChange.emit({name:'change status' , order : order , index : index ,status : {status : 'delivered'}  })

            }
        });
    }
    pendOrder(order){
         this.confirmationService.confirm({
            message: 'Are you sure the order pending ' + (order.doctor_name ?? order.name)  + '?',
            header: 'Confirm',
             icon: 'pi pi-exclamation-circle orange',
             acceptButtonProps: {
                label: 'confirm',
                severity: 'warn',
            },
             rejectButtonProps: {
                label: 'Cancel',
                severity: 'secondary',
                outlined: true,
            },
            accept: () => {
                this.DataChange.emit({name:'change status' , order : order ,status : {status : 'preparing'} })

            }
        });
    }
    cancelOrder(order , index){
         this.confirmationService.confirm({
            message: 'Are you sure you want to reject order ' + (order.doctor_name ?? order.name) + '?',
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
                this.DataChange.emit({name:'change status' , order : order ,index : index ,status : {status : 'rejected'}})

            }
        });
    }
     buy(product ,index){
         this.DataChange.emit({name : "buy" , product : product , index : index})
    }
    markAsFavorite(product ,index){
         this.DataChange.emit({name : "favorite" , product : product , index : index})
    }

}
