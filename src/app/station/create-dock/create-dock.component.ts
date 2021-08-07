import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from "primeng/api";
import { City } from '../city';
import { Country } from '../country';
import { Station } from '../station';
import { StationService } from '../station.service';
import { Dock } from './dock';

@Component({
  selector: 'app-create-dock',
  templateUrl: './create-dock.component.html',
  styleUrls: ['./create-dock.component.css'],
  providers: [MessageService]
})
export class CreateDockComponent implements OnInit {

  @Input() public stations: Station[] = [];
  @Input() public  originStation: Station ={stationId:0, name: '', country: '', city: '', area: '', street: '', docks: 0};
  
  dockForm: FormGroup;
  routeTypes: string[] = ["local", "intercity", "international", "rural"];
  
  loading: boolean = false;
  showStationField : boolean = true;
  

  statusMessage: string = "";

  areas: string[] = [];
  cities: City[] = [];
  countries: Country[] = [];
  destinations: string[] = [];

  constructor(private fb: FormBuilder, private messageService: MessageService, private stationService: StationService) {
      this.dockForm = fb.group({
        originStation: ['', Validators.required],
        destinationStation: ['', Validators.required],
        destination: ['', Validators.required],
        type: ['',Validators.required]
      })
   }

  ngOnInit(): void {
    this.setCountriesList();
  }

  get dockControls(){return this.dockForm.controls;}

  initializeDockForm() {
    this.dockForm = this.fb.group({
      originStation: ['', Validators.required],
      destinationStation: ['', Validators.required],
      destination: ['destination', Validators.required],
      type: ['',Validators.required]
    })
  }

  createDock() {

    console.log(`Origin Station : ${this.originStation.name}`);
    this.dockForm.controls.originStation.setValue(this.originStation.name);

    //route type is local
    if (!this.showStationField) {
      this.dockControls.destinationStationId.setValue(0);
      
    }
    

    if(this.dockForm.invalid) {
      this.statusMessage = "Dock details incomplete !";
      this.showError();
      return;
    }

    //proceed to create dock
    this.loading = true;

    let dock: Dock = {dockId: 0, originStationId: 0, destinationStationId: 0, destination: '', routeType: ''};
    dock.originStationId = this.originStation.stationId;
    dock.routeType = this.dockControls.type.value;

    //Selectively filling in details depending on route type
    dock.destinationStationId = this.dockControls.destinationStation.value;
    dock.destination = this.dockControls.destination.value;
  


    this.stationService.createDock(dock)
                          .subscribe(
                            (res) =>{
                              
                              console.log("Created Dock Successfully");
                              this.statusMessage = "Created Dock Successfully";
                              this.showSuccess();
                              this.loading = false;
                              this.initializeDockForm();
                            },
                            (err) => {
                              console.log("failed to create dock");
                              console.error(err);
                              this.statusMessage = "Failed to create dock!";
                              this.showError();
                              this.loading = false;
                              this.initializeDockForm();
                            }
                          )

  }

  /**
   * detects the change in the routeType dropdown to optionally 
   * display some fields
   */
  onChange() {

    if(this.dockControls.type.value == "local") {
      this.showStationField = false;
    }

    if (this.dockControls.type.value == ("intercity" || "international" || "rural") ) {
      this.showStationField = true;
      
    }

  }

  //setting destination List according to the stations chosen
  setDestination() {
    
    let destinationStation: Station = {stationId:0, name: '', country: '', city: '', area: '', street: '', docks: 0};

    //search for a station matching destination in stations array using id
    this.stations.forEach(station => {
      if(this.dockControls.destinationStation.value == station.stationId)
          destinationStation = station;
    });

   //if countries are different set destination to country level
    if(this.originStation.country != destinationStation.country) {
      this.destinations = [];
      this.countries.forEach(country => {
        this.destinations.push(country.name);
      });

      return;
      
    }

    //if stations are in the same country but different cities set destination to city level
    if( (this.originStation.country == destinationStation.country) && (this.originStation.city != destinationStation.city)) {
        this.setCity(this.originStation.country);
        this.destinations = []
        this.cities.forEach(city => {
          
          this.destinations.push(city.name);
        });

        return;
    }

    //if stations are in the same countrty and city set the destinations to area level
    if((this.originStation.country == destinationStation.country) && (this.originStation.city == destinationStation.city)) {
      this.destinations = [];
      this.setAreas(destinationStation.city);
      this.areas.forEach(area => {
        this.destinations.push(area);
      });
    }
  }

  setCity(country_: string) {
    this.countries.forEach(country => {
      if(country.name == country_ )
        this.cities = country.cities;
    });
  }

  setAreas(city_: string) {
    this.cities.forEach(city => {
      if(city.name == city_)
          this.areas = city.areas
      
    });
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
