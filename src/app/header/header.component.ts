import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, inject, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CustomerService } from '../services/customer.service';
import { Customer } from '../customer';

@Component({
  selector: 'app-header',
  imports: [RouterModule,CommonModule,FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {

  customer_name:string | null=null;
  customer_id: string | null = null;

  constructor(@Inject(PLATFORM_ID) private platformId: Object, loginService:CustomerService){}


  authService = inject(CustomerService);
  isLoggednIn:boolean = false;

  ngOnInit() :void {
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
    this.authService.isLoggedIn$.next(false);
  }

}
