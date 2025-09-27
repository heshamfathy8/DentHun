import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { FieldType } from '@ngx-formly/core';
import { FileUploadModule } from 'primeng/fileupload';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-custom-file-type',
   imports: [ReactiveFormsModule, CommonModule,FileUploadModule,ToastModule
   ], // ✅ ضيفه هنا],
   providers: [MessageService], // 👈 أضفها هنا
  templateUrl: './custom-file-type.component.html',
  styleUrl: './custom-file-type.component.scss'
})

export class CustomFileTypeComponent extends FieldType {
  ngOnInit() {
    console.log('📁 CustomFileTypeComponent loaded');
  }
  fileName:any
get control(): FormControl {
    return this.formControl as FormControl;
  }
  getFileUrl(): string {
  const value = this.formControl.value;
  if (value instanceof File) {
    return URL.createObjectURL(value); // لو المستخدم لسه رافع الملف
  } else if (typeof value === 'string') {
    return value; // جاية من الـ model كـ رابط
  }
  return '';
}
   onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input?.files?.length) {
      const file = input.files[0];
      if ( file) {
        this.formControl.patchValue(file);
        this.fileName = file.name
      }
    }
   
  }
   uploadedFiles: any[] = [];

    constructor(private messageService: MessageService) {super()}

    onUpload(event:any) {
        for(let file of event.files) {
            this.uploadedFiles.push(file);
        }
    
    if (event?.files?.length) {
      console.log(event?.files?.length);
      
      const file = event.files[0];
      if ( file) {
        console.log(file);
        this.formControl.patchValue(file);
        this.fileName = file.name
      }
    }

        this.messageService.add({severity: 'info', summary: 'File Uploaded', detail: ''});
    }
}