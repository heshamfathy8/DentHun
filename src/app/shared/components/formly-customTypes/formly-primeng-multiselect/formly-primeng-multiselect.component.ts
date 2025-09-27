import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { FieldType, FormlyModule } from '@ngx-formly/core';
import { MultiSelectModule } from 'primeng/multiselect';
import { isObservable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-formly-primeng-multiselect',
  imports: [MultiSelectModule,ReactiveFormsModule,CommonModule, FormlyModule,],
  templateUrl: './formly-primeng-multiselect.component.html',
  styleUrl: './formly-primeng-multiselect.component.scss'
})
export class FormlyPrimengMultiselectComponent extends FieldType{

     get options$() {
    const opts = this.to['options'];
    if (Array.isArray(opts)) {
      return of(opts);
    } else if (opts && typeof opts.subscribe === 'function') {
      // it's an Observable
      return opts.pipe(map((v: any[] | null | undefined) => v ?? []));
    }
    return of([]);
  }
}
