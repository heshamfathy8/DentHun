import { DoctorService } from './../../services/doctor.service';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TableModule } from 'primeng/table';
import { PaymentsComponent } from "../payments/payments.component";
import { OrdersComponent } from "../orders/orders.component";
import { CrudComponent } from '@shared/pages/crud/crud.component';


@Component({
  selector: 'app-doctor-details',
  imports: [TableModule, CommonModule, PaymentsComponent, OrdersComponent],
  templateUrl: './doctor-details.component.html',
  styleUrl: './doctor-details.component.scss'
})
export class DoctorDetailsComponent {

  route = inject(ActivatedRoute)
  doctorService = inject(DoctorService)
  filter
  id
  doctor
  orders =[]
  payments =[]

constructor() {
 this.route.paramMap.subscribe(params => {
    this.id = params.get('id');
      this.filter = { id: this.id };
      console.log('✅ Filter set:', this.filter);
  });
}
ngOnInit() {
 this.loadData(this.id)
}
 
  loadData(id){
    this.doctorService.getDoctorDetails(id).subscribe(res =>{
      this.doctor = res['data'].doctor
    })
  }


}
