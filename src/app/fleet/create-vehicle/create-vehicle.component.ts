import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Vehicle } from '../vehicle';
import { MessageService } from "primeng/api";
import { FleetService } from '../fleet.service';

@Component({
  selector: 'app-create-vehicle',
  templateUrl: './create-vehicle.component.html',
  styleUrls: ['./create-vehicle.component.css'],
  providers: [MessageService]
})
export class CreateVehicleComponent implements OnInit {

  @Input() public fleetId: number = 0;
  vehicleForm: FormGroup;
  types: string[] = ["Std Bus", "Omnibus", "Small Bus"];

  statusMessage: string = "";
  loading: boolean = false;

  constructor(private fb: FormBuilder, private messageService: MessageService, private fleetService: FleetService) {

      this.vehicleForm = this.fb.group({
        plateId: ['', Validators.required],
        type: ['', Validators.required],
        capacity: [0,Validators.required]
      })
   }

  ngOnInit(): void {
  }

  initializeVehicleForm() {
    this.vehicleForm = this.fb.group({
      plateId: ['', Validators.required],
      type: ['', Validators.required],
      capacity: [0,Validators.required]
    })

  }

  get v(){ return this.vehicleForm.controls;}

  createVehicle() {

    if (this.vehicleForm.invalid) {
      this.statusMessage = "Vehicle details missing !";
      this.showError();
      console.log(this.statusMessage);
      return;
      
    }

    //Add vehicle
    this.loading = true;
    
      let vehicle: Vehicle = {vehicleId: 0, license_plate: '', type: '', fleetId: 0, capacity:0, driverId: 0, routeStatusId: 0};

      vehicle.license_plate = this.v.plateId.value;
      vehicle.type = this.v.type.value;
      vehicle.fleetId = this.fleetId;
      vehicle.capacity = this.v.capacity.value;

      this.fleetService.createVehicle(vehicle).subscribe(
        (res)=> {
          
          this.statusMessage = "Created Vehicle successfully";
          this.showSuccess();
          console.log(this.statusMessage);
          this.loading = false;
          this.initializeVehicleForm();
        },
        (err)=> {
          
          this.statusMessage = "Failed tp create vehicle, retry";
          this.showError();
          console.log(`${this.statusMessage} : ${err}`);
          this.loading = true;
          this.initializeVehicleForm();
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
