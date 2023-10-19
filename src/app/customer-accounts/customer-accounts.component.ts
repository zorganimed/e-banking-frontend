import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Customer} from "../model/customer.model";
import {CustomerAccounts} from "../model/customer-accounts.model";
import {CustomerService} from "../services/customer.service";
import {catchError, map, Observable, throwError} from "rxjs";
import {AccountsService} from "../services/accounts.service";


@Component({
  selector: 'app-customer-accounts',
  templateUrl: './customer-accounts.component.html',
  styleUrls: ['./customer-accounts.component.css']
})
export class CustomerAccountsComponent implements OnInit{

  customerId! : string;
  customer! : Customer;
  customerAccounts! : Observable<Array<CustomerAccounts>>;
  errorMessage!:string;

  constructor(private route : ActivatedRoute, private router : Router,
              private customerService : CustomerService,
              private accountService : AccountsService) {
    this.customer = this.router.getCurrentNavigation()?.extras.state as Customer;
  }
  ngOnInit(): void {

    this.customerId = this.route.snapshot.params['id'];
    this.customerAccounts = this.customerService.getCustomerAccounts(this.customerId).pipe(
      catchError(err => {
        this.errorMessage = err.message;
        return throwError(err);
      })
    )

  }

  handleDeleteAccount(c: CustomerAccounts) {

    let conf = confirm("Are you sure!");
    if(!conf)
      return;
    this. accountService.deleteAccount(c.id).subscribe({
      next : resp=>{
        this.customerAccounts = this.customerAccounts.pipe(
          map(data=>{
            let index = data.indexOf(c);
            data.slice(index,1);
            return data;
          })
        );
      },
      error : err=>{
        console.log(err);
      }
    });

  }
}
