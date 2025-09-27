import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TableModule } from 'primeng/table';
@Component({
  selector: 'app-doctors',
  imports: [TableModule,CommonModule,RouterModule],
  templateUrl: './doctors.component.html',
  styleUrl: './doctors.component.scss'
})
export class DoctorsComponent {
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
