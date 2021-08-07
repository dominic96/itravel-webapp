import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MessageService } from "primeng/api";
import { AdminstratorService } from 'src/app/user/adminstrator/adminstrator.service';
import { ServiceProvider } from 'src/app/user/service-provider';
import { Fleet } from '../fleet';
import { FleetService } from '../fleet.service';

@Component({
  selector: 'app-create-fleet',
  templateUrl: './create-fleet.component.html',
  styleUrls: ['./create-fleet.component.css'],
  providers: [MessageService]
})
export class CreateFleetComponent implements OnInit {

  serviceProviders: ServiceProvider[] = [];
  loading: boolean = false;
  statusMessage: string = '';

  fleetForm: FormGroup;
  constructor(private fb: FormBuilder, private messageService: MessageService, private adminService: AdminstratorService
              , private fleetService: FleetService) 
  { 
    this.fleetForm = fb.group({
      name: ['', Validators.required],
      size: [0, Validators.required],
      serviceProvider: ['', Validators.required]
    })
  }

  ngOnInit(): void {
    this.getServiceProviders();
    
  }

  initFleetForm() {
    this.fleetForm = this.fb.group({
      name: ['', Validators.required],
      size: [0, Validators.required],
      serviceProvider: ['', Validators.required]
    })

  }

  get fleetFormControls(){return this.fleetForm.controls;}

  createFleet() {

    if(this.fleetForm.invalid) {
      this.statusMessage = "Fleet details missing !";
      this.showError();
      console.log(`${this.statusMessage}`);
      return;
    }

    //create fleet
    this.loading = true;
    let fleet: Fleet = {name: '', serviceProvider: '', size: 0, id: 0 };
    fleet.name = this.fleetFormControls.name.value;
    fleet.serviceProvider = this.fleetFormControls.serviceProvider.value;
    fleet.size = this.fleetFormControls.size.value;

    //call service
    this.fleetService.createFleet(fleet)
                        .subscribe(
                          (res)=> {
                            this.statusMessage = "Created Fleet Successfully";
                            this.showSuccess();
                            console.log(this.statusMessage);
                            this.loading = false;
                            this.initFleetForm();
                          },
                          (err)=> {
                            this.statusMessage = "Failed to create Fleet";
                            this.showError();
                            console.log(`${this.statusMessage} : ${err}`);
                            this.loading = false;
                            this.initFleetForm();
                            
                          }
                        )

  }

  getServiceProviders() {
    this.adminService.getServiceProviders()
                        .subscribe(
                          (sp) => {
                            this.serviceProviders = sp;
                            console.log(`successfully fetched ${sp.length} Service Providers`);
                            this.statusMessage = "Service Providers Fetched";
                            this.showSuccess();
                          },
                          (err)=>{
                            this.statusMessage = "Failed to retrieve Service Providers";
                            console.log(`${this.statusMessage} : ${err}`);
                            this.showError();
                          }
                        );
  }

  cancelFleet() {

  }

  showSuccess() {
    this.messageService.add({severity:'success', summary: 'Success', detail: this.statusMessage});
  }

  showError() {
    this.messageService.add({severity:'error', summary: 'Error', detail: this.statusMessage});
  }

}
