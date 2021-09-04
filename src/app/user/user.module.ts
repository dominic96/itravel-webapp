import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { CommuterComponent } from './commuter/commuter.component';
import { AdminstratorComponent } from './adminstrator/adminstrator.component';
import { FleetModule } from "../fleet/fleet.module";
import { ScheduleModule } from "../schedule/schedule.module";



/**
 * ngprime modules
 */
import { SidebarModule } from "primeng/sidebar";
import { ButtonModule } from "primeng/button";
import { CardModule } from "primeng/card";
import { TabViewModule } from "primeng/tabview";
import { DataViewModule } from "primeng/dataview";
import { Panel, PanelModule } from "primeng/panel";
import { Ripple, RippleModule } from "primeng/ripple";
import { InputTextModule } from "primeng/inputtext";
import { DropdownModule } from "primeng/dropdown";
import { BadgeModule} from "primeng/badge";
import { DialogModule } from "primeng/dialog";
import { ToastModule } from "primeng/toast";
import { AvatarModule } from "primeng/avatar";
import { MenubarModule } from "primeng/menubar";
import { RadioButtonModule } from "primeng/radiobutton";
import { ProgressBarModule } from "primeng/progressbar";
import { InputTextareaModule } from "primeng/inputtextarea";
import { InputMaskModule } from "primeng/inputmask";

import { QRCodeModule } from "angular2-qrcode";
import { StationModule } from "../station/station.module";

import { RoutesComponent } from './commuter/routes/routes.component';
import { TicketComponent } from '../ticket/ticket.component';
import { QrcodeComponent } from "../qrcode/qrcode.component";
import { AddUserComponent } from './add-user/add-user.component';
import { DriverComponent } from './driver/driver.component';





@NgModule({
  declarations: [
    UserComponent,
    CommuterComponent,
    AdminstratorComponent,
    RoutesComponent,
    TicketComponent,
    QrcodeComponent,
    AddUserComponent,
    DriverComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    SidebarModule,
    ButtonModule,
    CardModule,
    TabViewModule,
    DataViewModule,
    PanelModule,
    RippleModule,
    InputTextModule,
    DropdownModule,
    BadgeModule,
    DialogModule,
    ToastModule,
    AvatarModule,
    QRCodeModule,
    MenubarModule,
    StationModule,
    RadioButtonModule,
    FormsModule,
    ReactiveFormsModule,
    ProgressBarModule,
    InputTextareaModule,
    FleetModule,
    ScheduleModule,
    InputMaskModule

  ],

  exports:[
    AdminstratorComponent,
    QrcodeComponent
  ]
})
export class UserModule { }
