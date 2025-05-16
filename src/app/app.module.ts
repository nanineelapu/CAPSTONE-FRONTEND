import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { MobileValidationComponent } from './mobile-validation/mobile-validation.component';
import { RechargeComponent } from './recharge/recharge.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { DummyPaymentComponent } from './dummy-payment/dummy-payment.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminLoginComponent,
    MobileValidationComponent,
    RechargeComponent,
    AdminDashboardComponent,
    DummyPaymentComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
