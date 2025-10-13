import { Component, inject, Signal, signal, ViewChild } from '@angular/core';
import { ProductService } from '@login/services/product.service';
import { SupplierService } from '@operations/services/supplier.service';
import { CrudComponent } from '@shared/pages/crud/crud.component';
import { MessageService } from 'primeng/api';
import {  distinctUntilChanged, Subject, switchMap } from 'rxjs';
import _ from "lodash";

@Component({
  selector: 'app-store',
   standalone: true,
    imports: [
       CrudComponent
    ],
  templateUrl: './store.component.html',
  styleUrl: './store.component.scss',
})
export class StoreComponent {

 productService = inject(ProductService)
 supplierService = inject(SupplierService)
 message = inject(MessageService)
 searchWord = new Subject()
 products = signal([])
 categories :any[]
 totalRecords = signal(0)
cols;

@ViewChild('Crud') crud!: CrudComponent;

 ngOnInit() {
  this.loadData({page:1});
  this.getCategories()
 this.search()


}

 




ngAfterViewInit(){
  this.crud.DataChange.subscribe(event=>{
    switch (event.name) {
      case 'delete':
        console.log(event.product);
        this.deleteProduct(event.product)
        break;

      case 'save':
        console.log(event.product);
        this.saveProduct({...event.product})
        break;

      case 'update':
        console.log(event.product);
        this.updateProduct(event.product,event.id)
        break;

      case 'paginate':
        console.log(event.filter);
        this.loadData(event.filter)
        break;

      case 'search':
        console.log(event.filter);
         this.searchWord.next(event.filter)
        break;

      case 'exportCSV':
        console.log(event.name);
        this.exportCSV()
        break;
    
      default:
        break;
    }
  })
}
loadData(filter){
    this.supplierService.getProducts(filter).subscribe((res:any) => {
        this.products.set( res['data']);
        this.totalRecords.set(res.meta.total)
        console.log(this.totalRecords());
        
    });

    this.cols = [
                { field: 'name', header: 'Name' },
                { field: '', header: 'Image' },
                { field: '', header: 'Description' },
                { field: 'price', header: 'Price' },
                { field: 'quantity', header: 'Quantity' },
                { field: 'category_name', header: 'Category' },
                { field: 'rating', header: 'Reviews' },
                { field: 'status', header: 'Status' },
            ];
}
getCategories(){
    this.supplierService.getCategories().subscribe((res) => {
        this.categories =res['data']
    });

   
}
exportCSV(){
  this.supplierService.storeExportCSV().subscribe((res: Blob) => {
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

updateProduct(form,id){
   console.log(form);
   
   if (!(form.img instanceof File)) {
     delete form.img
   } 
  let formData = this.productService.toFormData(form)
  
  this.supplierService.updateProduct(formData,id).subscribe(res=>{
    // form.category_name = this.categories.find(item => item.id == form.category_id).name
   this.products.update(arr => {
     let i =arr.findIndex(item => item.id === id)
     arr[i] = res['data']
      return arr
    })
    
    this.crud.productDialog = false
    this.message.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Product updated successfully!'
        });
  })
    
}
saveProduct(form){
  console.log(form);
  let formData = this.productService.toFormData(form)
  formData.delete('imageURL')

  this.supplierService.addProduct(formData).subscribe(res=>{
    this.crud.productDialog = false
    form = res['data']
    console.log(form);
    this.products.update((val:any) => [ form , ...val]  )
    this.message.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Product added successfully!'
        });
  })
    
}
deleteProduct(selectedProducts){
  
  selectedProducts = [].concat(selectedProducts)
  let ids = selectedProducts.map(val => val.id)
  this.supplierService.deleteProduct(ids).subscribe(res=>{
    
     this.products.set(this.products().filter((val) => !ids?.includes(val.id)));
    this.message.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Product deleted successfully!'
        });
  })
}

search(){
  this.searchWord.pipe(
    switchMap((val) =>  this.supplierService.getProducts(val))
  )
  .subscribe(res=>{
     this.products.set( res['data']);
      this.totalRecords.set(res['meta'].total)
   })
}




}
