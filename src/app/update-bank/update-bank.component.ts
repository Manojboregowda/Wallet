import { Component, inject, Inject, PLATFORM_ID } from '@angular/core';
import { CustomerService } from '../services/customer.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule, NgModel } from '@angular/forms';
import { Bankaccount } from '../bankaccount';

@Component({
  selector: 'app-update-bank',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './update-bank.component.html',
  styleUrl: './update-bank.component.css'
})
export class UpdateBankComponent {

  bank: Bankaccount = new Bankaccount();

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

  onSubmit() {
    this.updateBankDetails();
  }

  updateBankDetails() {
    this.bankService.updateBankDetails(this.bank.walletId, this.bank.accountNo, this.bank).subscribe(data => {
      console.log(data)
      alert("Updated Bank Details!")
      this.goToHome();
    },
    error => {
      console.error("Error updating bank details", error);
      
      // Handle the error if the account number doesn't exist
      if (error.status === 404) { // Assuming backend returns 404 when account doesn't exist
        alert("Account number does not exist. Please check the account number.");
      } else if (error.status === 400 && error.error && error.error.message === 'Account number not found') {
        alert("Account number does not exist. Please check the account number.");
      } else {
        alert("Account number does not exist. Please check the account number.");
      }
    })
  }
  goToHome() {
    this.router.navigate(['/customer-homepage']);
  }

  logout() {
    localStorage.clear();
  }
}
