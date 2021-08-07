import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/authentication/authentication.service';
import { ServiceProvider } from '../service-provider';
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
  private adminSubject: BehaviorSubject<Adminstrator>;
  private admin : Observable<Adminstrator>;

  private baseUrl = "http://localhost:8080/itravel/rest/adminstrator";

  constructor(private authenticationService: AuthenticationService, private http: HttpClient,private router: Router) { 
      this.userId = authenticationService.userValue.userId;
      this.userId = authenticationService.userValue.userId;
      this.adminSubject = new BehaviorSubject<Adminstrator>(JSON.parse(localStorage.getItem('admin') || '{}'));
      this.admin = this.adminSubject.asObservable();
  }

  public getAdminValue(): Adminstrator {
    return this.adminSubject.value;
  }

  public getAccount(): Observable<Adminstrator> {
    console.log(`The userId for the Adminstrator is: ${this.userId}`);
    const url = `${this.baseUrl}/get/${this.userId}`;
    return this.http.get<Adminstrator>(url, this.httpOptions)
                      .pipe(
                        tap(admin => {
                          this.log(`Successfully Fetched Adminstrator with userId : ${admin.userId}`);
                          localStorage.setItem('admin', JSON.stringify(admin));
                          this.adminSubject.next(admin);
                          console.log("Stored admin in local storage");
                        })
                        
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

  public createServiceProvider(serviceProvider: ServiceProvider): Observable<any> {

    const url = "http://localhost:8080/itravel/rest/serviceprovider/register";
    return this.http.post<any>(url, serviceProvider, this.httpOptions)
                      .pipe(
                        tap( _=> console.log("Create ServiceProvider"))
                      )
  }

  public getServiceProviders(): Observable<ServiceProvider[]> {

    const url = "http://localhost:8080/itravel/rest/serviceprovider/getall";
    return this.http.get<ServiceProvider[]>(url, this.httpOptions)
                      .pipe(
                        tap(serviceProviders =>(console.log(`retrieved ${serviceProviders.length} Service Providers`)))
                      );
  }

  public logout(): Observable<any> {
    console.log("Logging out Commuter");

    const url = `http://localhost:8080/itravel/rest/users/logout/${this.userId}`;
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
