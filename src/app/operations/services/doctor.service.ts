import { HttpClient, HttpParams } from '@angular/common/http';
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

   getDoctors(val){
      let params = new HttpParams()

  if (val.page) {
    params = params.set('page', val.page);
  }
  if (val.search) {
    params = params.set('search', val.search);
  }
  if (val.interacted_only) {
    params = params.set('interacted_only', val.interacted_only);
  }
 
        let url = this.baseUrl+'report/doctor/all'
        return this.httpClient.get(url,{params});
    }
   getShopProducts(filter:{}){
      let params = new HttpParams()
      Object.keys(filter).forEach(key =>{
        if (filter[key]) {
          params = params.set(key, filter[key]);
        }
      })
  
        let url = this.baseUrl+'product/all'
        return this.httpClient.get(url,{params});
    }
   getDoctorDetails(id){
        let url = this.baseUrl+`report/doctor/${id}/details`
        return this.httpClient.get(url);
    }
   getCardProducts(){
        let url = this.baseUrl+`cart/index`
        return this.httpClient.get(url);
    }
   getCurrentPayments(){
        let url = this.baseUrl+'payment/pending'
        return this.httpClient.get(url);
    }
   getCategories(){
        let url = this.baseUrl+'category/index'
        return this.httpClient.get(url);
    }
   confirmPayment(id,data){
        let url = this.baseUrl+'payment/confirm/'+ id
        return this.httpClient.post(url,data);
    }
   cancelPayment(id,data){
        let url = this.baseUrl+'payment/confirm/' + id
        return this.httpClient.post(url,data);
    }
   checkout(data){
        let url = this.baseUrl+'order/store' 
        return this.httpClient.post(url,data);
    }
   removeFromCart(id){
        let url = this.baseUrl+'cart/delete/' + id
        return this.httpClient.delete(url);
    }
    addToCard(body){
      let url = this.baseUrl+'cart/store'
      return this.httpClient.post(url , body);
    }
    addPackageToCard(id ,data){
      let url = this.baseUrl+'package/buy/' + id
      return this.httpClient.post(url,data);
    }
    markAsFavorite(id){
         let url = this.baseUrl+'favorite-product/add/' + id
         return this.httpClient.get(url);
     }
   removeFromFavorites(id){
        let url = this.baseUrl+'favorite-product/remove/' + id
        return this.httpClient.delete(url);
    }
   getFavorites(filter){
    let params = new HttpParams()
      Object.keys(filter).forEach(key =>{
        if (filter[key]) {
          params = params.set(key, filter[key]);
        }
      })
        let url = this.baseUrl+'favorite-product/index'
        return this.httpClient.get(url,{params});
    }
}
