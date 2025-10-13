import { CommonModule } from '@angular/common';
import { Component, EventEmitter, input, Input, Output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductService, Product } from '@login/services/product.service';
import { ConfirmationService, MessageService, SelectItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { FileUploadModule } from "primeng/fileupload";
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-edit-table',
  standalone: true,
  imports: [TableModule, ToastModule, CommonModule, TagModule, SelectModule, ButtonModule, InputTextModule, FormsModule, FileUploadModule],
  providers: [MessageService, ProductService],
  templateUrl: './edit-table.component.html',
  styleUrl: './edit-table.component.scss'
})
export class EditTableComponent {
  receits = input([])
  @Output() DataChange = new EventEmitter<any>();
  statuses!: SelectItem[];

  clonedProducts: { [s: string]: Product } = {};
  editingRowKeys: { [key: string]: boolean } = {};

  constructor(private productService: ProductService, private messageService: MessageService
    , private sanitizer: DomSanitizer, private confirmationService: ConfirmationService) { }

  ngOnInit() {
    console.log(this.receits());
  }

  onRowEditInit(product: Product) {
    this.clonedProducts[product.id as string] = { ...product };
  }

  onRowEditSave(receit: Product) {
    if (receit.price > 0) {
      // delete this.clonedProducts[product.id as string];
       this.DataChange.emit({name : "update" , receit : receit})
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Receit is updated' });
    } else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Invalid Price' });
    }
  }
  onDelete(receit ,index) {
    this.confirmationService.confirm({
            message: 'Are you sure you want to delete the receit ?',
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
               this.DataChange.emit({name : "delete" , receit : receit , index : index})
            }
        });
  }
  getObjectURL(file: File) {
    return this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(file));
  }
  onRowEditCancel(product: any, index: number) {
    console.log(product);

      this.receits()[index] = this.clonedProducts[product.id as string];
      delete this.clonedProducts[product.id as string];
  }
  selectImages(event, receit) {
    let files = event.currentFiles
    files.forEach(file => {
      receit.img = this.getObjectURL(file)
      receit.image = file
    });
    console.log(receit.img);
  }
}

// generateId() {
//   return Math.random().toString(36).substring(2, 9);
// }
// onAdd() {
//   const newProduct = {
//     id: this.generateId(),
//     code: '',
//     name: '',
//     inventoryStatus: null,
//     price: null,
//     isNew: true   // 👈 علامة انه جديد
//   };

//  this.receits().push(newProduct)
//   this.editingRowKeys = { [newProduct.id]: true }; // فتحه مباشرة في وضع التعديل
// }