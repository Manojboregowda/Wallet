import { Component, inject, Inject, PLATFORM_ID } from '@angular/core';
import { Bankaccount } from '../bankaccount';
import { CustomerService } from '../services/customer.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule, NgModel } from '@angular/forms';


@Component({
  selector: 'app-view-accounts',
  imports: [RouterModule, FormsModule, CommonModule],
  templateUrl: './view-accounts.component.html',
  styleUrl: './view-accounts.component.css'
})
export class ViewAccountsComponent {
  bank: Bankaccount = new Bankaccount();

  bankAccounts: Bankaccount[] = [];
  alert: boolean = false;
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
    this.getAccountsByWId();
  }

  getAccountsByWId() {
    this.bankService.getAccountsByWId(this.bank.walletId).subscribe(data => {
      console.log(data)
      if (Array.isArray(data) && data.length === 0) {
        alert("Not Found Accounts")
        this.bankAccounts = [];
      } else {
        alert("Found Accounts")
        this.bankAccounts = data;
      }
    }
      // this.goToHome();
    )
  }


  goToHome() {
    this.router.navigate(['/customer-homepage']);
  }

  logout() {
    localStorage.clear();
    this.authService.isLoggedIn$.next(false);
  }
}
