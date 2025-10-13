import { SupplierService } from './../../services/supplier.service';
import { Component, inject, Input, signal, ViewChild } from '@angular/core';
import { CrudComponent } from '@shared/pages/crud/crud.component';
import { AuthService } from 'app/core/services/auth.service';
import { MessageService } from 'primeng/api';
import { debounceTime, Subject, switchMap } from 'rxjs';


@Component({
  selector: 'app-payments',
  imports: [
           CrudComponent
        ],
  templateUrl: './payments.component.html',
  styleUrl: './payments.component.scss'
})
export class PaymentsComponent {
  private readonly supplierService = inject(SupplierService)
  private readonly messageService = inject(MessageService)
  private readonly authService = inject(AuthService)

 products = signal([])
 searchWord = new Subject()
  @Input() filter: any
   role =  this.authService.userRole
   totalRecords
 doctors
  cols;

@ViewChild('Crud') crud!: CrudComponent;
 ngOnInit() {
   console.log('paymennnnnnnnnnnt');
  console.log(this.filter);
  
  this.setColumns()
  this.getDoctors()
   this.search()
    
}
DataChange(event){
     switch (event.name) {
      case 'delete':
        console.log(event.product);
        this.deleteProduct(event.product , event.index)
        break;

      case 'save':
        console.log(event.product);
        this.savePayment(event.product)
        break;

      case 'update':
        console.log(event.product);
        this.updatePayment(event.product)
        break;

      case 'paginate':
        console.log(event.filter);
        this.loadData(event.filter)
        break;

      case 'search':
        console.log(event.filter);
         this.searchWord.next( event.filter)
        break;

      case 'exportCSV':
        console.log(event.name);
        this.exportCSV()
        break;
    
      default:
        break;
    }

}
getDoctors(){
  this.doctors =[
    {name : 'hesham' , id : 1},
    {name : 'hesham' , id : 2},
    {name : 'hesham' , id : 3},
  ]
  //  this.supplierService.getPayments(page).subscribe((res) => {
  //       this.products.set(res['data']);
  //   });
}
setColumns(){
  this.cols = [
      { field: 'name', header: 'Name' },
      { field: 'paid', header: 'Payment' },
      { field: 'date', header: 'Date' },
      { field: 'remaining', header: 'Remaining' },
   ];
}
loadData(filter){
    this.filter = {...this.filter , ...filter}
    this.supplierService.getPayments(this.filter).subscribe((res) => {
        this.products.set(res['data']);
        this.totalRecords = res['meta'].total
    });
  }
savePayment(product){
  this.supplierService.addPayments(product).subscribe((res) => {
      this.products().unshift(res['data']) ;
      this.crud.productDialog = false
      this.messageService.add({ severity: 'success', summary: 'Product Created', detail: 'Payment Added Successfully', life: 3000 });
  });
}
updatePayment(product){
   this.supplierService.updatePayment(product).subscribe((res) => {
      this.products().splice(product.index ,1)
      this.messageService.add({ severity: 'success', summary: 'Product Updated', detail: 'Payment transfered for confirmation', life: 3000 });
        this.crud.productDialog = false
  });
}

deleteProduct(payment , index){
  this.supplierService.deletePayment(payment.id).subscribe((res) => {
   this.products().splice(index ,1)
      this.messageService.add({ severity: 'success', summary: 'Product Updated', detail: 'Payment transfered for confirmation', life: 3000 });
        this.crud.productDialog = false
  });
}

search(){
  this.searchWord.pipe(
    debounceTime(500),
    // distinctUntilChanged(),
    switchMap((val) =>  this.supplierService.getPayments(this.changeFormat(val))),
  )
  .subscribe(res=>{
      this.products.set(res['data']);
      this.totalRecords = res['meta'].total;
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

exportCSV(){
  this.supplierService.paymentExportCSV().subscribe((res: Blob) => {
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

}
