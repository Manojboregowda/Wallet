import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, inject, Inject, PLATFORM_ID } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CustomerService } from '../services/customer.service';

@Component({
  selector: 'app-contactus',
  imports: [CommonModule,RouterModule],
  templateUrl: './contactus.component.html',
  styleUrl: './contactus.component.css'
})
export class ContactusComponent {
  customer_name:string | null=null;
      customer_id: string | null = null;
    
      constructor(@Inject(PLATFORM_ID) private platformId: Object){}
    
      ngOnInit() {
        if (isPlatformBrowser(this.platformId)) {
        this.customer_name = localStorage.getItem('user_name');
        this.customer_id = localStorage.getItem('user_id');
        }else {
          console.warn('localStorage is not available on the server.');
        }
      }
    
      authService = inject(CustomerService);
      isLoggednIn:boolean = this.authService.isLoggedIn();
    
      logout(){
        localStorage.clear();
      }
}