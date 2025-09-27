import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {

  baseUrl = environment.apiUrl
  user;
  constructor(
    private httpClient: HttpClient,
  ) {}

  addProduct(data:any){
    let url = this.baseUrl+'product/store'
    return this.httpClient.post(url,data);
  }
  updateProduct(data:any,id){
    let url = this.baseUrl+'product/update/'+ id
    return this.httpClient.post(url,data);
  }
  getProducts(page){
        let url = this.baseUrl+'product/index?page=' + page
        return this.httpClient.get(url);
    }
  getCategories(){
        let url = this.baseUrl+'category/index'
        return this.httpClient.get(url);
    }
  search(word){
        let url = this.baseUrl+'product/index'
        return this.httpClient.post(url,{word : word});
    }
  deleteProduct(ids){
        let url = this.baseUrl+'product/multi-delete'
        return this.httpClient.post(url,{ids:ids});
    }
}
