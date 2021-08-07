import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateScheduleComponent } from './create-schedule/create-schedule.component';
import { ScheduleComponent } from './schedule.component';
import { ViewRouteComponent } from './view-route/view-route.component';
import { ViewScheduleComponent } from './view-schedule/view-schedule.component';

const routes: Routes = [
    {path: '', component: ScheduleComponent,
    children: [
      {path: 'admin/view/schedule', component: ViewScheduleComponent},
      {path: 'admin/view/routes', component: ViewRouteComponent},
      {path: 'admin/create/schedule', component: CreateScheduleComponent}
    ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ScheduleRoutingModule { }
