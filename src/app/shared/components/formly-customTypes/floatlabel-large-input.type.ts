import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { FieldType, FormlyModule } from '@ngx-formly/core';
import { MultiSelectModule } from 'primeng/multiselect';
import { isObservable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';


@Component({
  selector: 'formly-field-floatlabel-large-input',
 imports: [
    CommonModule,
    ReactiveFormsModule,
    FloatLabelModule,
    InputTextModule,
    FormlyModule,
  ],
  template: `
    <p-floatlabel variant="in">
      <input
        pInputText
        class="p-inputtext-lg w-full"
        [type]="to.type || 'text'"
        [formControl]="formControlTyped"
        [formlyAttributes]="field"
        [id]="id"
        autocomplete="off"
      />
      <label [for]="id">{{ to.label }}</label>
    </p-floatlabel>
  `,
})
export class FloatLabelLargeInputComponent extends FieldType {

    get formControlTyped(): FormControl {
    return this.formControl as FormControl;
  }
}
