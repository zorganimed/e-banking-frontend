import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CustomerService} from "../services/customer.service";
import {catchError, map, Observable, throwError} from "rxjs";
import {Customer, CustomerPage} from "../model/customer.model";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit{

  customers!:Observable<Array<Customer>>;
  errorMessage!:string;
  searchFormGroup : FormGroup | undefined;
  currentPage : number = 0;
  pageSize : number = 2;
  customersPageObservable! : Observable<CustomerPage>;

  constructor(private customerService : CustomerService,
              private fb : FormBuilder, private router : Router) {
  }

  ngOnInit(): void {

    this.searchFormGroup = this.fb.group({
      keyword : this.fb.control("")
    });

    //this.handleSearchCustomers();
    this.handleSearchCustomersPage();
  }

  handleSearchCustomers() {
     let kw = this.searchFormGroup?.value.keyword;
     this.customers = this.customerService.searchCustomers(kw).pipe(
       catchError(err => {
         this.errorMessage = err.message;
         return throwError(err);
       })
     )

  }

  handleSearchCustomersPage() {
    let kw = this.searchFormGroup?.value.keyword;
    this.customersPageObservable = this.customerService.searchCustomersPage(kw,this.currentPage,this.pageSize).pipe(
      catchError(err => {
        this.errorMessage = err.message;
        return throwError(err);
      })
    )

  }

  gotoPage(page: number) {
    this.currentPage = page;
    this.handleSearchCustomersPage();

  }


  handleDeleteCustomer(c : Customer) {

    let conf = confirm("Are you sure?");
    if(!conf) return;
    this.customerService.deleteCustomer(c.id).subscribe({
      next : resp=>{
         this.customers = this.customers.pipe(
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

  handleCustomerAccount(customer: Customer) {

    this.router.navigateByUrl("/customer-accounts/"+customer.id,{state : customer});

  }
}
