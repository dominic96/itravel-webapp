import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Station } from '../station';
import { StationService } from '../station.service';

import { MessageService } from "primeng/api";
import { Country } from '../country';
import { City } from '../city';

@Component({
  selector: 'app-create-station',
  templateUrl: './create-station.component.html',
  styleUrls: ['./create-station.component.css'],
  providers: [MessageService]
})
export class CreateStationComponent implements OnInit {

  @Output() private createStation: EventEmitter<Station>;

  private station: Station;

  stationForm: FormGroup;


 

  loading = false;
  statusMessage: string = '';

  public areas: string[] = [];
  public cities: City[] = [];
  public countries: Country[] = [];
   
  

  country: string = "";

  constructor(private fb: FormBuilder, private router: Router, private stationService: StationService,
              private messageService: MessageService) { 

    this.createStation = new EventEmitter<Station>();
    this.station = {stationId:0, name: '', country: '', city: '', area: '', street: '', docks: 0}

    this.stationForm = this.fb.group({
      name: ['', Validators.required],
      country: ['',Validators.required],
      city: ['',Validators.required],
      area: ['',Validators.required],
      street: ['',Validators.required]
    })

  }

  
  ngOnInit(): void {

    this.setCountriesList();
  }

  private createForm() {
    this.stationForm = this.fb.group({
      name: ['', Validators.required],
      country: ['',Validators.required],
      city: ['',Validators.required],
      area: ['',Validators.required],
      street: ['',Validators.required]
    })


  }

  get s() {return this.stationForm.controls}

  saveStation() {

  }


  setCities() {
     this.countries.forEach(country => {
       if(country.name == this.s.country.value)
          this.cities = country.cities;
     });
  }

  setAreas() {
    this.cities.forEach((city) => {
      if(city.name == this.s.city.value)
          this.areas = city.areas;
    });
  }



  cancelStation() {
    this.router.navigate(['./adminstrator/adminstrator'])
  }

  onCreateStation() {

    // only create station if form is valid
    if(this.stationForm.invalid) {
      console.log("Form is invalid");
      this.statusMessage = "Station details missing !";
      this.showError();
      return;
    }

    //start progress bar
    this.loading = true;
    this.station.name = this.s.name.value;
    this.station.country = this.s.country.value;
    this.station.city = this.s.city.value;
    this.station.area = this.s.area.value;
    this.station.street = this.s.street.value;
    this.stationService.createStation(this.station)
                          .subscribe(
                            () => {
                              console.log("Created Station Successfully");
                              this.statusMessage= "Station Created Successfully";
                              this.showSuccess();
                              this.loading = false;
                              this.createForm();
                            },
                            (error) => {
                              console.log("Failed to create Station");
                              console.error(error);
                              this.statusMessage = "Failed to create Station";
                              this.showError();
                              this.loading = false;
                              this.createForm();
                            }
                          )

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
