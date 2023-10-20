import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Customer, CustomerPage} from "../model/customer.model";
import {environment} from "../../environments/environment.development";
import {CustomerAccounts} from "../model/customer-accounts.model";


@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  backendHost : string = "http://localhost:8080/";

  constructor(private http : HttpClient) { }

  public getCustomers():Observable<Array<Customer>>{
    return this.http.get<Array<Customer>>(environment.backendHost+"customers")
  }

  public searchCustomers(keyword : string):Observable<Array<Customer>>{
    return this.http.get<Array<Customer>>(environment.backendHost+"customers/search?keyword="+keyword);
  }

  public saveCustomer(customer : Customer):Observable<Customer>{
    return this.http.post<Customer>(environment.backendHost+"customers",customer);
  }

  public deleteCustomer( id : number){
    return this.http.delete(environment.backendHost+"customers/"+id);
  }

  public getCustomerAccounts(customerId : string):Observable<Array<CustomerAccounts>>{
    return this.http.get<Array<CustomerAccounts>>(environment.backendHost+"customers/"+customerId+"/accounts")

  }

  public searchCustomersPage(keyword : string, page : number, size : number):Observable<CustomerPage>{
    return this.http.get<CustomerPage>(environment.backendHost+"customers/searchByName?keyword="+keyword+"&page="+page+"&size="+size);
  }
}
