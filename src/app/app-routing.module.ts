import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { TicketComponent } from './ticket/ticket.component';


const routes: Routes = [
  
  {path: 'authentication',loadChildren: () => import('./authentication/authentication.module').then(m => m.AuthenticationModule)},
  {path: 'user',loadChildren: () => import('./user/user.module').then(m => m.UserModule)},
  {path: 'ticket', component: TicketComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
