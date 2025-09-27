import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FieldArrayType, FormlyModule } from '@ngx-formly/core';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-repeat-type',
  imports: [ReactiveFormsModule,CommonModule, FormlyModule,MatIconModule],
  templateUrl: './repeat-type.component.html',
  styleUrl: './repeat-type.component.scss'
})
export class RepeatTypeComponent extends FieldArrayType{

}
