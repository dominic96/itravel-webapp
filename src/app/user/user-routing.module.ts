import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminstratorComponent } from './adminstrator/adminstrator.component';
import { CommuterComponent } from './commuter/commuter.component';
import { UserComponent } from './user.component';

const routes: Routes = [
  {path: '', component: UserComponent,
  children: [
    {path: 'commuter/commuter', component: CommuterComponent},
    {path: 'adminstrator/adminstrator', component: AdminstratorComponent}
  ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }