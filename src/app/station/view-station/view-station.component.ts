import { Component, Input, OnInit } from '@angular/core';
import { Station } from '../station';

import { PrimeNGConfig } from "primeng/api";
import { Dock } from '../create-dock/dock';

@Component({
  selector: 'app-view-station',
  templateUrl: './view-station.component.html',
  styleUrls: ['./view-station.component.css']
})
export class ViewStationComponent implements OnInit {

  @Input() public stations: Station[] = [];

  onCreateDockinList: boolean = false;
  onCreateDockinGrid: boolean = false;
  originStation: Station = {stationId:0, name: '', country: '', city: '', area: '', street: '', docks: 0};

  constructor(private primeConfig: PrimeNGConfig) { }

  ngOnInit(): void {
    this.primeConfig.ripple = true;
  }

  createDockList(station: Station) {
    this.originStation = station;
    console.log(`Origin Station: ${this.originStation.name}`);
    this.onCreateDockinList = true;

  }

  createDockGrid(station: Station) {
    this.originStation = station;
    console.log(`Origin Station: ${this.originStation.name}`);
    this.onCreateDockinGrid = true;

  }

}
