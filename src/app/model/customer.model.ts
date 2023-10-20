export interface CustomerPage {
  currentPage:  number;
  totalPages:   number;
  pageSize:     number;
  customerDTOS: Customer[];
}
export interface Customer{

  id : number;
  name : string;
  email : string;
}

