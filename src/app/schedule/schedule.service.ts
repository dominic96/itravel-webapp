import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ItraveRoute } from './itrave-route';
import { Schedule } from './schedule';
import { Trip } from './view-trips/trips';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  //options header
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type':'application/json'})
  };
  
  private baseUrl = "http://localhost:8080/itravel/rest";

  constructor(private http: HttpClient) { }

  public getAllRoutes(): Observable<ItraveRoute[]> {

    const url = `${this.baseUrl}/route/getallroutes`;
    return this.http.get<ItraveRoute[]>(url, this.httpOptions)
                        .pipe(
                          tap(routes =>{
                            console.log(`retrieved ${routes.length} routes`);
                          })
                        );
                      
  }

  public getRoutes(type: string): Observable<ItraveRoute[]> {
    const url = `${this.baseUrl}/route/getroutes/${type}`;
    return this.http.get<ItraveRoute[]>(url, this.httpOptions)
                      .pipe(
                        tap(routes=>{
                          console.log(`retrieved ${type} ${routes.length} routes`);
                        })
                      );
  }

  public createSchedule(schedule : Schedule): Observable<any> {

    const url = `${this.baseUrl}/route/create/schedule`;
    return this.http.post<any>(url, schedule, this.httpOptions)
                      .pipe(
                        tap( _=> console.log(`Created Schedule Successfully`))
                      );
  }

  public getSchedulesByType(type: string ): Observable<Schedule[]> {
    const url =`${this.baseUrl}/route/schedule/get/type/${type}`;
    return this.http.get<Schedule[]>(url, this.httpOptions)
                      .pipe(
                        tap(schedules => {
                          console.log(`Fetched ${schedules.length} ${type} schedules`);
                        })
                      );

  }

  public searchLocalSchedule(origin: string, destination: string): Observable<Schedule[]> {

    const url = `${this.baseUrl}/route/local/schedule/${origin}/${destination}`;

    return this.http.get<Schedule[]>(url, this.httpOptions)
                      .pipe(
                        tap( localSchedules =>{
                          console.log(`Found ${localSchedules.length} schedules`);
                        })
                      );
  }

  public searchIntercitySchedule(origin: string, destination: string): Observable<Schedule[]> {

    const url = `${this.baseUrl}/route/intercity/schedule/${origin}/${destination}`;

    return this.http.get<Schedule[]>(url, this.httpOptions)
                      .pipe(
                        tap( schedules =>{
                          console.log(`Found ${schedules.length} schedules`);
                        })
                      );
  }

  public searchInternationalSchedule(origin: string, destination: string): Observable<Schedule[]> {

    const url = `${this.baseUrl}/route/international/schedule/${origin}/${destination}`;

    return this.http.get<Schedule[]>(url, this.httpOptions)
                      .pipe(
                        tap( schedules =>{
                          console.log(`Found ${schedules.length} schedules`);
                        })
                      );
  }

  public getDriversTrips(driverId: number): Observable<Trip[]> {

    const url = `${this.baseUrl}/driver/trips/${driverId}`;

    return this.http.get<Trip[]>(url, this.httpOptions)
                      .pipe(
                        tap( trips => {
                          console.log(`Fetched ${trips.length} trips`);
                        })
                      )
  }

  public updateTripStatus(trip: Trip): Observable<any> {
    const url = `${this.baseUrl}/driver/updateTrip`;
    return this.http.post<any>(url, trip, this.httpOptions)
                      .pipe(
                        tap( _ =>(console.log("Bus Status Updated")))
                      )
  }


}
