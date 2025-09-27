import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AppFloatingConfigurator } from 'app/core/layout/components/app.floatingconfigurator';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { RippleModule } from 'primeng/ripple';
import { InputOtpModule } from 'primeng/inputotp';
import { LoginService } from '@login/services/login.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-forget-password',
  imports: [ButtonModule, CheckboxModule, InputTextModule, PasswordModule, FormsModule, RouterModule, RippleModule,CommonModule,AppFloatingConfigurator,InputOtpModule],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.scss'
})
export class ForgetPasswordComponent {
email: string = '';

    password: string = '';

    checked: boolean = true;
  showOTP
  otp
  confirm
    
constructor(
    private loginService: LoginService,
    private router: Router,
    private messageService: MessageService
  ) {}
   
    showlength(){
      console.log(this.otp);
      
    }
    reset(formValue){
      console.log(formValue);
      delete formValue.confirm
      this.loginService.register(formValue).subscribe({
        next:(res)=>{
          this.messageService.add({ severity: 'success', summary: 'success', detail: 'email registered successfully', life: 3000 });
        },
      })
      this.showOTP = true
    }
}
