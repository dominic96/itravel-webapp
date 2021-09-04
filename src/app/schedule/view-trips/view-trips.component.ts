import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Trip } from './trips';

@Component({
  selector: 'app-view-trips',
  templateUrl: './view-trips.component.html',
  styleUrls: ['./view-trips.component.css']
})
export class ViewTripsComponent implements OnInit {

  @Input() public trips: Trip[] = [];
  @Output() private updateTrip: EventEmitter<Trip>;
  options: string[] = ["docked", "enRoute", "delayed"];
  sampleTrips: Trip[] = [];

  status : string = '';
  constructor() { 
     this.updateTrip = new EventEmitter<Trip>();
  }

  ngOnInit(): void {
    this.setTrips();
  }

  OnUpdateTrip(trip: Trip){
    trip.status = this.status;
    this.updateTrip.emit(trip);

  }

  setTrips() {
    this.sampleTrips = [
      {routeStatusId: 1, driverId: 1, scheduleId: 1, origin: "Mutare", destination: "Harare", arrivalTime: "1300Hrs", departureTime: "0900Hrs", status:"n/a"},
      {routeStatusId: 2, driverId: 2, scheduleId: 2, origin: "Mutare", destination: "Bulawayo", arrivalTime: "0600Hrs", departureTime: "2100Hrs", status:"n/a"}

    ]
  }

}
