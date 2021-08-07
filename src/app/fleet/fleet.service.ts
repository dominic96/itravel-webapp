import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Fleet } from './fleet';
import { Vehicle } from './vehicle';

@Injectable({
  providedIn: 'root'
})
export class FleetService {

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient) { }

  baseUrl = "http://localhost:8080/itravel/rest/freight";

  public createFleet(fleet: Fleet): Observable<any> {
    const url =`${this.baseUrl}/addfleet`;

    return this.http.post<any>(url, fleet, this.httpOptions)
                      .pipe(
                        tap( _=> console.log("Created Fleet"))
                      )
  }


  public getAllFleets(): Observable<Fleet[]> {
    const url = `${this.baseUrl}/getallfleets`;

    return this.http.get<Fleet[]>(url, this.httpOptions)
                      .pipe(
                        tap( fleets => {console.log(`fetched ${fleets.length} fleets`);})

                      );
  }

  public getFleetByName(name: string ): Observable<Fleet> {
    const url = `${this.baseUrl}/getfleetbyname/${name}`;

    return this.http.get<Fleet>(url, this.httpOptions)
                      .pipe(
                        tap( fleet => {
                          console.log(`Retrieved fleet with name ${fleet.name}`);
                        })
                      );
  }

  public createVehicle(vehicle: Vehicle): Observable<any> {

    const url = `${this.baseUrl}/addvehicle`;
    return this.http.post<any>(url, vehicle, this.httpOptions)
                  .pipe(
                    tap( _=>{console.log("create vehicle")})
                  );
  }

  public getAllVehicles(): Observable<Vehicle[]>{

    const url =`${this.baseUrl}/getallvehicles`;
    return this.http.get<Vehicle[]>(url, this.httpOptions)
                .pipe(
                  tap(vehicles => {
                    console.log(`retrieved ${vehicles.length} vehicles`);
                  })
                );
  }

  public getFreeVehicles(): Observable<Vehicle[]>{

    const url =`${this.baseUrl}/freevehicles`;
    return this.http.get<Vehicle[]>(url, this.httpOptions)
                .pipe(
                  tap(vehicles => {
                    console.log(`retrieved ${vehicles.length} free vehicles`);
                  })
                );
  }

  public getBusyVehicles(): Observable<Vehicle[]>{

    const url =`${this.baseUrl}/busyvehicles`;
    return this.http.get<Vehicle[]>(url, this.httpOptions)
                .pipe(
                  tap(vehicles => {
                    console.log(`retrieved ${vehicles.length} busy vehicles`);
                  })
                );
  }


}
