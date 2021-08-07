import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { QrcodeComponent } from './qrcode/qrcode.component';


import { TicketComponent } from './ticket/ticket.component';


const routes: Routes = [
  
  {path: 'authentication',loadChildren: () => import('./authentication/authentication.module').then(m => m.AuthenticationModule)},
  {path: 'user',loadChildren: () => import('./user/user.module').then(m => m.UserModule)},
  {path: 'station',loadChildren: () => import('./station/station.module').then(m => m.StationModule)},
  {path: 'fleet', loadChildren: () => import('./fleet/fleet.module').then(m=> m.FleetModule)},
  {path: 'schedule', loadChildren: ()=> import('./schedule/schedule.module').then(m => m.ScheduleModule)},
  {path: 'ticket', component: TicketComponent},
  {path: 'qrcode', component: QrcodeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
