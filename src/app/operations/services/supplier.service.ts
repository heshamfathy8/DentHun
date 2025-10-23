import { AuthService } from './../../core/services/auth.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {

  baseUrl = environment.apiUrl
  user;
  role = this.auth.userRole
  constructor(
    private httpClient: HttpClient,
    private auth: AuthService,
  ) {}

  sendFCMToken(data:any){
    let url = this.baseUrl+'profile/update-fcmToken'
    return this.httpClient.post(url,data);
  }
  addProduct(data:any){
    let url = this.baseUrl+'product/store'
    return this.httpClient.post(url,data);
  }
  updateProduct(data:any,id){
    let url = this.baseUrl+'product/update/'+ id
    return this.httpClient.post(url,data);
  }
  getProducts(val){
         console.log(val);
     let params = new HttpParams()

  if (val.page) {
    params = params.set('page', val.page);
  }
  if (val.id) {
    params = params.set('id', val.id);
  }
  if (val.search) {
    params = params.set('search', val.search);
  }
  // if (val.from_date) {
  //   params = params.set('from_date', val.from_date);
  // }
  // if (val.to_date) {
  //   params = params.set('to_date', val.to_date);
  // }
        let url = this.baseUrl+'product/index'
        return this.httpClient.get(url ,{params});
    }
  getPayments(val){
         console.log(val);
     let params = new HttpParams()

  if (val.page) {
    params = params.set('page', val.page);
  }
  if (val.id) {
    this.role == 'supplier'
    ? params = params.set('doctor_id', val.id)
    : params = params.set('supplier_id', val.id)
  }
  if (val.search) {
    params = params.set('search', val.search);
  }
  if (val.from_date) {
    params = params.set('from_date', val.from_date);
  }
  if (val.to_date) {
    params = params.set('to_date', val.to_date);
  }
         let url = this.baseUrl+`payment/index`
        return this.httpClient.get(url ,{params});
    }
  getCategories(){
        let url = this.baseUrl+'category/index'
        return this.httpClient.get(url);
    }
  getProfile(){
        let url = this.baseUrl+'profile/show'
        return this.httpClient.get(url);
    }
  getNotifications(){
        let url = this.baseUrl+'notification/user'
        return this.httpClient.get(url);
    }
  updateProfile(data){
        let url = this.baseUrl+'profile/update'
        return this.httpClient.post(url,data);
    }
  getSuppliers(val){
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
    let url = this.baseUrl+'report/supplier/all'
    return this.httpClient.get(url ,{params});
 }
  search(word){ // store
        let url = this.baseUrl+'product/search?search=' + word
        return this.httpClient.get(url );
    }
  orderSearch(word){ // order
    console.log();
    
        let url = this.baseUrl+'order/search' 
        return this.httpClient.get(url);
    }
  storeSearch(word){ // order
        let url = this.baseUrl+'product/search?search=' + word
        return this.httpClient.get(url);
    }
  paymentSearch(val){ // order -------- &from_date=2025-10-01&to_date=2025-10-06
    console.log(val);
     let params = new HttpParams()

  if (val.search) {
    params = params.set('search', val.search);
  }
  if (val.from_date) {
    params = params.set('from_date', val.from_date);
  }
  if (val.to_date) {
    params = params.set('to_date', val.to_date);
  }

        let url = this.baseUrl+`payment/search`
        return this.httpClient.get(url , {params});
    }
  deleteProduct(ids){
        let url = this.baseUrl+'product/multi-delete'
        return this.httpClient.post(url,{ids:ids});
    }
  updateOrderProduct(product){ // refound
    console.log(product);
    
        let url = this.baseUrl+`order/items/${product.id}/return`
        return this.httpClient.post(url, {quantity : product.quantity});
    }
  updateCurrentProduct(product){ // update
    console.log(product);
    
        let url = this.baseUrl+`order/update-item/` + product.id
        return this.httpClient.post(url, {quantity : product.quantity});
    }
  addPayments(product){ // add
        let url = this.baseUrl+`payment/store`
        return this.httpClient.post(url,product);
    }
  updatePayment(product){ // update
        let url = this.baseUrl+`payment/update/` + product.id
        return this.httpClient.post(url,product);
    }
 deletePayment(id){
     let url = this.baseUrl+'payment/delete/' + id 
      return this.httpClient.get(url);
    }
  deleteOrder(order){
    let url =
     order.created_at
     ? this.baseUrl+'order/delete/' + order.id 
     : this.baseUrl+'order/delete-item/' + order.id 

      return this.httpClient.delete(url);
    }
  deletePackage(order){ // want to update
    let url = this.baseUrl+'package/delete/' + order.id 
      return this.httpClient.delete(url);
    }
  deleteReceipt(id){
     let url = this.baseUrl+'receipt/delete/' + id 
      return this.httpClient.delete(url);
    }
    getOrders(val){ 
      console.log(val);
     let params = new HttpParams()

  if (val.search) {
    params = params.set('search', val.search);
  }
  if (val.page) {
    params = params.set('page', val.page);
  }
  if (val.id) {
    this.role == 'supplier'
    ? params = params.set('doctor_id', val.id)
    : params = params.set('supplier_id', val.id)
  }
  if (val.from_date) {
    params = params.set('from_date', val.from_date);
  }
  if (val.to_date) {
    params = params.set('to_date', val.to_date);
  }
       let url = this.baseUrl+'order/all-delivered'
        return this.httpClient.get(url ,{params});
    }
    getٌBestSalesProducts(){ 
       let url = this.baseUrl+'receipt/index'
        return this.httpClient.get(url);
    }
    getٌReceits(page){ 
       let url = this.baseUrl+'receipt/index?page=' + page
        return this.httpClient.get(url);
    }
    addReceit(data){ 
       let url = this.baseUrl+'receipt/store'
        return this.httpClient.post(url,data);
    }
    updateReceipt(data,id){ 
       let url = this.baseUrl+'receipt/update/'+ id
        return this.httpClient.post(url,data);
    }
    deleteGroupReceit(data){ 
       let url = this.baseUrl+'receipt/deleteByDate'
        return this.httpClient.post(url,data);
    }
    getCurrentOrders(page){
       let url = this.baseUrl+'order/index-type?page=' + page
        return this.httpClient.get(url);
    }
    getDashboard(){
       let url = this.baseUrl+'statistic'
        return this.httpClient.get(url);
    }
 
    CreatePackage(data){
       let url = this.baseUrl+'package/store'
        return this.httpClient.post(url,data);
    }
    updatePackage(data ,id){
       let url = this.baseUrl+'package/update/' + id
        return this.httpClient.post(url,data);
    }
    getTargetData(id){
       let url = this.baseUrl+'package/show/'+ id
        return this.httpClient.get(url);
    }
    getSourceData(id){
       let url = this.baseUrl+'package/remain-products/'+ id
        return this.httpClient.get(url);
    }
    changeOrderStatus(id,status){
       let url = this.baseUrl+'order/update-status/' + id
      //  order.created_at 
      //  ? this.baseUrl+'order/all-delivered?page=' 
      //  : this.baseUrl+'order/all-delivered?page=' 
        return this.httpClient.post(url,status);
    }
  storeExportCSV(){
         let url = this.baseUrl+'product/export'
        return this.httpClient.get(url ,{
    responseType: 'blob'  // 👈 important: tells Angular it's binary
  });
    }
  ordersExportCSV(){
         let url = this.baseUrl+'order/delivered/export'
        return this.httpClient.get(url ,{
    responseType: 'blob'  // 👈 important: tells Angular it's binary
  });
    }
  paymentExportCSV(){
         let url = this.baseUrl+'payment/export'
        return this.httpClient.get(url ,{
    responseType: 'blob'  // 👈 important: tells Angular it's binary
  });
    }
  getPackages(filter){
    let params = new HttpParams()
      Object.keys(filter).forEach(key =>{
        if (filter[key]) {
          params = params.set(key, filter[key]);
        }
      })
        let url = this.baseUrl+'package/index'
        return this.httpClient.get(url,{params});
    }  
    activate(id){
       let url = this.baseUrl+'package/toggle-status/'+ id
        return this.httpClient.get(url);
    }
}
