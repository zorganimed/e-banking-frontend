export interface CustomerAccounts {
  type:          string;
  id:            string;
  balance:       number;
  createDate:    Date;
  status:        string;
  customerDTO:   Customer;
  overDraft?:    number;
  interestRate?: number;
}

export interface Customer {
  id:    number;
  name:  string;
  email: string;
}
