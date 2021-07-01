import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from "@angular/common/http";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";

import { InputTextModule } from "primeng/inputtext";
import { DropdownModule } from "primeng/dropdown";
import { PasswordModule } from "primeng/password";
import { ButtonModule } from "primeng/button";
import { CardModule } from "primeng/card";
import { ProgressBarModule } from "primeng/progressbar";
import { ToastModule } from "primeng/toast";

import { AuthenticationRoutingModule } from './authentication-routing.module';
import { AuthenticationComponent } from './authentication.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';


@NgModule({
  declarations: [
    AuthenticationComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    AuthenticationRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    InputTextModule,
    DropdownModule,
    PasswordModule,
    ButtonModule,
    CardModule,
    ProgressBarModule,
    ToastModule
  ]
})
export class AuthenticationModule { }
