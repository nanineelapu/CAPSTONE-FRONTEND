import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { MobileValidationComponent } from './mobile-validation/mobile-validation.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { RechargeComponent } from './recharge/recharge.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { SuccessComponent } from './success/success.component';

const routes: Routes = [
  { path: '', component: MobileValidationComponent },
  { path: 'admin-login', component: AdminLoginComponent },
  { path: 'recharge', component: RechargeComponent },
  { path: 'admin-dashboard', component: AdminDashboardComponent },
  { path: 'success', component: SuccessComponent },
  { path: '**', redirectTo: '' },
];
const routerOptions: ExtraOptions = {
  anchorScrolling: 'enabled', // <--- Enable this
  scrollOffset: [0, 64], // Optional: adjust scroll offset if you have a fixed header
};

@NgModule({
  imports: [RouterModule.forRoot(routes, routerOptions)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
