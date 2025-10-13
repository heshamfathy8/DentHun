import { ProductService } from '@login/services/product.service';
import { Component, inject, signal } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { FileUploadModule } from 'primeng/fileupload';
import { CommonModule } from '@angular/common';
import { CheckboxModule } from 'primeng/checkbox';
import { CalendarModule } from 'primeng/calendar';
import { DatePickerModule } from 'primeng/datepicker';
import { SupplierService } from '@operations/services/supplier.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-profile',
 imports: [
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    CardModule,
    FileUploadModule,
    CommonModule,
     CheckboxModule,
    DatePickerModule 
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {

  supplierService = inject(SupplierService)
  messageService = inject(MessageService)
  ProductService = inject(ProductService)
  
  avatarUrl = 'https://cdn1.iconfinder.com/data/icons/avatar-3/512/Doctor-512.png';
  profileForm : FormGroup
  daysList = [
    'Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'
  ];

  ngOnInit(){
    this.initForm()
    this.loadData()
  }

  initForm(){
    this.profileForm = new FormGroup({
      fullName: new FormControl(''),
      email: new FormControl(''),
      phone: new FormControl(''),
      address: new FormControl(''),
      schedule: new FormArray(this.initDays()),
    });
  }

  loadData(){
    this.supplierService.getCategories().subscribe(res=>{
      console.log(res);
      this.profileForm.patchValue(res['data'])
    })
  }

  initDays() {
    return this.daysList?.map(day =>
      new FormGroup({
        name: new FormControl(day),
        active: new FormControl(false),
        from: new FormControl({value:null ,disabled:true}),
        to: new FormControl({value:null ,disabled:true}),
      })
    );
  }

  get scheduleArray(): FormArray {
    return this.profileForm.get('schedule') as FormArray;
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = e => (this.avatarUrl = reader.result as string);
      reader.readAsDataURL(file);
    }
  }
 toggleDay(index: number) {
    const group = this.scheduleArray.at(index) as FormGroup;
    const active = group.get('active')?.value;

    if (active) {
      group.get('from')?.enable({ emitEvent: false });
      group.get('to')?.enable({ emitEvent: false });
    } else {
      group.get('from')?.disable({ emitEvent: false });
      group.get('to')?.disable({ emitEvent: false });
    }
  }
  saveSchedule() {
    console.log('Schedule:', this.scheduleArray.value);
  }

  onSubmit() {
    let form  = this.ProductService.toFormData(this.profileForm.getRawValue())
   this.supplierService.search(form).subscribe(res=>{
      console.log(res);
       this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Changes Saved Successfully',
          life: 3000
    });
    })
  }
}
