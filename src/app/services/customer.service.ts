import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Customer } from '../customer';
import { Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { Bankaccount } from '../bankaccount';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private baseURL = "http://localhost:8080/";
  constructor(private http: HttpClient, @Inject(PLATFORM_ID) private platformId: Object) { }

  getCustomerList(): Observable<Customer[]> {
    return this.http.get<Customer[]>(`${this.baseURL}` + 'customer/allcustomer');
  }

  createCustomer(customer: Customer): Observable<Object> {
    return this.http.post(`${this.baseURL}` + 'wallet/create', customer);
  }

  loginCustomer(mobile: string, pass: string): Observable<Customer> {
    return this.http.get<Customer>(`${this.baseURL}login/${mobile}/${pass}`);
  }

  isLoggedIn(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      const ls: boolean = !!localStorage.getItem('user_id');
      return ls;
    } else {
      return false;
    }
  }

  saveBankDetails(bank: Bankaccount): Observable<Bankaccount> {
    return this.http.post<Bankaccount>(`${this.baseURL}` + 'addaccount', bank)
  }

  updateBankDetails(wallet_id: number, accountNo: number, bank: Bankaccount): Observable<any> {
    return this.http.put(`${this.baseURL}updateaccount/${wallet_id}/${accountNo}`,bank);
  }

  getAccountsByWId(wallet_id:number):Observable<Bankaccount[]>{
    return this.http.get<Bankaccount[]>(`${this.baseURL}getAllAccounts/${wallet_id}`);
  }

  deleteAccountByNo(wallet_id:number, accountNo:number):Observable<any>{
    return this.http.delete(`${this.baseURL}deleteaccount/${wallet_id}/${accountNo}`);
  }
}
