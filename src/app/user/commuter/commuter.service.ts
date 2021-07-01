import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Commuter } from './commuter';
import { catchError, count, map, tap } from 'rxjs/operators';
import { UserService } from '../user.service';
import { AuthenticationService } from 'src/app/authentication/authentication.service';
import { Routes } from './routes';
import { ItravelRoute } from './routes/itravel-route';
import { Router } from '@angular/router';
import { Ticket } from 'src/app/ticket/ticket';




/**
 * @author Dominic Mundirewa
 * 
 */
@Injectable({
  providedIn: 'root'
})
export class CommuterService {

   //options header
   httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  userId: number;
  private commuterSubject: BehaviorSubject<Commuter>;
  private commuter: Observable<Commuter>;

  public baseUrl = "http://localhost:8080/itravel/rest";
  constructor(private http: HttpClient, 
              private authenticationService: AuthenticationService,
              private router: Router) {
        this.userId = authenticationService.userValue.userId;

        this.commuterSubject = new BehaviorSubject<Commuter>(JSON.parse(localStorage.getItem('commuter') || '{}'));
        this.commuter = this.commuterSubject.asObservable();
   }

   /**
    * 
    * @returns Commuter value if there is one already available
    */
   public get commuterValue(): Commuter {
     return this.commuterSubject.value;
   }

  public getCommuterAccount(): Observable<Commuter> {
    console.log(`The userId for the commuter : ${this.userId}`);
    const url = `${this.baseUrl}/commuteraccount/get/${this.userId}`;
    return this.http.get<Commuter>(url, this.httpOptions)
                  .pipe(
                      tap( commuter =>{
                        this.log(`Successfully Fetched Commuter account with userId = ${this.userId}`);
                        localStorage.setItem('commuter', JSON.stringify(commuter));
                        this.commuterSubject.next(commuter);
                        console.log("Saved Commuter in Local storage");

                      }),
                      catchError(this.handleError<Commuter>(`getCommuterAccount userId = ${this.userId}`))
                  );

  }

  public getRoutes(type: string): Observable<ItravelRoute[]> {
    console.log("Fetching Routes on Schedule in " + type);
    const url = `${this.baseUrl}/route/schedule/get/type/${type}`;
    return this.http.get<ItravelRoute[]>(url, this.httpOptions)
                        .pipe(
                          tap(routes => this.log(`Successfully found ${routes.length}  available in ${type} `)),
                          catchError(this.handleError<ItravelRoute[]>(`getRoutesByCity : ${type}`))
                        );
  }

  public getTickets(commuterId: number): Observable<Ticket[]> {
    console.log(`Fetching Tickets for Commuter with id: ${commuterId}`);
    const url = `${this.baseUrl}/tickets/gettickets/${commuterId}`;
    return this.http.get<Ticket[]>(url, this.httpOptions)
                      .pipe(
                        tap(tickets => this.log(`Fetched ${tickets.length} for Commuter Id: ${commuterId}`)),
                        catchError(this.handleError<Ticket[]>(`getTickets Commuter Id: ${commuterId}`))
                      );
  }

  public logout(): Observable<any> {

    console.log("Logging out Commuter");

    const url = `${this.baseUrl}/users/logout/${this.userId}`;
    return this.http.get<any>(url, this.httpOptions)
                  .pipe(
                    tap(_ => {
                      localStorage.removeItem('user');
                      localStorage.removeItem('commuter');
                      this.router.navigate(['/login/login']);
                      console.log('Logging out in commuter service');
                    }),
                    catchError(this.handleError<any>(`logout : commuter`))
                  );
  }


  /**
   * 
   * @returns The userId of the User currently logged into the system
   */
  private getUserId(): number {
    return this.authenticationService.userValue.userId;
  }

  private log(message: string) {
    console.log(`CommuterService : ${message}`);
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
        //this.router.navigate(['']);
      }
      
      //let app keep running despite error
      return of(result as T);
    }
  }




 



}
