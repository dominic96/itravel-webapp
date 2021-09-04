import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { Adminstrator } from './adminstrator';
import { AdminstratorService } from './adminstrator.service';
import { MenuItem } from "primeng/api";
import { Station } from 'src/app/station/station';
import { Fleet } from 'src/app/fleet/fleet';
import { StationService } from 'src/app/station/station.service';

import { MessageService } from "primeng/api";
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { FleetService } from 'src/app/fleet/fleet.service';
import { ItraveRoute } from 'src/app/schedule/itrave-route';
import { ScheduleService } from 'src/app/schedule/schedule.service';
import { Schedule } from 'src/app/schedule/schedule';
import { Ticket } from 'src/app/ticket/ticket';
import { Router } from '@angular/router';
import { Country } from 'src/app/station/country';
import { City } from 'src/app/station/city';


/**
 * @author Dominic Mundirewa
 */
@Component({
  selector: 'app-adminstrator',
  templateUrl: './adminstrator.component.html',
  styleUrls: ['./adminstrator.component.css'],
  providers: [MessageService]
})
export class AdminstratorComponent implements OnInit {

  sideMenu: boolean =  false;
  createStation: boolean = false;
  viewStations: boolean = false;
  createFleet: boolean = false;
  viewFleets: boolean = false;
  ticketDialog: boolean = false;

  statusMessage: string = "";

  currentUsers: User[];
  menuItems: MenuItem[] = [];
  stations: Station[] = []; 
  fleets: Fleet[] = [];
  routes: ItraveRoute[] = [];
  adminstrator: Adminstrator;

  //schedules
  localSchedules: Schedule[] = [];
  intercitySchedules: Schedule[] = [];
  internationalSchedules: Schedule[] = [];
  ruralSchedules: Schedule[] = [];

  //locations
  public areas: string[] = [];
  public cities: string[] = [];
  public countries: Country[] = [];
  public countryList: string[] = [];

  ticket: Ticket = {ticketId: 0, routeId: 0, price: 0, token: '', origin: '', destination: '', departureTime: '', scheduleId: 0, originStation: ''}; 

  constructor(private adminstratorService: AdminstratorService, private stationsService: StationService,
              private messageService: MessageService, private fleetService: FleetService,
              private scheduleService: ScheduleService, private router: Router) 
  { 
    this.currentUsers = [];
    this.adminstrator =  {userId:0, adminstratorId: 0, firstname:'', lastname: '', email:''};
  }

  ngOnInit(): void {
    this.setAdmin();
    this.setMenuItems();
    this.setRoutes();
    this.setRuralSchedules();
    this.setLocalSchedules();
    this.setIntercitySchedules();
    this.setInternationalSchedules();
    this.setCountriesList();

  }


  public getLoggedInUsers() {
    this.adminstratorService.getLoggedInUsers()
                              .subscribe(users => this.currentUsers = users);
  }


  private castToAdminstrator(adminstratorJson: Adminstrator): void {
    this.adminstrator = {
      userId: (adminstratorJson as any).userId,
      adminstratorId: (adminstratorJson as any).adminstratorId,
      firstname: (adminstratorJson as any).firstname,
      lastname: (adminstratorJson as any).lastname,
      email: (adminstratorJson as any).email
    }

  }

  setAdmin() {
    this.adminstratorService.getAccount()
                              .subscribe(
                                (admin) => {
                                  this.adminstrator = admin;
                                  this.statusMessage = `Admin: ${this.adminstrator.email} logged in successfully`;
                                  this.showSuccess();
                                  this.setCountriesList();
                                  console.log(this.statusMessage);

                                },
                                (err) => {
                                  this.statusMessage = `Admin: Failed to login`;
                                  this.showError();
                                  this.router.navigate(['login/login']);
                                  console.log(`${this.statusMessage} : ${err}`);
                                }
                              )
  }


  logout() {

    this.adminstratorService.logout()
                              .subscribe(
                                (res) =>{
                                  this.statusMessage = `Logged out successfully`;
                                  this.showSuccess();
                                  console.log(this.statusMessage);
                                },
                                (err) => {
                                  this.statusMessage = `Failed to logout`;
                                  this.showError();
                                  console.log(`${this.statusMessage} : ${err}`);
                                }
                              )

    

  }

