import { Component, Input, OnInit } from '@angular/core';
import { Fleet } from '../fleet';

@Component({
  selector: 'app-view-fleet',
  templateUrl: './view-fleet.component.html',
  styleUrls: ['./view-fleet.component.css']
})
export class ViewFleetComponent implements OnInit {

  @Input() public fleets: Fleet[] = [];
  fleetId: number = 0;
  createVehicleinList: boolean = false;
  createVehicleinGrid: boolean = false;


  constructor() { }

  ngOnInit(): void {
  }

  onListCreateVehicle(fleetId: number) {
    this.fleetId = fleetId;
    this.createVehicleinList = true;
  }

  onGridCreateVehicle(fleetId: number) {
    this.fleetId = fleetId;
    this.createVehicleinGrid = true;
  }

}
