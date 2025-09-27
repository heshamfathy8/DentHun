import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {
  baseUrl = environment.apiUrl
  user;
  constructor(
    private httpClient: HttpClient,
  ) {}

  forgetPassword(data:any){
    let url = this.baseUrl+'changePassword'
    return this.httpClient.post(url,data);
  }
}
