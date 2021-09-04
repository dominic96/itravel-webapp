import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FleetService } from 'src/app/fleet/fleet.service';
import { Vehicle } from 'src/app/fleet/vehicle';
import { Driver } from 'src/app/user/driver';
import { UserService } from 'src/app/user/user.service';
import { ItraveRoute } from '../itrave-route';

import { MessageService } from "primeng/api";
import { Schedule } from '../schedule';
import { ScheduleService } from '../schedule.service';


@Component({
  selector: 'app-create-schedule',
  templateUrl: './create-schedule.component.html',
  styleUrls: ['./create-schedule.component.css'],
  providers: [MessageService]
})
export class CreateScheduleComponent implements OnInit {

  scheduleForm: FormGroup;

  @Input() drivers: Driver[] = [];
  @Input() vehicles: Vehicle[] = [];
  @Input() public route: ItraveRoute[] = [];

  @Input() public routeId: number = 0;

  //event to update schedules
  @Output() private updateScheduleList: EventEmitter<any>;
 
  
  statusMessage: string = '';
  loading: boolean = false;


  constructor(private fb: FormBuilder, private userService: UserService, private fleetService: FleetService,
              private messageService: MessageService, private scheduleService: ScheduleService) 
  { 
    this.scheduleForm = fb.group({
      departure: ['', Validators.required],
      arrival: ['', Validators.required],
      vehicleId:[0, Validators.required],
      driverId: [0, Validators.required],
      price: [0,Validators.required]
    })

    this.updateScheduleList = new EventEmitter<any>();
  }

  ngOnInit(): void {
    console.log("Initialized Create schedule");
    
  }

  initiliazeScheduleForm() {

    this.scheduleForm = this.fb.group({
      departure: ['', Validators.required],
      arrival: ['', Validators.required],
      vehicleId:[0, Validators.required],
      driverId: [0, Validators.required],
      price: [0,Validators.required]
    })

  }

  get scheduleFormControls(){return  this.scheduleForm.controls}

  scheduleRoute() {

    console.log(`RouteId : ${this.routeId}`);
    if(this.scheduleForm.invalid) {
      this.statusMessage = `Schedule details missing, please complete form`;
      this.showError();
      console.log(this.statusMessage);
      this.initiliazeScheduleForm();
      return;
    }

    //creating schedule
    this.loading = true;
    let schedule: Schedule = {scheduleId:0, vehicleId:0, driverId: 0, routeId: 0,departureTime: '', arrivalTime: '', origin: '', destination: '', status: '', price: 0,serviceProvider: ''};
    schedule.routeId = this.routeId;
    schedule.vehicleId = this.scheduleFormControls.vehicleId.value;
    schedule.driverId = this.scheduleFormControls.driverId.value;
    schedule.status = "true";
    schedule.price = this.scheduleFormControls.price.value;
    schedule.departureTime = this.parseDate(this.scheduleFormControls.departure.value);
    schedule.arrivalTime = this.parseDate(this.scheduleFormControls.arrival.value);

    this.scheduleService.createSchedule(schedule)
                          .subscribe(
                            (res) => {
                              this.statusMessage = `Route Schedule Successfully`;
                              this.showSuccess();
                              console.log(this.statusMessage);
                              this.loading = false;
                              this.initiliazeScheduleForm();
                              this.updateScheduleList.emit();
                            },
                            (err) => {
                              this.statusMessage = ` Failed to create Schedule Route, please try again later`;
                              this.showError();
                              console.log(this.statusMessage);
                              this.loading = false;
                              this.initiliazeScheduleForm();
                            }
                          )

    console.log(`Full Date: ${this.parseDate(this.scheduleFormControls.departure.value)}`)


  }

 

  private parseDate(inputDate: Date): string{

    let day: string = inputDate.getDay().toString();
    day = (day.length<2) ? `0${day}` : day;
    console.log(`Day: ${day}`);

    let month: string = inputDate.getMonth().toString();
    month = (month.length<2) ? `0${month}`: month;
    console.log(`Month : ${month}`);
    
    let year: string = inputDate.getFullYear().toString();
    console.log(`year: ${year}`);

    //time
    let hours: string = inputDate.getHours().toString();
    hours = (hours.length<2) ? `0${hours}` : hours;
    console.log(`Hpurs: ${hours}`);

    let minutes: string = inputDate.getMinutes().toString();
    minutes = (minutes.length)<2 ? `0${minutes}`: minutes;
    console.log(`Minutes: ${minutes}`);

    let seconds: string = inputDate.getSeconds().toString();
    seconds = (seconds.length<2) ? `0${seconds}` : seconds;
    console.log(`Seconds: ${seconds}`);

    //complete date
    let outputDate: string = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
    console.log(`Full Date: ${outputDate}`);
    return outputDate;


  }

  showSuccess() {
    this.messageService.add({severity:'success', summary: 'Success', detail: this.statusMessage});
  }

  showError() {
    this.messageService.add({severity:'error', summary: 'Error', detail: this.statusMessage});
  }



}
