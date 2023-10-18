import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Customer} from "../model/customer.model";
import {CustomerService} from "../services/customer.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-new-customer',
  templateUrl: './new-customer.component.html',
  styleUrls: ['./new-customer.component.css']
})
export class NewCustomerComponent implements OnInit{

  newCustomerForm! : FormGroup;

  constructor(private fb : FormBuilder,
              private  customerService: CustomerService,
              private router : Router) {
  }

  ngOnInit(): void {
    this.newCustomerForm = this.fb.group(
      {
        name: this.fb.control(null,[Validators.required, Validators.minLength(4)]),
        email: this.fb.control(null,[Validators.required, Validators.email])
      });
  }


  handleSaveCustomer() {
    let customer : Customer = this.newCustomerForm.value;
    this.customerService.saveCustomer(customer).subscribe({
      next : data =>{
        alert("Custmer has been saved successfully");
        //this.newCustomerForm.reset();
        this.router.navigateByUrl("/customers");

      },
      error : err=>{
        console.log(err);
    }
    })

  }
}
