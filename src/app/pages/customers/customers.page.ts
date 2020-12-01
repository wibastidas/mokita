import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { take } from 'rxjs/operators';
import { Customer } from 'src/app/interfaces/interfaces';
import { CustomersService } from 'src/app/services/customers.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.page.html',
  styleUrls: ['./customers.page.scss'],
})
export class CustomersPage implements OnInit {
  customers: Customer[];

  constructor(private customersService: CustomersService) { }

  ngOnInit() {
    this.customersService.getCustomers().pipe(take(1)).subscribe((customers: Customer[]) => {
      console.log('customers: ', customers);
      this.customers = customers;
      //DD/MM/YYYY HH:mm:ss"
      const format1 = "MMMM Do YYYY, h:mm:ss a"
      const format2 = "YYYY-MM-DD"

      let dateTime1A = moment(customers[1].createdAt).format(format1);
      let dateTime2B = moment(customers[1].createdAt).format(format2);

      console.log("dateTime1A: ", dateTime1A);
      console.log("dateTime2B: ", dateTime2B);

      // console.log("moment(): ", moment(customers[0].date).format('MM/DD/YYYY'));
    });
  }

}
