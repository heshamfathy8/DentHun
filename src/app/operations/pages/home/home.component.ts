import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SelectModule } from 'primeng/select';
import { InputTextModule } from 'primeng/inputtext';
import { FormlyModule, FormlyFieldConfig } from '@ngx-formly/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  imports: [InputTextModule ,ButtonModule,FormsModule,SelectModule, FormlyModule ,ReactiveFormsModule,TranslateModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  constructor(private translate: TranslateService) {
    
  this.translate.onLangChange.subscribe(() => this.initFields());
}
 fields: FormlyFieldConfig[] = [];
 model = { name: '', age: '' ,gender:'',employees:[{}]};
    selectedCity= [
        { label: 'Egypt', value: 'eg' },
        { label: 'Saudi Arabia', value: 'sa' },
        { label: 'United Arab Emirates', value: 'ae' },
      ]
  form = new FormGroup({});
  ngOnInit(){
  this.initFields();
  }
  
  initFields() {
  this.fields = [
    {
     fieldGroupClassName: 'flex flex-wrap  ' ,
  fieldGroup: [
  {
      key: 'name',
      type: 'input',
      className: 'w-full  md:w-1/2 px-4 my-[10px]',
      templateOptions: {
        label: this.translate.instant('form.username'),
        placeholder: this.translate.instant('form.username_placeholder'),
        pSize:"large",
        required: true,
        attributes: {
          class: 'p-inputtext  w-full my-2',
          pSize:"large",
      }
      },
       validation: {
      messages: {
        required: () => 'Name is required',
      },
    },
  },
  
  {
    key: 'age',
    type: 'input',
    className: 'w-full md:w-1/2 px-4 my-[10px]',
    templateOptions: {
      label: 'Age',
      required: true,
      min: 25,
      placeholder: 'Enter your age',
      type: 'number',
      attributes: {
        class: 'p-inputtext w-full my-2 p-inputtext-lg ',
      }
    },
    validation: {
      messages: {
        required: () => 'Age is required',
        min: (error, field) => `Age cannot be less than ${field.templateOptions?.min}`,
      },
    },
  },
  
  {
    key: 'country',
    type: 'select',
    className: 'w-full md:w-1/2 px-4 my-[10px]',
    props:{
      label: 'Country',
      class:  'w-full my-2',
      options: [
        { label: 'Egypt', value: 'eg' },
        { label: 'Saudi Arabia', value: 'sa' },
        { label: 'United Arab Emirates', value: 'ae' },
      ],
      filter: true,      // 👈 enables search
      showClear: true,      // 👈 enables search
    placeholder: 'Select a country',
    attributes: {
      class: ' w-full p-[3px] my-2', // 👉 دي للعنصر <input> نفسه
    }
    },
    validation: {
      messages: {
        required: () => 'Country is required',
      }
    }
  },
  {
  key: 'skills',
  type: 'multiselect',
  className: 'w-full md:w-1/2 px-4 my-[10px]', // 👉 كلاس للـ wrapper
  props: {
    label: 'Skills',
    placeholder: 'Select your skills',
      filter: true,          // ✅ بحث داخل الاختيارات
      showClear: true,       // ✅ زر المسح
     required: true,
    options: [
      { label: 'Angular', value: 'angular' },
      { label: 'React', value: 'react' },
      { label: 'Vue', value: 'vue' },
      { label: 'Svelte', value: 'svelte' }
    ],
    attributes: {
      display: 'chip',       // ✅ يخلي القيم تظهر على شكل شرايط
      class: ' w-full p-[3px]  my-2' // ✅ كلاس على <p-multiSelect>
    }
  },
   validation: {
      messages: {
        required: () => 'Gender is required',
      }
    }
},
  {
    key: 'gender',
    type: 'radio',
    className: 'w-full md:w-1/2 px-4 my-[10px] flex',
    templateOptions: {
      label: 'Gender',
      required: true,
      options: [
        { label: 'Male', value: 'male' },
        { label: 'Female', value: 'female' },
        { label: 'x', value: 'femafdgle' },
        { label: 'y', value: 'femdgale' },
      ],
      attributes: {
      class: 'bg-red-500 flex' // 👈 هذا اللي يخليهم جنب بعض
    }
    },
    validation: {
      messages: {
        required: () => 'Gender is required',
      }
    }
  },
  // {
  //   key: 'hobbies',
  //   type: 'multicheckbox',
  //   className: 'w-full md:w-1/2 px-4 my-[10px]',
  //   templateOptions: {
  //     label: 'Hobbies',
  //     options: [
  //       { label: 'Reading', value: 'reading' },
  //       { label: 'Sports', value: 'sports' },
  //       { label: 'Coding', value: 'coding' },
  //     ]
  //   }
  // },
  {
    key: 'myFile',
    type: 'custom-file',
    className: 'w-full md:w-1/2 px-4 my-[15px]',
    templateOptions: {
      label: 'Upload a file',
      mode : 'advanced',
      required:true
    },
  },
 {
  key: 'value1',
  type: 'floatlabel-large',
   className: 'w-full md:w-1/2 px-4 my-[10px]',
  templateOptions: {
    label: 'hesham',
    required: true,
    type: 'number',
  },
},
 {
    key: 'employees',
    type: 'repeat', // custom type for FormArray (explained below)
    className: 'w-full md:w-1/2 px-4 my-[10px]',
    templateOptions: {
      addText: 'Add'
    },
    fieldArray: {
      fieldGroupClassName: 'grid grid-cols-2 gap-8 mb-5',
      fieldGroup: [
        {
          key: 'name',
          type: 'input',
          className: 'grid-cols-1',
          templateOptions: {
            label: 'Name',
            required: true,
              attributes: {
                class: 'p-inputtext w-full my-2'
              }
          },
          validation: {
             messages: {
               required: () => 'Name is required',
             },
           },
        },
        {
          key: 'age',
          type: 'input',
          className: 'grid-cols-1',
          templateOptions: {
            label: 'Age',
            type: 'number',
            required: true,
            attributes: {
                class: 'p-inputtext w-full my-2'
              },
            },
            validation: {
             messages: {
               required: () => 'Name is required',
             },
           },
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
