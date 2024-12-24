import { Component, Inject, inject, PLATFORM_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Bankaccount } from '../bankaccount';
import { CustomerService } from '../services/customer.service';
import { Router } from '@angular/router';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Wallet } from '../wallet';

@Component({
  selector: 'app-add-bank',
  imports: [RouterModule, FormsModule, CommonModule],
  templateUrl: './add-bank.component.html',
  styleUrl: './add-bank.component.css'
})
export class AddBankComponent {

  bank: Bankaccount = new Bankaccount();
  wallet:Wallet = new Wallet();

  constructor(private bankService: CustomerService, private router: Router, @Inject(PLATFORM_ID) private platformId: Object) { }

  customer_name: string | null = null;
  customer_id: string | null = null;
  wallet_id: string | null = null;
  

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.customer_name = localStorage.getItem('user_name');
      this.customer_id = localStorage.getItem('user_id');
      this.wallet_id = localStorage.getItem('wallet_id');
      this.bank.walletId = Number(this.wallet_id);
    } else {
      console.warn('localStorage is not available on the server.');
    }
  }

  authService = inject(CustomerService);
  isLoggednIn: boolean = this.authService.isLoggedIn();

  saveBankDetails() {
    this.bankService.saveBankDetails(this.bank).subscribe(data => {
      console.log(data)
      alert("Added Bank Details")
      this.goToHome();
    },
    error => {
      console.error("Error adding bank details", error);
      
      // Check if the error is related to the account number already existing
      if (error.status === 409) { // Assuming backend returns 409 for conflict
        alert("Account number already exists. Please use a different account number.");
      } else if (error.status === 400 && error.error && error.error.message === 'Account number already exists') {
        alert("Account number already exists. Please use a different account number.");
      } else {
        alert("Account number already exists. Please use a different account number.");
      }
    })
  }
  goToHome() {
    this.router.navigate(['/customer-homepage']);
  }

  onSubmit() {
    console.log(this.bank)
    this.saveBankDetails();
  }

  logout() {
    localStorage.clear();
    this.authService.isLoggedIn$.next(false);
  }
}
