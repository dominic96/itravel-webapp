import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddUserComponent } from './add-user/add-user.component';
import { AdminstratorComponent } from './adminstrator/adminstrator.component';
import { CommuterComponent } from './commuter/commuter.component';
import { DriverComponent } from './driver/driver.component';
import { UserComponent } from './user.component';

const routes: Routes = [
  {path: '', component: UserComponent,
  children: [
    {path: 'commuter/commuter', component: CommuterComponent},
    {path: 'adminstrator/adminstrator', component: AdminstratorComponent},
    {path: 'adduser/adduser', component: AddUserComponent},
    {path: 'driver', component: DriverComponent}
  ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
