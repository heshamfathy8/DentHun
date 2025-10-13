import { ImageModule } from 'primeng/image';
import { Component, inject, ViewChild } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormlyFieldConfig, FormlyModule } from '@ngx-formly/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { EditTableComponent } from "@shared/pages/edit-table/edit-table.component";
import { TableModule, TableRowCollapseEvent, TableRowExpandEvent } from "primeng/table";
import { Toast } from "primeng/toast";
import { TagModule } from "primeng/tag";
import { CommonModule } from '@angular/common';
import { Product, ProductService } from '@login/services/product.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { SupplierService } from '@operations/services/supplier.service';
import { DomSanitizer } from '@angular/platform-browser';
import { ConfirmDialogModule } from "primeng/confirmdialog";

@Component({
  selector: 'app-receipts',
  imports: [InputTextModule, ButtonModule, FormsModule, FormlyModule, ReactiveFormsModule, TranslateModule, EditTableComponent, TableModule, Toast, TagModule, CommonModule, ConfirmDialogModule],
  templateUrl: './receipts.component.html',
  styleUrl: './receipts.component.scss'
})
export class ReceiptsComponent {

  products!: any[];

  expandedRows = {};

  supplierService = inject(SupplierService)
  count: any = 0
  Total = 0

  @ViewChild('editTable') editTable!: EditTableComponent;
  

  constructor(private translate: TranslateService, private productService: ProductService, private messageService: MessageService , private sanitizer: DomSanitizer ,private confirmationService: ConfirmationService) {

    this.translate.onLangChange.subscribe(() => this.initFields());
  }


  ngOnInit() {
  //  this.loadData()
    this.initFields();
   
  }
 DataChange(event , index){
    switch (event.name) {
      case 'delete':
        console.log(event.product);
        this.deleteReceit(event.receit,event.index ,index)
        break;

      // case 'save':
      //   console.log(event.product);
      //   this.saveProduct({...event.product})
      //   break;

      case 'update':
        console.log(event.receit);
        this.updateReceit(event.receit ,index)
        break;

      // case 'paginate':
      //   console.log(event.page);
      //   this.loadData(event.page)
      //   break;

      // case 'search':
      //   console.log(event.search);
      //    this.searchWord.next(event.search)
      //   break;

      // case 'exportCSV':
      //   console.log(event.name);
      //   this.exportCSV()
      //   break;
    
      default:
        break;
    }
}

  expandAll() {
    this.expandedRows = this.products.reduce((acc, p) => (acc[p.date] = true) && acc, {});
  }

