import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment.development";
import {Observable} from "rxjs";
import {AccountDetails} from "../model/account.model";
import {CustomerAccounts} from "../model/customer-accounts.model";

@Injectable({
  providedIn: 'root'
})
export class AccountsService {

  constructor(private http : HttpClient) { }

  public getAccount(accountId : string, page : number, size : number):Observable<AccountDetails>{
    return this.http.get<AccountDetails>(environment.backendHost+"accounts/"+accountId+"/pageOperations?page="+page+"&size="+size);
  }

  public debit(accountId : string, amount : number, description : string){
    let data = {accountId:accountId,amount:amount,description:description};
    return this.http.post(environment.backendHost+"accounts/debit",data);
  }

  public credit(accountId : string, amount : number, description : string){
    let data = {accountId:accountId,amount:amount,description:description};
    return this.http.post(environment.backendHost+"accounts/credit",data);
  }

  public transfer(accountSource : string, accountDestination:string, amount : number, description : string){
    let data = {accountSource,accountDestination,amount,description};
    return this.http.post(environment.backendHost+"accounts/transfer",data);
  }

  public deleteAccount(id :string){
    return this.http.delete(environment.backendHost+"accounts/"+id);
  }

  public saveSavingAccount(savingAccount : CustomerAccounts, idCustomer : string):Observable<CustomerAccounts>{
    return this.http.post<CustomerAccounts>(environment.backendHost+"accounts/addSavingAccount/"+idCustomer,savingAccount);
  }

  public saveCurrentAccount(currentAccount : CustomerAccounts, idCustomer : string):Observable<CustomerAccounts>{
    return this.http.post<CustomerAccounts>(environment.backendHost+"accounts/addCurrentAccount/"+idCustomer,currentAccount);
  }
}
