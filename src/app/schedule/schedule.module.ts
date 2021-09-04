import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from "@angular/forms";

import { ScheduleRoutingModule } from './schedule-routing.module';
import { ScheduleComponent } from './schedule.component';
import { ViewScheduleComponent } from './view-schedule/view-schedule.component';
import { ViewRouteComponent } from './view-route/view-route.component';

//Primeng Modules
import { DataViewModule } from "primeng/dataview";
import { ButtonModule } from "primeng/button";
import { RippleModule } from "primeng/ripple";
import { CreateScheduleComponent } from './create-schedule/create-schedule.component';
import { CardModule } from "primeng/card";
import { CalendarModule } from "primeng/calendar";
import { DropdownModule } from "primeng/dropdown";
import { InputNumberModule } from "primeng/inputnumber";
import { Toast, ToastModule } from "primeng/toast";
import { DialogModule } from "primeng/dialog";
import { ProgressBarModule } from "primeng/progressbar";
import { InputText, InputTextModule } from "primeng/inputtext";
import { ViewTripsComponent } from './view-trips/view-trips.component';


@NgModule({
  declarations: [
    ScheduleComponent,
    ViewScheduleComponent,
    ViewRouteComponent,
    CreateScheduleComponent,
    ViewTripsComponent
  ],
  imports: [
    CommonModule,
    ScheduleRoutingModule,
    DialogModule,
    DataViewModule,
    ButtonModule,
    RippleModule,
    CardModule,
    DropdownModule,
    CalendarModule,
    InputNumberModule,
    ReactiveFormsModule,
    ToastModule,
    ProgressBarModule,
    InputTextModule,
    FormsModule
 
  ],
  exports:[
    ViewScheduleComponent,
    ViewRouteComponent,
    ViewTripsComponent
  ]
})
export class ScheduleModule { }
