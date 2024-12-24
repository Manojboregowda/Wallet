import { Component, Inject, inject, PLATFORM_ID } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { CustomerService } from './services/customer.service';
import { FooterComponent } from "./footer/footer.component";


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'payment_wallet';

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
