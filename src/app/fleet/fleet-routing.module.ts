import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateFleetComponent } from './create-fleet/create-fleet.component';
import { FleetComponent } from './fleet.component';
import { ViewFleetComponent } from './view-fleet/view-fleet.component';

const routes: Routes = [
  {
    path: '', component: FleetComponent,
    children: [
      {path: 'createfleet/createfleet', component: CreateFleetComponent},
      {path: 'viewfleet/viewfleet', component: ViewFleetComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FleetRoutingModule { }
