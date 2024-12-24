import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, inject, Inject, PLATFORM_ID } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Bankaccount } from '../bankaccount';
import { CustomerService } from '../services/customer.service';


@Component({
  selector: 'app-delete-account',
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './delete-account.component.html',
  styleUrl: './delete-account.component.css'
})
export class DeleteAccountComponent {

   bank: Bankaccount = new Bankaccount();
  
    constructor(private bankService: CustomerService, private router: Router, @Inject(PLATFORM_ID) private platformId: Object) { }
  
    customer_name: string | null = null;
    customer_id: string | null = null;
    wallet_id: string | null = null;
  
  
    authService = inject(CustomerService);
    isLoggednIn: boolean = this.authService.isLoggedIn();

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
  
   
  
    // onSubmit(deleteaccountform) {
    //   this.deleteAccountByNo(deleteaccountform);
    // }
  
    deleteAccountByNo(deleteaccountform:NgForm) {
      this.bankService.deleteAccountByNo(this.bank.walletId, this.bank.accountNo).subscribe(data => {
        console.log(data)
        alert("Account deleted")
        deleteaccountform.control.get("accountNo")?.reset();
      },error => {
        console.error("Error deleting account", error);
        alert("Error deleting account");
      })
    }

    logout() {
      localStorage.clear();
      this.authService.isLoggedIn$.next(false);
    }
}
