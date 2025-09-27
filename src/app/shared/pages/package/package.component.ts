import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { ProductService } from '@login/services/product.service';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { RatingModule } from 'primeng/rating';
import { TableModule, TableRowExpandEvent, TableRowCollapseEvent } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-package',
  imports: [TableModule, TagModule, ToastModule, RatingModule, ButtonModule, CommonModule],
  providers: [ProductService, MessageService],
  templateUrl: './package.component.html',
  styleUrl: './package.component.scss'
})
export class PackageComponent {

    @Input() products: any 
    @Input() Add: any
    @Input() Pending: any
    @Input() Delete: any
    @Input() Update: any
    @Input() cols!: any[];
    @Input() confirm!: any;
    @Input() Buy: any;
    @Output() DataChange = new EventEmitter<any>();


    expandedRows = {};
  product: any;
  productDialog: boolean;

    constructor(private productService: ProductService, private messageService: MessageService) {}

    ngOnInit() {
        this.productService.getProductsWithOrdersSmall().then((data) => (this.products = data));
    }

    expandAll() {
        this.expandedRows = this.products.reduce((acc, p) => (acc[p.id] = true) && acc, {});
    }

    collapseAll() {
        this.expandedRows = {};
    }

    getSeverity(status: string) {
        switch (status) {
            case 'INSTOCK':
                return 'success';
            case 'LOWSTOCK':
                return 'warn';
            case 'OUTOFSTOCK':
                return 'danger';
        }
    }

    getStatusSeverity(status: string) {
        switch (status) {
            case 'PENDING':
                return 'warn';
            case 'DELIVERED':
                return 'success';
            case 'CANCELLED':
                return 'danger';
        }
    }

    onRowExpand(event: TableRowExpandEvent) {
        this.messageService.add({ severity: 'info', summary: 'Product Expanded', detail: event.data.name, life: 3000 });
    }

    onRowCollapse(event: TableRowCollapseEvent) {
        this.messageService.add({ severity: 'success', summary: 'Product Collapsed', detail: event.data.name, life: 3000 });
    }
    deleteProduct(product){}
    openNew(){}
    
    editProduct(product: any) {
        this.product = { ...product };
        this.productDialog = true;
        
    }
}
