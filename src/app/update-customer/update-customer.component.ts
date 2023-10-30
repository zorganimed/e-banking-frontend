import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Customer} from "../model/customer.model";
import {CustomerService} from "../services/customer.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-update-customer',
  templateUrl: './update-customer.component.html',
  styleUrls: ['./update-customer.component.css']
})
export class UpdateCustomerComponent implements OnInit{

  updateCustomerForm! : FormGroup;
  customerId! : number;
  name! : string;

  constructor(private route : ActivatedRoute, private router : Router,
              private fb : FormBuilder,
              private customerService : CustomerService) {
  }

  ngOnInit(): void {
    this.customerId = this.route.snapshot.params['id'];

    this.customerService.getCustomer(this.customerId).subscribe({
      next : data=>{
        this.updateCustomerForm = this.fb.group({
          name : this.fb.control(data['name'], [Validators.required, Validators.minLength(5)]),
          email : this.fb.control(data['email'], [Validators.required, Validators.email]),
          id : this.fb.control(data['id'])
        })
      },
      error : err => {
        console.log(err);
      }
    })
  }

  handleUpdateCustomer() {
    let customer:Customer = this.updateCustomerForm.value;

    this.customerService.updateCustomer(customer).subscribe({
      next : value => {
        alert("Custmer has been saved successfully");
        //this.router.navigateByUrl("/customers");
      },
      error : err => {
        console.log(err);
      }
    })

  }
}
