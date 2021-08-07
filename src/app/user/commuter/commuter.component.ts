import { Component, OnInit } from '@angular/core';
import { Commuter } from './commuter';
import { CommuterService } from './commuter.service';

import { MessageService } from "primeng/api";
import { PrimeNGConfig } from "primeng/api";



import { Ticket } from 'src/app/ticket/ticket';
import { TicketService } from 'src/app/ticket/ticket.service';
import { ItravelRoute } from './routes/itravel-route';
import { Router } from '@angular/router';
import { Schedule } from 'src/app/schedule/schedule';
import { ScheduleService } from 'src/app/schedule/schedule.service';
import { Station } from 'src/app/station/station';
import { StationService } from 'src/app/station/station.service';
import { filter } from 'rxjs/operators';
import { City } from 'src/app/station/city';
import { Country } from 'src/app/station/country';




/**
 * @author Dominic Mundirewa
 */
@Component({
  selector: 'app-commuter',
  templateUrl: './commuter.component.html',
  styleUrls: ['./commuter.component.css'],
  providers:[MessageService]
})
export class CommuterComponent implements OnInit {

  sideMenu = false;
  ticketDialog = false;
  commuter: Commuter;
  routeType: string = '';
  routeType1 = "Local";
  routeType2 = "Intercity";
  routeType3 = "International";
 
  boardingPass: boolean = false;
 
  statusMessage: string = '';
  qrcode: boolean = false;

  public stations: Station[] = [];
  public parameters: string[] = [];
  public ruralSchedules: Schedule[] = [];
  public localSchedules: Schedule[] = [];
  public intercitySchedules: Schedule[] = [];
  public internationalSchedules: Schedule[] = [];

  public areas: string[] = [];
  public cities: string[] = [];
  public countries: Country[] = [];
  public countryList: string[] = [];
 

 



  
  public route: ItravelRoute = {routeId:0, origin: '', destination: '', departureTime: '', arrivalTime: '', price:0, operator: '', status: '', scheduleId: 0};
  public  ticket: Ticket = {ticketId: 0, routeId: 0,  price: 0, token: '', origin: '', destination: '', departureTime: '', scheduleId: 0, originStation: ''};
  public tickets: Ticket[] = [{ticketId: 0, routeId: 0,  price: 0, token: '', origin: '', destination: '', departureTime: '', scheduleId: 0, originStation: ''}];

  constructor(private commuterService: CommuterService,private primeConfig: PrimeNGConfig,
              private ticketService: TicketService, private messageService: MessageService, 
              private router: Router, private scheduleService: ScheduleService,
              private stationService: StationService) {
    this.commuter = {userId:0,commuterId:0,firstname:'',lastname:'',email:''};
    this.getCommuter();
   }

  ngOnInit(): void {

    this.setStations();
    this.setRuralSchedules();
    this.setLocalSchedules();
    this.setIntercitySchedules();
    this.setInternationalSchedules();
    

    
   // this.setSearchOptions();
    this.primeConfig.ripple = true;

  }

  private getCommuter() {
    this.commuterService.getCommuterAccount()
                          .subscribe(c => {
                            console.log("casting customer from JSON object");
                            this.castToCommuter(c);
                          }
                          );

  }

