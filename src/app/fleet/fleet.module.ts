import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from "@angular/forms";

import { FleetRoutingModule } from './fleet-routing.module';
import { FleetComponent } from './fleet.component';
import { CreateFleetComponent } from './create-fleet/create-fleet.component';
import { ViewFleetComponent } from './view-fleet/view-fleet.component';

import { ToastModule } from "primeng/toast";
import { CardModule } from "primeng/card";
import { InputTextModule } from "primeng/inputtext";
import { InputNumber, InputNumberModule } from "primeng/inputnumber";
import { DropdownModule } from "primeng/dropdown";
import { ProgressBarModule } from "primeng/progressbar";
import { ButtonModule } from "primeng/button";
import { DataViewModule } from "primeng/dataview";
import { BadgeModule } from "primeng/badge";
import { InputMask, InputMaskModule } from "primeng/inputmask";
import { DialogModule } from "primeng/dialog";


import { CreateVehicleComponent } from './create-vehicle/create-vehicle.component';


@NgModule({
  declarations: [
    FleetComponent,
    CreateFleetComponent,
    ViewFleetComponent,
    CreateVehicleComponent
  ],
  imports: [
    CommonModule,
    FleetRoutingModule,
    ReactiveFormsModule,
    ToastModule,
    CardModule,
    InputTextModule,
    InputNumberModule,
    DropdownModule,
    ProgressBarModule,
    ButtonModule,
    DataViewModule,
    BadgeModule,
    InputMaskModule,
    DialogModule
  ],
  exports: [
    CreateFleetComponent,
    ViewFleetComponent
  ]
})
export class FleetModule { }
