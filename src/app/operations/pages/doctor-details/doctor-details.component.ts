import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';


@Component({
  selector: 'app-doctor-details',
  imports: [TableModule,CommonModule],
  templateUrl: './doctor-details.component.html',
  styleUrl: './doctor-details.component.scss'
})
export class DoctorDetailsComponent {
products = [
  {
    name : "hesham",
    payment : "12000",
    date : "5-8-2025",
    city : "cairo",
    address : "5th salah-selem",
    phone : "01052484965",
  },
  {
    name : "hesham",
    payment : "12000",
    date : "5-8-2025",
    city : "cairo",
    address : "5th salah-selem",
    phone : "01052484965",
  },
  {
    name : "hesham",
    payment : "12000",
    date : "5-8-2025",
    city : "cairo",
    address : "5th salah-selem",
    phone : "01052484965",
  },
  {
    name : "hesham",
    payment : "12000",
    date : "5-8-2025",
    city : "cairo",
    address : "5th salah-selem",
    phone : "01052484965",
  },

 
]
}
