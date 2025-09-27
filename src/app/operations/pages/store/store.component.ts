import { Component, inject, signal, ViewChild } from '@angular/core';
import { ProductService } from '@login/services/product.service';
import { SupplierService } from '@operations/services/supplier.service';
import { CrudComponent } from '@shared/pages/crud/crud.component';
import { MessageService } from 'primeng/api';
import { BehaviorSubject, debounceTime, distinctUntilChanged, Subject, switchMap } from 'rxjs';
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
 
cols;

@ViewChild('Crud') crud!: CrudComponent;

 ngOnInit() {
  this.loadData();
  this.getCategories()
 this.search()


}

 
check(val){
  console.log(typeof val);

}
bigflat(bigarray :any[]){
  let newArray = []

  function flat(arr:any){
  if (Array.isArray(arr)) {
    arr.forEach(item => {
          flat(item)
    });
  }
  else{
    newArray.push(arr)
  }
    
  }
  flat(bigarray)
  return newArray
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
        this.saveProduct({...event.product,imageURL :event.imageURL})
        break;

      case 'update':
        console.log(event.product);
        this.updateProduct(event.product,event.id,event.imageURL)
        break;

      case 'paginate':
        console.log(event.page.first);
        this.loadData(event.page.first)
        break;

      case 'search':
        console.log(event.word);
         this.searchWord.next(event.word)
        break;
    
      default:
        break;
    }



  })
}
loadData(page = 1){
    this.supplierService.getProducts(page).subscribe((res) => {
        this.products.set( res['data']);
    });

    this.cols = [
                { field: 'name', header: 'Name' },
                { field: '', header: 'Image' },
                { field: '', header: 'Description' },
                { field: 'price', header: 'Price' },
                { field: 'quantity', header: 'Quantity' },
                { field: 'category', header: 'Category' },
                { field: 'rating', header: 'Reviews' },
                { field: 'inventoryStatus', header: 'Status' },
            ];
}
getCategories(){
    this.supplierService.getCategories().subscribe((res) => {
        this.categories =res['data']
    });

   
}


updateProduct(form,id,imageURL){
   console.log(form);
 
   
   if (!(form.img instanceof File)) {
     delete form.img
   } 
  let formData = this.productService.toFormData(form)
  
  this.supplierService.updateProduct(formData,id).subscribe(res=>{
    form.img = imageURL
    form.category_name = this.categories.find(item => item.id == form.category_id).name
   this.products.update(arr => {
      return arr.map(item => item.id === id ? form : item)
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
    debounceTime(2000),          // تمنع ال search من إرسال طلبات كثيرة بسرعة
    distinctUntilChanged(),     // لو نفس القيمة، متعملش request تاني
    switchMap((word) =>  this.supplierService.search(word))
  )
  .subscribe(res=>{
     this.products.set( res['data']);
   })
   
}




}
