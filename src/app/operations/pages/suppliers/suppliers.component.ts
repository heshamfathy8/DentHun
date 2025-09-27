import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-suppliers',
  imports: [TableModule,CommonModule,RouterModule],
  templateUrl: './suppliers.component.html',
  styleUrl: './suppliers.component.scss'
})
export class SuppliersComponent {
products = [
  {
    name : "hesham",
    total : "12000",
    phone : "01000000000",
    address : "portfouad -4thSettlements",
    city : "cairo",

  },
  {
    name : "hesham",
    total : "12000",
    phone : "01000000000",
    address : "portfouad -4thSettlements",
    city : "cairo",

  },
  {
    name : "hesham",
    total : "12000",
    phone : "01000000000",
    address : "portfouad -4thSettlements",
    city : "cairo",

  },
  {
    name : "hesham",
    total : "12000",
    phone : "01000000000",
    address : "portfouad -4thSettlements",
    city : "cairo",

  },
  
]
}


