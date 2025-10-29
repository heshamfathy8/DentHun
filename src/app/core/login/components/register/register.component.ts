import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { LoginService } from '@login/services/login.service';
import { ProductService } from '@login/services/product.service';
import { AppFloatingConfigurator } from 'app/core/layout/components/app.floatingconfigurator';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { RippleModule } from 'primeng/ripple';
import { MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';
import { SelectModule } from 'primeng/select';


@Component({
  selector: 'app-register',
   imports: [ButtonModule,Toast, CheckboxModule, InputTextModule, PasswordModule, FormsModule, RippleModule,CommonModule,AppFloatingConfigurator ,SelectModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
   providers: [ProductService]
})
export class RegisterComponent {
  email
  name
  confirm
  phone
  phone2
  address
 password
  checked
  city_id
  department_id
roles
Cities = [{
  name : 'port',
  id : 333,
}]
// workingHours: any;
constructor(
    private loginService: LoginService,
    private router: Router,
    private messageService: MessageService
  ) {}
  ngOnInit(){
    this.getRoles()
    this.getCites()
  }
   
  register(formValue){
    delete formValue.confirm
    console.log(formValue);
    
    this.loginService.register(formValue).subscribe({
      next:(res)=>{
        this.messageService.add({ severity: 'success', summary: 'success', detail: 'email registered successfully', life: 3000 });
        this.router.navigateByUrl('/login')
      },
    })
  }
  getRoles(){
     this.loginService.getRoles().subscribe({
      next:(res:any)=>{
        this.roles = res.data
      },
    })
  }
  getCites(){
     this.loginService.getCites().subscribe({
      next:(res:any)=>{
        this.Cities = res.data
      },
    })
  }
}
