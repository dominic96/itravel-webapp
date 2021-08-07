import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from "primeng/api";
import { AdminstratorService } from '../adminstrator/adminstrator.service';

import { Driver } from "../driver";
import { ServiceProvider } from '../service-provider';
import { UserService } from '../user.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css'],
  providers: [MessageService]
})
export class AddUserComponent implements OnInit {


  addUser: boolean = true;
  addSP: boolean = false;
  addStaff: boolean = false;
  addCommuter: boolean = false;
  loading: boolean = false;
  userTypes: any =[{type: "Staff", key:"E"}, {type: "Service Provider", key: "S"}];
  selectedUserType: any = null;
  statusMessage: string = '';

  spForm: FormGroup;
  staffForm: FormGroup;
  driverForm: FormGroup;
  types: string[] = ["Road Transport"];
  posts: string[] = ["Adminstrator", "Driver", "Condutor"];
  securityLevels: string[] = ["Level 1", "Level 2", "Level 3"];
  post: string = "";


  constructor(private fb:FormBuilder, private userService: UserService, private messageService: MessageService,
              private adminService: AdminstratorService, private router: Router) 
  { 
    this.spForm  = this.fb.group({
      name: ['', Validators.required],
      email: ['',Validators.required],
      type: ['', Validators.required],
      description: ['']
    });

    this.staffForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      post: ['' , Validators.required]
    });

    this.driverForm = this.fb.group({
      nationalId: ['', Validators.required],
      clearance: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  initializeForms() {
    this.spForm  = this.fb.group({
      name: ['', Validators.required],
      email: ['',Validators.required],
      type: ['', Validators.required],
      description: ['']
    });

    this.staffForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      post: ['' , Validators.required]
    });

    this.driverForm = this.fb.group({
      nationalId: ['', Validators.required],
      clearance: ['', Validators.required]
    });

  }

  get sf(){return this.staffForm.controls;}

  get df(){return this.driverForm.controls;}

  get spf(){return this.spForm.controls;}

  createForm() {
    this.spForm  = this.fb.group({
      name: ['', Validators.required],
      email: ['',Validators.required],
      type: ['', Validators.required],
      description: ['']
    });

  }

  cancelServiceProvider()
  {
    this.addSP = false;
    this.router.navigate(['/adminstrator/adminstrator']);
  }

  createServiceProvider() {

    //service provider form invalid
    if(this.spForm.invalid){
      this.statusMessage = "Service Provider details missing";
      this.showError();
    }

    this.loading = true;

    //proceed to creating the serviceProvider
    let serviceProvider: ServiceProvider = {id: 0, name: "", email: "", type: "", description: ""};
    serviceProvider.name = this.spf.name.value;
    serviceProvider.email = this.spf.email.value;
    serviceProvider.type = this.spf.type.value;
    serviceProvider.description = this.spf.description.value;

    //calling the service provider
    this.adminService.createServiceProvider(serviceProvider)
                        .subscribe(
                          (res) =>{
                            console.log("Created service Provider Successfully");
                            this.statusMessage = "Created Service Provider successfully";
                            this.showSuccess();
                            this.loading = false;
                            this.initializeForms();
                          },
                          (err) => {
                            console.error(` failed to create ServiceProvider : ${err}`);
                            this.statusMessage = "Failed to create Service Provider , please retry";
                            this.showError();
                            this.loading = false;
                            this.initializeForms();
                            
                          }
                        )


  }

  onAddUser() {

    console.log("in create user")

    if(this.selectedUserType.type == "Staff") {
      console.log("in create user1");
      this.addUser = false;
      this.addStaff = true;
      
    }

    if(this.selectedUserType.type == "Service Provider") {
      this.addUser = false;
      this.addSP = true;
    }
    

  }

  createStaff() {
    
    //driver is created differently from every other staff members
    this.loading = true;
    if(this.sf.post.value == "Driver") {
      let driver: Driver = {driverId: 0, userId: 0, firstname: '', lastname: '', email: '', password: '', nationalId: '', routeStatusId: 0, nextRouteStatusId: 0};
      driver.firstname = this.sf.firstname.value
      driver.lastname = this.sf.lastname.value;
      driver.email = this.sf.email.value;
      driver.password =this.sf.password.value;
      driver.nationalId = this.df.nationalId.value;

      this.userService.createDriver(driver)
                          .subscribe(
                            (res)=>{
                              console.log("Created driver successfully");
                              this.statusMessage = "Created driver successfully";
                              this.showSuccess();
                              this.initializeForms();
                              this.loading = false;
                            },
                            (err)=>{
                              this.statusMessage = `Failed to create Driver , please try again`;
                              console.log(`${this.statusMessage} : ${err}`)
                              this.initializeForms();
                              this.loading= false;

                            }
                          );
      
    }else{

      //create any other type of stuff
      if(this.staffForm.invalid) {
        this.statusMessage = "Staff details missing, complete form";
        this.showError();
        return;
      }

      //create staff code to be added 
    }

 
   

  }

  cancelAddStaff() {
    this.addStaff = false;
    this.router.navigate(['/adminstrator/adminstrator']);
  }

  onChange() {
    this.post = this.sf.post.value;
  }

  showSuccess() {
    this.messageService.add({severity:'success', summary: 'Success', detail: this.statusMessage});
  }

  showError() {
    this.messageService.add({severity:'error', summary: 'Error', detail: this.statusMessage});
  }



}
