import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { CommuterComponent } from './commuter/commuter.component';
import { AdminstratorComponent } from './adminstrator/adminstrator.component';



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

import { RoutesComponent } from './commuter/routes/routes.component';
import { TicketComponent } from '../ticket/ticket.component';




@NgModule({
  declarations: [
    UserComponent,
    CommuterComponent,
    AdminstratorComponent,
    RoutesComponent,
    TicketComponent
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
    AvatarModule
  ],

  exports:[
    AdminstratorComponent
  ]
})
export class UserModule { }
