import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CustomersComponent} from "./customers/customers.component";
import {AccountsComponent} from "./accounts/accounts.component";
import {NewCustomerComponent} from "./new-customer/new-customer.component";
import {CustomerAccountsComponent} from "./customer-accounts/customer-accounts.component";
import {UpdateCustomerComponent} from "./update-customer/update-customer.component";
import {NewAccountComponent} from "./new-account/new-account.component";

const routes: Routes = [
  {path:"customers", component: CustomersComponent},
  {path:"accounts", component: AccountsComponent},
  {path:"new-customer", component: NewCustomerComponent},
  {path:"customer-accounts/:id", component:CustomerAccountsComponent},
  {path:"update-customer/:id", component:UpdateCustomerComponent},
  {path:"new-account", component: NewAccountComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
