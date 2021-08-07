import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { BehaviorSubject, Observable, of } from 'rxjs';
import { User } from '../user/user';
import { Credentials } from './credentials';
import { catchError, map, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { NewUser } from './register/new-user';


/**
 * @author Dominic Mundirewa
 * 
 */

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private userSubject: BehaviorSubject<User>;
  private user: Observable<User>;
  private baseUrl = "http://localhost:8080/itravel/rest";

  //options header
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type':'application/json'})
  };
  
  constructor(private http : HttpClient, private router: Router) { 
    this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user') || '{}'));
    this.user = this.userSubject.asObservable();
   


  }

  /**
   * return the current value of userSubject which
   * will be a valid User if someone is logged in OR
   * null if no user is currently logged in
   */
  public get userValue(): User {
    return this.userSubject.value
  }



  /**
   * 
   * @param credentials Contains sensitive authentication information (email and password)
   *                     sent to the server for authentication
   * @returns  http response , a User object matching the passed credentials or Unathorised
   *
   */
  public login(credentials: Credentials) {

    const url = `${this.baseUrl}/users/login`;
    return this.http.post<User>(url, credentials, this.httpOptions)
                  .pipe(
                    map(user => {
                      //Store User in the Localstorage to keep User logged in 
                      //between page refreshes
                      localStorage.setItem('user', JSON.stringify(user));
                      this.userSubject.next(user);
                    }),

                    tap(_ => this.log(`Successfully logged in User with email ${this.userValue.email}`)),
                    catchError(this.handleError<User>("login")) 
                  );
  }

  public register(user: NewUser): Observable<User> {
    const url = `${this.baseUrl}/users/signup`;
    return this.http.post<User>(url, user, this.httpOptions)
                      .pipe(
                        tap( newuser => `Successfully registered user with userId: ${newuser.userId}`),
                        /*catchError(this.handleError< User>(`register ${user}`))*/
                      );

  }

  /**
   * @param message Status information received after successful method
   *                completion or when an error occurs
   */
  private log(message: string) {
    console.log(`AuthenticationService : ${message}`);
  }

  /**
   * Handles Http operations errors
   * @param operation operation of the name that failed 
   * @param result optional result value to return as the observables result after an error
   * @returns 
   */
  private handleError<T>(operation = 'operation', result?: T) {

    return (error: any): Observable<T> => {

      //Send error message to remote logging infrastructure
      console.error(error);

      //Transform error for User consumption
      this.log(`${operation} failed: ${error.message}`);

      //Reroute to Home Page if the operation == login
      if(operation == "login") {
        this.router.navigate(['']);
      }
      
      //let app keep running despite error
      return of(result as T);
    }
  }


}
