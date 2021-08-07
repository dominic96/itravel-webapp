import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";


/**ngprime modules */
import { InputText, InputTextModule } from "primeng/inputtext";
import { DropdownModule } from "primeng/dropdown";
import { PasswordModule } from "primeng/password";
import { ButtonModule } from "primeng/button";
import { SidebarModule } from "primeng/sidebar";
import { TabViewModule } from "primeng/tabview";
import { DataViewModule } from "primeng/dataview";
import { PanelModule } from "primeng/panel";
import { RippleModule } from "primeng/ripple";
import { DialogModule } from "primeng/dialog";

/**Project Modules */

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
//import { TicketComponent } from './ticket/ticket.component';

/**feature modules */
import { AuthenticationModule } from "./authentication/authentication.module";
import { UserModule } from "./user/user.module";
import { StationModule } from "./station/station.module";
import { FleetModule } from "./fleet/fleet.module";
import { ScheduleModule } from "./schedule/schedule.module";
//import { RoutesComponent } from './routes/routes.component';

import {  JwtInterceptor } from "./utility/jwt.interceptor";
import { AuthenticationGuard } from "./utility/authentication.guard";


//BarcodeModule
import { QRCodeModule } from "angular2-qrcode";
//import { QrcodeComponent } from './qrcode/qrcode.component';


@NgModule({
  declarations: [
    AppComponent
 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    AuthenticationModule,
    UserModule,
    InputTextModule,
    DropdownModule,
    PasswordModule,
    ButtonModule,
    SidebarModule,
    TabViewModule,
    DataViewModule,
    PanelModule,
    RippleModule,
    QRCodeModule,
    DialogModule,
    StationModule,
    FleetModule,
    ScheduleModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor , multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