  setMenuItems() {
    this.menuItems = [
      {
        label:"Add",
        items:[
          {
            label:"Station", command: ()=>{this.createStation = true}
          },
          {
            label: "Fleet", command: ()=>{this.createFleet = true;}
          },
       
        
        ]
      },
      {
        label: "View",
        items:[
          {
            label:"Stations", 
            command: ()=>{
              this.setStations();
              this.viewStations = true;
            }

          },
          {
            label: "Fleets",
            command: ()=> {
              this.setFleets();
              this.viewFleets = true;
            }
          }
        ]
      },
      {
        label: "Users",
        items:[
          {
            label: "Add", routerLink:(["/adduser/adduser"])
          }
        ]
      }
    ]
  }

  setStations() {

    //fetching stations using StationService
    this.stationsService.getStations()
                          .subscribe(
                            (stations)=> {
                              this.stations = stations;
                              console.log(`fetched ${stations.length} stations`);
                              this.statusMessage = "Successfully fetched Stations";
                              this.showSuccess();
                            },
                            (error)=> {
                              console.log(error);
                              console.log(`Failed to fetch stations ${error}` );
                              this.statusMessage = "Failed to fetch stations, refresh webpage";
                              this.showError();
                            }
                          )
  }

  setFleets() {
    this.fleetService.getAllFleets()
                        .subscribe(
                          (fleets)=> {
                            this.fleets = fleets;
                            console.log(`fetched ${fleets.length} fleets`);
                            this.statusMessage = "successfully fetched fleets";
                            this.showSuccess();
                          },
                          (error)=> {
                            console.error(`failed to fetch fleets ${error}`);
                            this.statusMessage = "Failed to retrieve Fleets , please retry";
                            this.showError();
                          }
                        )

  }

  setRoutes(type?: string) {
    if(type){
      this.scheduleService.getRoutes(type)
                            .subscribe(
                              (routes)=> {
                                this.routes = routes;
                                this.statusMessage = `retrieved ${type} ${routes.length} routes`;
                                this.showSuccess();
                                console.log(this.statusMessage);
                              },
                              (err) => {
                                this.statusMessage = "Failed to retrieve routes, try later!";
                                this.showError();
                                console.error(`${this.statusMessage} , ${err}`);
                              }
                            );
                            
    }else{
      this.scheduleService.getAllRoutes()
                            .subscribe(
                              (routes) =>{
                                this.routes = routes;
                                this.statusMessage = `retrieved ${routes.length} routes`;
                                this.showSuccess();
                                this.setCountriesList();
                                this.setCountries();
                                console.log(this.statusMessage);
                              },
                              (err) =>{
                                
                                this.statusMessage = `Failed to retrieve routes`;
                                this.showError();
                                console.log(this.statusMessage);
                              }
                            )
    }
    
  }

  setLocalSchedules() {
    let type = "local";
    this.scheduleService.getSchedulesByType(type)
                          .subscribe(
                            (schedules) => {
                              this.localSchedules = schedules;
                              this.statusMessage = `Retrieved ${schedules.length} ${type} schedules`;
                              this.showSuccess();
                              console.log(this.statusMessage);
                            },
                            (err) => {
                              this.statusMessage =`Failed to fetch ${type} schedules`;
                              this.showError();
                              console.log(this.statusMessage);
                            }
                          );
    
  }

  setIntercitySchedules() {
    let type = "intercity";
    this.scheduleService.getSchedulesByType(type)
                          .subscribe(
                            (schedules) => {
                              this.intercitySchedules = schedules;
                              this.statusMessage = `Retrieved ${schedules.length} ${type} schedules`;
                              this.showSuccess();
                              console.log(this.statusMessage);
                            },
                            (err) => {
                              this.statusMessage =`Failed to fetch ${type} schedules`;
                              this.showError();
                              console.log(this.statusMessage);
                            }
                          );
    
  }
  setInternationalSchedules() {
    let type = "international";
    this.scheduleService.getSchedulesByType(type)
                          .subscribe(
                            (schedules) => {
                              this.internationalSchedules = schedules;
                              this.statusMessage = `Retrieved ${schedules.length} ${type} schedules`;
                              this.showSuccess();
                              console.log(this.statusMessage);
                            },
                            (err) => {
                              this.statusMessage =`Failed to fetch ${type} schedules`;
                              this.showError();
                              console.log(this.statusMessage);
                            }
                          );
    
  }