  private getTickets() {
    this.commuterService.getTickets(this.commuterService.commuterValue.commuterId)
                          .subscribe(
                            (t) => {
                              console.log("returned tickets for commuter" + t.length);
                              this.tickets = t;
                              this.statusMessage = 'Fectched Boarding passes successfully';
                              this.showSuccess();
                            },
                            (error) =>{
                              console.log("Failed to retrieve tickets: " + error);
                              this.statusMessage = error;
                              this.showError();
                            }
                         
                          );

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

  setStations() {
    this.stationService.getStations()
                          .subscribe(
                            (stations) => {
                              this.stations = stations;
                              this.setCountries();
                              this.statusMessage = `Retrieved ${stations.length} stations`;
                              this.showSuccess();
                              console.log(this.statusMessage);

                            },
                            (err) => {
                              this.statusMessage = `Failed to retrieve stations, try reloading page`;
                              this.showError();
                              console.log(this.statusMessage);
                            }
                          )
   
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

    console.log("trigeered set options with country: " + event);

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

  searchLocalSchedules(event: any){
    let parameters: string[] = event;
    console.log(`received parameter list of lenght: ${parameters.length}, searching for local route matching params`);
    console.log(`Searching for Local schedule with parameter: ${parameters[0]} and ${parameters[1]}`);
      this.scheduleService.searchLocalSchedule(parameters[0], parameters[1])
                              .subscribe(
                                (localSchedules) => {
                                  this.localSchedules = localSchedules;
                                  this.statusMessage = `Found ${localSchedules.length} local routes`;
                                  this.showSuccess();
                                  console.log(this.statusMessage);
                                },
                                (err) => {
                                  this.statusMessage = `Local route search failed, please retry`
                                  this.showError();
                                  console.log(this.statusMessage);
                                }
                              );

  }

  searchIntercitySchedules(event: any) {

    let parameters: string[] = event;
    console.log(`received parameter list of lenght: ${parameters.length}`);
    console.log(`Searching for Intercity schedule with parameter: ${parameters[0]} and ${parameters[1]}`);

      this.scheduleService.searchIntercitySchedule(parameters[0], parameters[1])
                              .subscribe(
                                (intercitySchedules) => {
                                  this.intercitySchedules = intercitySchedules;
                                  this.statusMessage = `Found ${intercitySchedules.length} Intercity routes`;
                                  this.showSuccess();
                                  console.log(this.statusMessage);
                                },
                                (err) => {
                                  this.statusMessage = `Intercity route search failed, please retry`
                                  this.showError();
                                  console.log(this.statusMessage);
                                }
                              );

  }

  searchInternationalSchedules(event: any) {

    let parameters: string[] = event;
    console.log(`received parameter list of lenght: ${parameters.length}`);

    console.log(`Searching for International schedule with parameter: ${parameters[0]} and ${parameters[1]}`);

    this.scheduleService.searchInternationalSchedule(parameters[0], parameters[1])
                            .subscribe(
                              (internationalSchedules) => {
                                this.internationalSchedules = internationalSchedules;
                                this.statusMessage = `Found ${internationalSchedules.length} International routes`;
                                this.showSuccess();
                                console.log(this.statusMessage);
                              },
                              (err) => {
                                this.statusMessage = `International route search failed, please retry`
                                this.showError();
                                console.log(this.statusMessage);
                              }
                            );

  }

  searchRuralSchedules(event: any) {

    let parameters: string[] = event;
    console.log(`received parameter list of lenght: ${parameters.length}`);
    //to be completed, waiting for backend method

   
    

  }

  public confirmTicketPurchase(event: any) {
    console.log("Purchasing ticket in Commuter")
    let schedule: Schedule = event ;
    console.log(`Schedule Id: ${schedule.scheduleId}`);
    this.ticket.routeId  = schedule.routeId;
    this.ticket.scheduleId = schedule.scheduleId;
    this.ticket.originStation = schedule.origin;
    this.ticket.origin = schedule.origin;
    this.ticket.departureTime = schedule.departureTime;
    this.ticket.destination = schedule.destination;
    this.ticket.price = schedule.price;
    this.ticketDialog = true;
  }

  purchaseTicket() {

    console.log(`Purchasing ticket for Commuter with id: ${this.commuterService.commuterValue.commuterId}`)

    this.ticketService.generateTicket(this.ticket, this.commuterService.commuterValue.commuterId)
                        .subscribe(
                          (ticket) => {
                            this.ticket = ticket;
                            this.statusMessage = `Purchase ticket with Id: ${ticket.ticketId}`;
                            this.showSuccess();
                            console.log(this.statusMessage);
                          },
                          (err) => {
                            this.statusMessage = `Failed to buy Ticket, try again`;
                            this.showError();
                            console.log(this.statusMessage);
                          }
                        )

  }

  public logout() {
    
    this.router.navigate(['/login/login']);
    this.commuterService.logout().subscribe();

  }

  private castToCommuter(commuterJson: Commuter): void {
    this.commuter = {
      userId: (commuterJson as any).userId,
      commuterId: (commuterJson as any).commuterId,
      firstname: (commuterJson as any).firstname,
      lastname: (commuterJson as any).lastname,
      email: (commuterJson as any).email
    };
  }

 

  showBoardingPass() {
    this.getTickets();
    this.boardingPass = true;
  }

  closeBoardingPassList() {
    this.boardingPass = false; 
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
