import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CompanyApiRequest } from './services/CompanyApiRequest.service';
import { CompanyComponent } from './company/company.component';

@NgModule({
  declarations: [AppComponent, LoginComponent, SignupComponent, DashboardComponent, CompanyComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [ CompanyApiRequest],
  bootstrap: [AppComponent],
})
export class AppModule {}