  setRuralSchedules() {
    let type =  "rural";
    this.scheduleService.getSchedulesByType(type)
                          .subscribe(
                            (schedules) => {
                              this.ruralSchedules = schedules;
                              this.statusMessage = `Retrieved ${schedules.length} ${type} schedules`;
                              this.showSuccess();
                              console.log(this.statusMessage);
                            },
                            (err) => {
                              this.statusMessage =`Failed to fetch ${type} schedules`;
                              this.showError();
                              console.log(this.statusMessage);
                            }
                          );
    
  }

  confirmTicketPurchase(schedule: Schedule) {
    this.ticket.routeId  = schedule.routeId;
    this.ticket.scheduleId = schedule.scheduleId;
    this.ticket.originStation = schedule.origin;
    this.ticket.origin = schedule.origin;
    this.ticket.departureTime = schedule.departureTime;
    this.ticket.destination = schedule.destination;
    this.ticketDialog = true;
  }

  //responds to an event triggered from the Create Schedule Component via the View Route component
  //occurs when a new schedule has been created
  updateSchedule() {
    this.setRuralSchedules();
    this.setIntercitySchedules();
    this.setInternationalSchedules();
    this.setLocalSchedules();
  }

  purchaseTicket() {

  }

  onCreateStation() {
    this.createStation = false;
  }

  closeStationView() {
    this.viewStations = false;
  }

  closeFleetView() {
    this.viewFleets = false;
    this.createFleet = false;
    
  }

  setCountries() {

    //set the Countries first
    this.setCountriesList();
    //convert the list to string name and store it in an String[]

    this.countries.forEach(country => {
      this.countryList.push(country.name);
    });

    console.log(`Set ${this.countryList.length} Countries`);

  }


  setSearchOptions(event: any) {
    console.log("trigered set options with country: " + event);

    let country: string = event;
    let city: {
      name: string;
      type: string;
    } = {name: '', type: ''};

    city.name = "name";
    let cityArr = [];
    cityArr.push(city);


    

    this.countries.forEach(country_ => {

      if(country_.name == country) {
        //set the cities
        country_.cities.forEach(city => {
          this.cities.push(city.name);
        });

        country_.cities.forEach(city => {
            city.areas.forEach(area => {
              this.areas.push(area);
            });
        });
      }
       
         
    });

    console.log(`Set ${this.cities.length} cities, ${this.countries.length}, areals ${this.areas.length}`);

  }

  setCountriesList() {
    this.countries = [
      {name: "Zimbabwe",
      cities: [
        {name: "Harare",
        areas: ["Mt Pleasent", "Eastlea", "Kuwadzana 1", "Budiriro", "Borowdale", "Greystone" , "CBD Harare", "Mbare"]
      },
        {name: "Mutare",
        areas: ["Dangamvura", "Fairbridge Park", "Chikanga 1", "Chikanga 2", "Sakubva", "Destiny", "CBD Mutare", "Sakubva"]
      },
        {name: "Bulawayo",
        areas: ["Selbourne Park 1", "Selbourne Park 2", "Mahatshula", "Phumala South", "Riverside", "Nust", "CBD Bulawayo", "Rankin"]
        }

      ]

    },
    {name: "South Africa",
      cities: [
        {name: "Joburg",
         areas: []
         },

        {name: "Pretoria",
         areas: []
        },
        {name: "Durban",
         areas: []
        },
        {name: "CapeTown",
        areas: []
        }
      ]
    },
    {name: "Botswana",
      cities: [
        {name: "Francis Town",
         areas: []
         },
        {name: "Gaborone",
         areas: []
         }
      ]
     },
     {name: "Mozambique",
        cities: [
          {name: "Maputo",
          areas: []
          },
          {name: "Manica",
            areas: []
           },
           {name: "Beira",
           areas: []
          }
        ]
      }
    ]
  }


  showSuccess() {
    this.messageService.add({severity:'success', summary: 'Success', detail: this.statusMessage});
  }

  showError() {
    this.messageService.add({severity:'error', summary: 'Error', detail: this.statusMessage});
  }


  

}