  collapseAll() {
    this.expandedRows = {};
  }

 
convertImg(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = (e: any) => resolve(e.target.result);
    reader.onerror = (err) => reject(err);
  });
}
getObjectURL(file: File) {
  return this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(file));
}
  createReceits(){
   let formValue = this.productService.toFormData(this.form.getRawValue())
   this.supplierService.addReceit(formValue).subscribe(res =>{
      this.products = res['data']
      console.log(this.products );
      this.form.reset()
      this.model = { receipts:
           [{
               name: '', price: 0, img: '',date:  new Date().toLocaleDateString().replace(/\//g, '-')
           }] 
          };
      this.messageService.add({ severity: 'success', summary: 'Receipt Created', detail: 'Receipts created successfully', life: 3000 });
   })
  }
  deleteReceit(receit,i,index){
     this.supplierService.deleteReceipt(receit.id).subscribe(res =>{
       this.products[index].receipts.splice(i , 1)
        this.products[index].total_price = +this.products[index].total_price - +receit.price 
      })
  }
  updateReceit(receit , index){
    let newReceit = structuredClone(receit)
    newReceit.img = receit.image
    delete receit.image
    delete newReceit.image
    let cloneTotal = this.products[index].total_price
    this.products[index].total_price = +this.products[index].total_price + +receit.price - +this.editTable.clonedProducts[receit.id as string].price
    let form = this.productService.toFormData(newReceit)
    this.supplierService.updateReceipt(form,receit.id).subscribe({

      error : ()=>{
        Object.assign(receit,  this.editTable.clonedProducts[receit.id as string])
        this.products[index].total_price =cloneTotal
      },
      complete : ()=>{
        delete this.editTable.clonedProducts[receit.id as string];
      }
    })
  }

  deleteGroupReceit(index ,date){
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete the month receipts ?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
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
                let data = {
                            date: date
                           }
               this.supplierService.deleteGroupReceit(data).subscribe(res =>{
                    this.products.splice(index , 1)
                })
            }
        });
  }

  onRowExpand(event: TableRowExpandEvent) {
    this.messageService.add({ severity: 'info', summary: 'Product Expanded', detail: event.data.name, life: 3000 });
  }

  onRowCollapse(event: TableRowCollapseEvent) {
    this.messageService.add({ severity: 'success', summary: 'Product Collapsed', detail: event.data.name, life: 3000 });
  }

  totalRecords: number;
  loadData(page = 0) {
     this.supplierService.getٌReceits(page +1).subscribe((res: any) => {
      console.log(res['data']);
      this.products = res['data'];
      this.totalRecords = res.meta.total
    });
  }
  // openNew() {
  //   throw new Error('Method not implemented.');
  // }

  // deleteOrder(_t78: any, _t79: any, _t80?: any) {
  //   throw new Error('Method not implemented.');
  // }
  // acceptOrder(_t78: any, _t79: any) {
  //   throw new Error('Method not implemented.');
  // }
  // pendOrder(_t78: any) {
  //   throw new Error('Method not implemented.');
  // }
  // cancelOrder(_t78: any, _t79: any) {
  //   throw new Error('Method not implemented.');
  // }
  // editProduct(_t147: any, _t129: any) {
  //   throw new Error('Method not implemented.');
  // }
  getTotalValue() {
    let sum = 0
    
    this.form.value['receipts'].forEach(val => {
      console.log(val.price);
      sum += Number(val.price)
    });
    this.Total = sum
  }

  fields: FormlyFieldConfig[] = [];
  form = new FormGroup({});
  model = { receipts:
           [{
               name: '', price: 0, img: '',date:  new Date().toLocaleDateString('en-GB').replace(/\//g, '-')
           }] 
          };

  initFields() {
    this.fields = [
      {
        fieldGroupClassName: 'grid grid-cols-12',
        fieldGroup: [

          {
            key: 'receipts',
            type: 'repeat', // custom type for FormArray (explained below)
            className: 'col-span-12 ',
             props: {
              addText: 'Add Receit',
              showBtns : true,
              onRemove: (i: number) => {this.getTotalValue()}
            },
            fieldArray: {
              fieldGroupClassName: 'col-span-12 grid grid-cols-12 gap-4 my-[20px]',
              fieldGroup: [
                {
                  key: 'name',
                  type: 'floatlabel-large',
                  className: 'col-span-12 md:col-span-3 px-1 my-1',
                  templateOptions: {
                    label: 'Name',
                    required: true,
                    type: 'text',
                  },
                  validation: {
                    messages: {
                      required: () => 'Name Is Required',
                    },
                  },
                },
                {
                  key: 'price',
                  type: 'floatlabel-large',
                   defaultValue: 0,  
                  className: 'col-span-12 md:col-span-3 px-1 my-1',
                  templateOptions: {
                    label: 'price',
                    value: 0,
                    required: true,
                    type: 'number',
                     change: (field) => {
                      this.getTotalValue()
                    }
                  },
                  validation: {
                    messages: {
                      required: () => 'Name Is Required',
                    },
                  },
                },
                {
                  key: 'date',
                  type: 'floatlabel-datepicker',
                  className: 'col-span-12 md:col-span-3 px-1 my-1',
                  defaultValue : new Date().toLocaleDateString('en-GB').replace(/\//g, '-'),
                  templateOptions: {
                    label: 'Date',
                    required: true,
                    dateFormat: 'dd-mm-yy',
                    dataType: 'string',
                  },
                },
                {
                  key: 'img',
                  type: 'custom-file',
                   defaultValue: null,
                  className: 'w-full md:col-span-3 px-1  mt-3',
                  templateOptions: {
                    mode: 'basic',
                    multiple: true,
                    required: true
                  },
  //                 hooks: {
  //   onInit: (field:any) => {
  //     field.formControl.valueChanges.subscribe(val => {
  //       console.log(val);
  //       console.log(field);
        
  //       if (!val) {
  //         // لو القيمة Null (يعني reset)
  //         console.log('heshaaaaaaaaaam');
  //         console.log(field.formlyComponent);
          
  //         field.formlyComponent?.fileUploader?.clear();
  //       }
  //     });
  //   }
  // }
                },
              ]
            }
          },

        ]


      },

    ];
  }

}
