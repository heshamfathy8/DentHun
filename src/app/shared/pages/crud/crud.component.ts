import { CommonModule, formatCurrency, formatDate } from '@angular/common';
import { Component, EventEmitter, Injectable, Input, input, Output, Signal, signal, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductService, Product } from '@login/services/product.service';
import { MessageService, ConfirmationService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { RadioButtonModule } from 'primeng/radiobutton';
import { RippleModule } from 'primeng/ripple';
import { SelectModule } from 'primeng/select';
import { Table, TableModule } from 'primeng/table';
import { TextareaModule } from 'primeng/textarea';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { RatingModule } from 'primeng/rating';
import { DialogModule } from 'primeng/dialog';
import { TagModule } from 'primeng/tag';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { FileUpload } from 'primeng/fileupload';

interface Column {
    field: string;
    header: string;
    customExportHeader?: string;
}

interface ExportColumn {
    title: string;
    dataKey: string;
}

@Component({
  selector: 'app-crud',
  imports: [
        CommonModule,
        TableModule,
        FormsModule,
        ButtonModule,
        RippleModule,
        ToastModule,
        ToolbarModule,
        RatingModule,
        InputTextModule,
        TextareaModule,
        SelectModule,
        RadioButtonModule,
        InputNumberModule,
        DialogModule,
        TagModule,
        InputIconModule,
        IconFieldModule,
        SelectModule,
        ConfirmDialogModule,
        FileUpload
    ],
  templateUrl: './crud.component.html',
  styleUrl: './crud.component.scss',
   providers: [MessageService, ProductService, ConfirmationService]
})
export class CrudComponent {
productDialog: boolean = false;
selectedCountry
 countries = [
            { name: 'Australia', code: 'AU' },
            { name: 'Brazil', code: 'BR' },
            { name: 'China', code: 'CN' },
            { name: 'Egypt', code: 'EG' },
            { name: 'France', code: 'FR' },
            { name: 'Germany', code: 'DE' },
            { name: 'India', code: 'IN' },
            { name: 'Japan', code: 'JP' },
            { name: 'Spain', code: 'ES' },
            { name: 'United States', code: 'US' }
        ];

    @Input() products: any = signal([])
    @Input() Add: any
    @Input() Check: any
    @Input() Pending: any
    @Input() view: any
    @Input() Header: any
    @Input() Delete: any
    @Input() Update: any
    @Input() cols!: any[];
    @Input() confirm!: any;
    @Input() category!: any;
    @Input() categories!: any[];
    @Output() DataChange = new EventEmitter<any>();
    @Output() viewDetails = new EventEmitter<any>();

    product!: any;

    selectedProducts!: Product[] | null;

    submitted: boolean = false;

    statuses!: any[];

    imageURL

    @ViewChild('dt') dt!: Table;

    exportColumns!: ExportColumn[];

    form = new FormData()

    isEdit

    constructor(
        private messageService: MessageService,
        private confirmationService: ConfirmationService
    ) {}

    exportCSV() {
        this.dt.exportCSV();
      }
      ngOnInit(){
        this.loadDemoData()
    }

       loadDemoData() {

        this.statuses = [
            { label: 'INSTOCK', value: 'instock' },
            { label: 'LOWSTOCK', value: 'lowstock' },
            { label: 'OUTOFSTOCK', value: 'outofstock' }
        ];



        this.exportColumns = this.cols.map((col) => ({ title: col.header, dataKey: col.field }));
    }

    onGlobalFilter(table: Table, event: Event) {

        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
         this.DataChange.emit({name:'search', word: (event.target as HTMLInputElement).value })
    }
    route(e){
        this.viewDetails.emit(e)
    }

    openNew() {
        this.isEdit = false
        this.product = {};
        this.submitted = false;
        this.productDialog = true;
    }

    editProduct(product: Product,id) {
        this.isEdit = true
        this.imageURL = product['img']
        this.product = { ...product };
        this.productDialog = true;
        
        
    }

    deleteSelectedProducts() {
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete the selected products?',
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
                this.DataChange.emit({name:'delete',product: this.selectedProducts})
             
                this.selectedProducts = null;
            }
        });
    }

    hideDialog() {
        this.productDialog = false;
        this.submitted = false;
    }

    deleteProduct(product: Product) {
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete ' + product.name + '?',
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
                this.DataChange.emit({name:'delete',product: product})
            }
        });
    }
   

    findIndexById(id: string): number {
        let index = -1;
        for (let i = 0; i < this.products().length; i++) {
            if (this.products()[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    }

    createId(): string {
        let id = '';
        var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (var i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
    }

    getSeverity(status: string) {
        switch (status) {
            case 'INSTOCK':
                return 'success';
            case 'LOWSTOCK':
                return 'warn';
            case 'OUTOFSTOCK':
                return 'danger';
            default:
                return 'info';
        }
    }
    loadPage(page){
        console.log(page);
        this.DataChange.emit({name:'paginate',page: page})
    }
    // saveProduct() {
    //     this.submitted = true;
    //     let _products = this.products();
    //     if (this.product.name?.trim()) {
    //         if (this.product.id) {
    //             _products[this.findIndexById(this.product.id)] = this.product;
    //              this.DataChange.emit({name:'update',product: this.product})
    //             this.products.set([..._products]);
    //             this.messageService.add({
    //                 severity: 'success',
    //                 summary: 'Successful',
    //                 detail: 'Product Updated',
    //                 life: 3000
    //             });
    //         } else {
    //             this.product.id = this.createId();
    //              this.DataChange.emit({name:'add',product: this.product})
    //             this.product.image = 'product-placeholder.svg';
    //             this.messageService.add({
    //                 severity: 'success',
    //                 summary: 'Successful',
    //                 detail: 'Product Created',
    //                 life: 3000
    //             });
    //             this.products.set([..._products, this.product]);
    //         }
           
    //         this.productDialog = false;
    //         this.product = {};
    //     }
    // }
    saveProduct() {
        this.isEdit ?
          this.DataChange.emit({name:'update',product: this.product, id : this.product.id , imageURL : this.imageURL})
        : this.DataChange.emit({name:'save',product: this.product , imageURL : this.imageURL});

        this.productDialog = false
    }
 firstLetterUppercase(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
trackByIndex(index: number, item: string): number {
  return index;
}
onUpload(event){
    console.log(event?.currentFiles[0]);
     const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imageURL = e.target.result; // preview uploaded image
      };
      reader.readAsDataURL(event?.currentFiles[0]);
    this.product.img = event?.currentFiles[0]
}

}
