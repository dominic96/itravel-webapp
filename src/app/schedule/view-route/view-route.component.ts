import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ReactiveFormsModule } from "@angular/forms";
import { ItraveRoute } from '../itrave-route';

import { PrimeNGConfig } from "primeng/api";
import { ScheduleService } from '../schedule.service';
import { MessageService } from "primeng/api";
import { Schedule } from '../schedule';
import { Driver } from 'src/app/user/driver';
import { Vehicle } from 'src/app/fleet/vehicle';
import { UserService } from 'src/app/user/user.service';
import { FleetService } from 'src/app/fleet/fleet.service';

@Component({
  selector: 'app-view-route',
  templateUrl: './view-route.component.html',
  styleUrls: ['./view-route.component.css'],
  providers: [MessageService]
})
export class ViewRouteComponent implements OnInit {

  //input from the AdminComponent, source of all Information
  @Input() public itravelRoutes: ItraveRoute[] = [];

  @Output() private viewByType: EventEmitter<string>;
  @Output() private updateScheduleList: EventEmitter<any>;
 
  public route: ItraveRoute = {routeId: 0, origin: '', destination: '', originStation: '', destinationStation: '', type: '', schedules: 0 };

  statusMessage: string = '';
  routeType: string = "";
  type: string = '';

  scheduleRouteDialogGrid: boolean = false;
  scheduleRouteDialogList: boolean = false;
  dialog: boolean = false;
  
  types: string[] = ["local", "intercity", "international"];

  drivers: Driver[] = [];
  vehicles: Vehicle[] = [];
  



  constructor(private primeConfig: PrimeNGConfig,
    private messageService: MessageService, private userService: UserService, 
    private fleetService: FleetService ) 
  {
    this.viewByType = new EventEmitter<string>();
    this.updateScheduleList = new EventEmitter<any>();
      

  }

  ngOnInit(): void {
    this.primeConfig.ripple = true;
  }
  
  onChange() {
    if(this.routeType.length == 0) return;
    this.viewByType.emit(this.routeType);

  }

  showDialogList(route: ItraveRoute) {
    this.setDriver();
    this.setVehicles();
    this.route = route;
    this.dialog = true;
  }

  setDriver() {

    this.userService.getFreeDrivers()
                        .subscribe(
                          (drivers) => {
                            this.drivers = drivers;
                            this.statusMessage = `Retrieved ${drivers.length} free drivers`;
                            this.showSuccess();
                            console.log(this.statusMessage);
                          },
                          (err) => {
                            this.statusMessage = `Failed to retrieve free users`;
                            this.showError();
                            console.log(`${this.statusMessage} : ${err}`);
                          }
                        )

  }

  setVehicles() {
    this.fleetService.getFreeVehicles()
                        .subscribe(
                          (vehicles) => {
                            this.vehicles = vehicles;
                            this.statusMessage = `Retrieved ${vehicles.length} free Vehicles`;
                            this.showSuccess();
                            console.log(this.statusMessage);
                          },
                          (err) => {
                            this.statusMessage = `Failed to retrieve free vehicles`;
                            this.showError();
                            console.log(`${this.statusMessage} : ${err}`)
                          }
                        )
  }

  //recieves triggered by another event from createSchedule component
  updateSchedule() {
    this.updateScheduleList.emit();

  }

  

  showSuccess() {
    this.messageService.add({severity:'success', summary: 'Success', detail: this.statusMessage});
  }

  showError() {
    this.messageService.add({severity:'error', summary: 'Error', detail: this.statusMessage});
  }


}
