import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Customer } from '../customer';
import { CustomerService } from '../services/customer.service';
import { Wallet } from '../wallet';

@Component({
  selector: 'app-login-customer',
  imports: [RouterModule, FormsModule],
  templateUrl: './login-customer.component.html',
  styleUrl: './login-customer.component.css'
})
export class LoginCustomerComponent {
  customer: Customer = new Customer();

  wallet: Wallet = new Wallet();

  customer_name: any;
  customer_id: any;

  constructor(private loginService: CustomerService, private router: Router) { }

  ngOnInit(): void {

  }

  loginCustomer() {
    this.loginService.loginCustomer(this.customer.mobile, this.customer.password).subscribe(data => {

      if (!data || !data.customerId || !data.customerName || !data.walletDto) {
        alert("User not found. Please check your mobile number and password.");
        return;
      }
      console.log(data);

      alert('Login is Success!');
      this.customer_id = data.customerId.toString();
      this.customer_name = data.customerName;
      this.wallet = data.walletDto;
      console.log(this.wallet);
      const data1 = localStorage.setItem("user_id", data.customerId.toString());
      const data2 = localStorage.setItem("user_name", data.customerName);
      const data3 = localStorage.setItem("wallet_id", data.walletDto.walletId.toString());
      this.goToHomePage();
    }, error => {
      console.error("Error during login", error);

      // Handle specific error codes, such as 404 for user not found
      if (error.status === 404) {
        alert("User not found. Please check your mobile number and password.");
      } else if (error.status === 401) {
        alert("Incorrect password. Please try again.");
      } else {
        alert("User not found. Please check your mobile number and password.");
      }
    })
  }

  goToHomePage() {
    this.router.navigate(['/customer-homepage'])
  }

  onSubmit() {
    console.log(this.customer);
    this.loginCustomer();
  }
}
