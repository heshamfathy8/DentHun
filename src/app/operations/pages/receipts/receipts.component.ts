import { Component } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormlyFieldConfig, FormlyModule } from '@ngx-formly/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-receipts',
 imports: [InputTextModule ,ButtonModule,FormsModule, FormlyModule ,ReactiveFormsModule,TranslateModule],
  templateUrl: './receipts.component.html',
  styleUrl: './receipts.component.scss'
})
export class ReceiptsComponent {
constructor(private translate: TranslateService) {
    
  this.translate.onLangChange.subscribe(() => this.initFields());
}
fields: FormlyFieldConfig[] = [];
form = new FormGroup({});
model = { name: '', age: '' ,gender:'',employees:[{}]};

 ngOnInit(){
  this.initFields();
  }
    initFields() {
  this.fields = [
    {
     fieldGroupClassName: 'grid grid-cols-12' ,
  fieldGroup: [
 
 {
    key: 'employees',
    type: 'repeat', // custom type for FormArray (explained below)
   className: 'col-span-12 ',
    templateOptions: {
      addText: 'Add'
    },
    fieldArray: {
      fieldGroupClassName: 'col-span-12 grid grid-cols-12 gap-4 my-[20px]',
      fieldGroup: [
       {
        key: 'name',
        type: 'floatlabel-large',
        className: 'col-span-12 md:col-span-4 px-4 my-1',
        templateOptions: {
          label: 'Name',
          required: true,
          type: 'text',
        },
         validation: {
      messages: {
        required: () => 'Name Is Required',
      },
    },
      },
       {
        key: 'value',
        type: 'floatlabel-large',
        className: 'col-span-12 md:col-span-4 px-4 my-1',
        templateOptions: {
          label: 'Value',
          required: true,
          type: 'number',
        },
          validation: {
      messages: {
        required: () => 'Name Is Required',
      },
    },
      },
      {
  key: 'start_date',
  type: 'floatlabel-datepicker',
  className: 'col-span-12 md:col-span-4 px-4 my-1',
  defaultValue: new Date(),
  templateOptions: {
    label: 'Date',
    required: true,
  }
}
      ]
    }
  },
      
        ]


          },
      
        ];
        }

  log(){
    this.form.markAllAsTouched()
    console.log(this.form);
  }
}
