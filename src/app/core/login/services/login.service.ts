import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'app/core/services/auth.service';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  loginUrl = environment.loginUrl;
  baseUrl = environment.apiUrl
  user;
  constructor(
    private auth: AuthService,
    private router: Router,
    private httpClient: HttpClient,
  ) {
      
  }

  login(username: string, password: string) {
    let body = { login: username, password: password };
    this.httpClient.post(this.loginUrl, body).subscribe(
      (response: any) => {
        this.auth.updateLoggedInState(
          true,
          response.data.name,
          response.data.id,
          response.data.token,
          response.data.role,
        );
      this.router.navigate(['/operations']);
            },
      (error) => {
      }
    );
  }

  logout() {
    this.auth.updateLoggedInState(false, null, null, null);
    localStorage.removeItem('token');
    localStorage.removeItem('roles');
    localStorage.removeItem('userName');
    localStorage.removeItem('userId');
    this.router.navigate(['/login']);
  }

  forgetPassword(data:any){
    return this.httpClient.post(this.baseUrl+'changePassword',data);
  }

  register(data:any){
    return this.httpClient.post(this.baseUrl+'register',data);
  }

  getRoles(){
    return this.httpClient.get(this.baseUrl+'department/index');
  }
}
