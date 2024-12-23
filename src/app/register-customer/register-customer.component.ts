import { Component } from '@angular/core';
import { Customer } from '../customer';
import { FormsModule } from '@angular/forms'
import { CustomerService } from '../services/customer.service';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';



@Component({
  selector: 'app-register-customer',
  imports: [FormsModule,RouterModule],
  templateUrl: './register-customer.component.html',
  styleUrl: './register-customer.component.css'
})
export class RegisterCustomerComponent {

  customer: Customer = new Customer();
  constructor(private registerService: CustomerService, private router: Router) { }

  ngOnInit(): void {

  }
  saveCustomer() {
    this.registerService.createCustomer(this.customer).subscribe(data => {
      console.log(data);
      alert('Registration Success!')
      this.goToLogin();
    },
    error => {
      console.error("Error during registration", error);
      
      // Check if the error is related to the phone number already existing
      if (error.status === 409) { // Assuming the backend returns 409 for conflicts
        alert('Phone number already exists. Please use a different number.');
      } else if (error.status === 400 && error.error && error.error.message === 'Phone number already exists') {
        alert('Phone number already exists. Please use a different number.');
      } else {
        alert('Phone number already exists. Please use a different number.');
      }
    })
  }

  goToLogin() {
    this.router.navigate(['/login-customer']);
  }

  onSubmit() {
    console.log(this.customer);
    this.saveCustomer();
  }
}
