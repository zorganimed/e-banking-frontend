import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Customer} from "../model/customer.model";
import {AccountsService} from "../services/accounts.service";
import {CustomerAccounts} from "../model/customer-accounts.model";
import {Router} from "@angular/router";
import {CustomerService} from "../services/customer.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-new-account',
  templateUrl: './new-account.component.html',
  styleUrls: ['./new-account.component.css']
})
export class NewAccountComponent implements OnInit{

   newAccountForm! : FormGroup;
   accountType : string = '';
   customers : any;

  constructor(private fb : FormBuilder,
              private accountService : AccountsService,
              private router : Router,
              private customerService : CustomerService) {
  }
  ngOnInit(): void {

    this.customerService.getAllCustomers().subscribe(
      data=>{
        this.customers = data;
    }
    )

    this.newAccountForm = this.fb.group(
      {
        balance : this.fb.control(0,[Validators.required,Validators.min(0)]),
        accountType : this.fb.control('SA'),
        interestRate : this.fb.control(0,[Validators.required,Validators.min(0)]),
        overDraft : this.fb.control(0,[Validators.required,Validators.min(0)]),
        idCustomer : this.fb.control(null)
      }
    )
  }

  handleSaveAccount() {
    let customerAccounts : CustomerAccounts = this.newAccountForm.value;
    let accountType : string = this.newAccountForm.value.accountType;
    let idCustomer : string = this.newAccountForm.value.idCustomer;
    console.log('customer is ', idCustomer)
    if(accountType == 'SA') {
      this.accountService.saveSavingAccount(customerAccounts,idCustomer).subscribe({
        next: data => {
          alert("Saving account has been saved successfully");
          //this.newCustomerForm.reset();
          this.router.navigateByUrl("/accounts");

        },
        error: err => {
          console.log(err);
        }
      });
    }else{
      this.accountService.saveCurrentAccount(customerAccounts,idCustomer).subscribe({
        next: data => {
          alert("Current account has been saved successfully");
          //this.newCustomerForm.reset();
          this.router.navigateByUrl("/accounts");

        },
        error: err => {
          console.log(err);
        }
      });
    }
  }
}
