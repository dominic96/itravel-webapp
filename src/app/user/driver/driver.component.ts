import { Component, OnInit } from '@angular/core';
import { Driver } from '../driver';
import { MessageService } from "primeng/api";
import { DriverService } from './driver.service';
import { ScheduleService } from 'src/app/schedule/schedule.service';
import { Trip } from 'src/app/schedule/view-trips/trips';

@Component({
  selector: 'app-driver',
  templateUrl: './driver.component.html',
  styleUrls: ['./driver.component.css'],
  providers: [MessageService]
})
export class DriverComponent implements OnInit {

  sideMenu: boolean = false;
  statusMessage: string = '';
  driver: Driver = {driverId: 0, userId: 0, firstname: '', lastname: '',email: '', password: '', nationalId: '', routeStatusId: 0, nextRouteStatusId: 0};

  trips: Trip[] = [];


  constructor(private messageService: MessageService, private driverService: DriverService,
              private scheduleService: ScheduleService)
  {
    this.setTrips();
   }

  ngOnInit(): void {
    this.driver = this.driverService.driverValue;
    this.setTrips();
    
  }

  verifyTicket() {

  }

  logout() {

  }

  setTrips() {
    this.scheduleService.getDriversTrips(this.driverService.driverValue.driverId)
                            .subscribe(
                              (trips) => {
                                this.statusMessage = `Retrieved ${trips.length} trips`;
                                this.trips = trips;
                                this.showSuccess();
                                console.log(this.statusMessage);
                              },
                              (err) => {
                                this.statusMessage  = `Failed to Retrieve Trips for Driver`;
                                console.log(`${this.statusMessage} : ${err}`);
                                this.showError();
                              }

                            )
  }

  updateTrip(event: any) {
    let trip: Trip = event;
    this.scheduleService.updateTripStatus(trip)
                          .subscribe(
                            (res) =>{
                              this.statusMessage = "Bus Status Updated";
                              this.showSuccess();
                              console.log(this.statusMessage);
                            },
                            (err) => {
                              this.statusMessage = `Bus update Failed, try again`;
                              this.showError();
                              console.log(`${this.statusMessage}: ${err}`);
                            }
                          )

  }

  showSuccess() {
    this.messageService.add({severity:'success', summary: 'Success', detail: this.statusMessage});
  }

  showError() {
    this.messageService.add({severity:'error', summary: 'Error', detail: this.statusMessage});
  }

}
