import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/authentication/authentication.service';
import { User } from '../user';
import { Adminstrator } from './adminstrator';


/**
 * @author Dominic Mundirewa
 */
@Injectable({
  providedIn: 'root'
})
export class AdminstratorService {

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };
  userId: number;

  private baseUrl = "http://localhost:8080/itravel/rest/adminstrator";

  constructor(private authenticationService: AuthenticationService, private http: HttpClient) { 
      this.userId = authenticationService.userValue.userId;
  }

  public getAccont(): Observable<Adminstrator> {
    console.log(`The userId for the Adminstrator is: ${this.userId}`);
    const url = `${this.baseUrl}/get/${this.userId}`;
    return this.http.get<Adminstrator>(url, this.httpOptions)
                      .pipe(
                        tap(admin => this.log(`Successfully Fetched Adminstrator with userId : ${admin.userId}`)),
                        catchError(this.handleError<Adminstrator>(`getAccount userId : ${this.userId}`))
                      );

  }

  public getLoggedInUsers(): Observable<User[]> {
    console.log("Fetching Users currently logged into the System");
    const url =  `${this.baseUrl}/getloggedinusers`;
    return this.http.get<User[]>(url, this.httpOptions)
                      .pipe(
                        tap( users => `Successfully Fetched ${users.length} Users`),
                        catchError(this.handleError<User[]>(`getLoggedInUsers`))
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
