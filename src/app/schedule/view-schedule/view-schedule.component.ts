import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Station } from 'src/app/station/station';

import { MessageService } from "primeng/api";

import { Schedule } from '../schedule';
import { Country } from 'src/app/station/country';

@Component({
  selector: 'app-view-schedule',
  templateUrl: './view-schedule.component.html',
  styleUrls: ['./view-schedule.component.css'],
  providers: [MessageService]
})
export class ViewScheduleComponent implements OnInit {

  @Input() public schedules: Schedule[] = [];
  @Input() public originStation: string[] = [];
  @Input() public destinationStation: string[] = [];
  @Input() public countries: string[] = [];
  

  @Output() private buyTicket: EventEmitter<Schedule>;
  @Output() private searchSchedule: EventEmitter<string[]>;
  @Output() private updateSearchOptions: EventEmitter<string>;


  origin: string = "";
  country: string =  "";
  destination: string = "";
  statusMessage: string = "";
  booked: string = "booked";

  constructor(private messageService: MessageService) { 
    this.buyTicket = new EventEmitter<Schedule>();
    this.searchSchedule = new EventEmitter<string[]>();
    this.updateSearchOptions = new EventEmitter<string>();
  }

  ngOnInit(): void {
  }

  public onBuyTicket(schedule: Schedule) {
    console.log(`Purchasing ticket for schedule: ${schedule.scheduleId}`);
    this.buyTicket.emit(schedule);
    console.log("Emmited Event");
  }

  onChange() {
    console.log(` origin: ${this.origin} destination: ${this.destination}`);
    //both fields should be selected for a search to occur
    if(this.origin == "" || this.origin == null) {
      this.statusMessage = `select Origin to make a search`;
      this.showWarning();
    }else if (this.destination == "" || this.destination == null) {
      this.statusMessage = `select Destination to make a search`;
      this.showWarning();
    }else if (this.origin == this.destination ) {
      this.statusMessage = `select different origin/destination to make a search`;
      this.showWarning();
    }else {

      //if both fields are select proceed
      console.log("Proceeding with search");
      this.searchSchedule.emit([this.origin,this.destination]);

    }
  }


  //sends a country via an event to the Commuter component to 
  //trigger setting of the other search parameters
  onUpdateSearchOption() {

    if(this.country == "" || this.country == null) {
      this.statusMessage =` Select country`;
      this.showWarning();
      return;
    }else {

      this.updateSearchOptions.emit(this.country);
      console.log("Emitted event in Create schedule with country " + this.country);
      
    }

  }

  showWarning() {
    this.messageService.add({severity:'info', summary: 'Info', detail: this.statusMessage});
  }

  showError() {
    this.messageService.add({severity:'error', summary: 'Error', detail: this.statusMessage});
  }

}
