import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, inject, Inject, PLATFORM_ID } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CustomerService } from '../services/customer.service';

@Component({
  selector: 'app-customer-homepage',
  imports: [RouterModule, CommonModule],
  templateUrl: './customer-homepage.component.html',
  styleUrl: './customer-homepage.component.css'
})
export class CustomerHomepageComponent {

  customer_name:string | null=null;
  customer_id: string | null = null;

  imageUrl = 'src/assets/images/addbank.png';

  constructor(@Inject(PLATFORM_ID) private platformId: Object){}

  authService = inject(CustomerService);
  isLoggednIn:boolean = true;

  ngOnInit():void {
    if (isPlatformBrowser(this.platformId)) {
    this.customer_name = localStorage.getItem('user_name');
    this.customer_id = localStorage.getItem('user_id');
    this.authService.isLoggedIn$.subscribe(res =>{
      this.isLoggednIn = this.authService.isLoggedIn();
    })
    }else {
      console.warn('localStorage is not available on the server.');
    }
  }



  logout(){
    localStorage.clear();
    // this.authService.isLoggedIn$.next(false);
  }

}
