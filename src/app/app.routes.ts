import { Routes } from '@angular/router';
import { RegisterCustomerComponent } from './register-customer/register-customer.component';
import { LoginCustomerComponent } from './login-customer/login-customer.component';
import { CustomerHomepageComponent } from './customer-homepage/customer-homepage.component';
import { AddAccountComponent } from './add-account/add-account.component';
import { AddBankComponent } from './add-bank/add-bank.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { ContactusComponent } from './contactus/contactus.component';
import { UpdateBankComponent } from './update-bank/update-bank.component';
import { ViewAccountsComponent } from './view-accounts/view-accounts.component';
import { DeleteAccountComponent } from './delete-account/delete-account.component';


export const routes: Routes = [
    {path: 'register-customer', component:RegisterCustomerComponent},
    {path: 'login-customer', component:LoginCustomerComponent},
    {path: 'customer-homepage', component:CustomerHomepageComponent},
    {path: 'add-account',component:AddAccountComponent},
    {path: 'add-bank',component:AddBankComponent},
    {path:'aboutus',component:AboutusComponent},
    {path:'contactus',component:ContactusComponent},
    {path:'update-account',component:UpdateBankComponent},
    {path:'view-accounts',component:ViewAccountsComponent},
    {path:'delete-account',component:DeleteAccountComponent},
    {path:'', redirectTo: 'register-customer', pathMatch:'full'}
];
