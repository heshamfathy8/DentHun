import { Component } from '@angular/core';
import { FieldType, FormlyAttributes } from '@ngx-formly/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';
import { DatePickerModule } from 'primeng/datepicker';

@Component({
  selector: 'formly-field-floatlabel-datepicker',
  imports: [CommonModule, ReactiveFormsModule, DatePickerModule, FloatLabelModule,FormlyAttributes],
  template: `
  <p-floatlabel variant="in" class="w-full">
  <p-datepicker
    [inputId]="id"
    [formControl]="formControlTyped"
    [formlyAttributes]="field"
    [dateFormat]="to['dateFormat'] || 'dd/mm/yy'"  
    [showIcon]="true"
    [dataType]="to['dataType']"
    iconDisplay="input"
    [showButtonBar]="true"
    class="w-full"
    appendTo="body"
  ></p-datepicker>
  <label [for]="id">{{ to.label }}</label>
</p-floatlabel>
  `,
})
export class FloatlabelDatepickerTypeComponent extends FieldType {
     get formControlTyped(): FormControl {
    return this.formControl as FormControl;
  }
}
