import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import { catchError, map, tap } from "rxjs/operators";


import { User } from "./user";

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
}
