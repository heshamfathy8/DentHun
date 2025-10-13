import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { FieldType } from '@ngx-formly/core';
import { FileUpload, FileUploadModule } from 'primeng/fileupload';
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

    @ViewChild('fileUploader') fileUploader!: FileUpload;
    
//  ngOnInit() {
//     // لو القيمة رجعت null (reset form) → امسح واجهة الـ fileUpload
//     this.formControl.valueChanges.subscribe(val => {
//       console.log(val);
//       if (val === '' && this.fileUploader) {
        
//         this.fileUploader.clear();
//       }
//     });
//   }
ngOnInit() {
  this.formControl.valueChanges.subscribe(val => {
    console.log(val);
    
    if (!val) {
      this.fileUploader?.clear();
    }
  });
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
   onFileChange(event: any) {
    const input = event.target as HTMLInputElement;
    if (input?.files?.length) {
      const file = input.files[0];
      if ( file) {
        this.formControl.patchValue(file);
        this.fileName = file.name
      }
    }
   
  }
  clearFiles() {
  this.fileUploader?.clear();
  this.formControl.setValue(null);
}
   uploadedFiles: any[] = [];

    constructor(private messageService: MessageService) {super()}

    onUpload(event:any , uploader) {
      uploader.files = event.files
      
        let filesArray = Array.from(event.files)
        let files
        if (filesArray.length) {

          filesArray.length > 1 
          ? files = filesArray 
          : files = filesArray[0]

          // ✅ خزّن الجديد بس في الـ formControl
          console.log(files);
          
          this.formControl.setValue(files);

          this.messageService.add({
            severity: 'info',
            summary: 'File Uploaded',
            detail: `${files.length} file(s) uploaded`
          });
        }

 
    }
    
}