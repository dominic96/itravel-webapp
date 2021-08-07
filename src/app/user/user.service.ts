import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, pipe } from 'rxjs';
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import { catchError, map, tap } from "rxjs/operators";


import { User } from "./user";
import { Driver } from './driver';

/**
 * @author Dominic Mundirewa
 */

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userSubject: BehaviorSubject<User>;
  private user: Observable<User>;
  private baseUrl = "http://localhost:8080/itravel";

  //options header
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) {
    this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user') || '{}'));
    this.user = this.userSubject.asObservable();
   }

   /**
    * returns current value of userSubject, value can be null
    * depending on whether User is logged in or out
    */
   public get userValue(): User {
     return this.userSubject.value;
   }

   getUser(userId: number): Observable<User> {

    const url = `${this.baseUrl}/rest/users/getuser/${userId}`;
    return this.http.get<User>(url, this.httpOptions)
                  .pipe(
                    tap(_ => console.log(`Successfully fetched a User with Id = ${userId}`))
                    );


   }

   public createDriver(driver: Driver): Observable<any> {
     const url = `${this.baseUrl}/rest/driver/register`;

     return this.http.post<any>(url, driver, this.httpOptions)
                        .pipe(
                          tap(_=> {console.log("Registered a Driver");})
                        );
   }

   public getAllDrivers(): Observable<Driver[]> {
     const url = `${this.baseUrl}/rest/driver/getdrivers`;
     return this.http.get<Driver[]>(url, this.httpOptions)
                        .pipe(
                          tap(drivers => {
                            console.log(`retrieved ${drivers.length} drivers`)
                          })
                        );
   }

   public getFreeDrivers(): Observable<Driver[]> {
    const url = `${this.baseUrl}/rest/driver/freedrivers`;
    return this.http.get<Driver[]>(url, this.httpOptions)
                       .pipe(
                         tap(drivers => {
                           console.log(`retrieved ${drivers.length} free drivers`)
                         })
                       );
  }
}
