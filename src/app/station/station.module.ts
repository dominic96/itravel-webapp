import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from "@angular/forms";

import { StationRoutingModule } from './station-routing.module';
import { StationComponent } from './station.component';


import { CardModule } from "primeng/card";
import { InputTextModule } from "primeng/inputtext";
import { DropdownModule } from "primeng/dropdown";
import { MultiSelectModule } from "primeng/multiselect";
import { ButtonModule } from "primeng/button";
import { CreateStationComponent } from './create-station/create-station.component';
import { ProgressBarModule } from "primeng/progressbar";
import { ToastModule } from "primeng/toast";
import { ViewStationComponent } from './view-station/view-station.component';
import { DataViewModule } from "primeng/dataview";
import { RippleModule } from "primeng/ripple";
import { BadgeModule } from "primeng/badge";
import { CreateDockComponent } from './create-dock/create-dock.component';
import { DialogModule } from "primeng/dialog";

@NgModule({
  declarations: [
    StationComponent,
    CreateStationComponent,
    ViewStationComponent,
    CreateDockComponent
  ],
  imports: [
    CommonModule,
    StationRoutingModule,
    ReactiveFormsModule,
    CardModule,
    InputTextModule,
    DropdownModule,
    MultiSelectModule,
    FormsModule,
    ButtonModule,
    ProgressBarModule,
    ToastModule,
    DataViewModule,
    RippleModule,
    BadgeModule,
    DialogModule
    
  ],
  exports: [
    StationComponent,
    CreateStationComponent,
    ViewStationComponent
  ]
})
export class StationModule { }
