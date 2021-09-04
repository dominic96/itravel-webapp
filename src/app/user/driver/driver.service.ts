import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/authentication/authentication.service';
import { Driver } from '../driver';

@Injectable({
  providedIn: 'root'
})
export class DriverService {

   //options header
   httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  private userId;
  private driverSubject: BehaviorSubject<Driver>;
  private driver: Observable<Driver>;

  baseUrl = "http://localhost:8080/itravel/rest";



  constructor(private http: HttpClient, private authenticationService: AuthenticationService,
              private router: Router)
  { 
    this.userId  = this.authenticationService.userValue.userId;
    this.driverSubject = new BehaviorSubject<Driver>(JSON.parse(localStorage.getItem('driver') || '{}'));
    this.driver = this.driverSubject.asObservable();
  }

  public get driverValue(): Driver {
    return this.driverSubject.value;
  }

  public getDriverAccount(): Observable<Driver> {

    console.log(`Fetching Driver Account with user id ${this.userId}`);
    const url = `${this.baseUrl}/driver/account/get/${this.userId}`;

    return this.http.get<Driver>(url, this.httpOptions)
                  .pipe(
                    tap( driver => {
                      console.log(`Return Driver Account with Id: ${driver.driverId}`);
                      localStorage.setItem('driver', JSON.stringify(driver));
                      this.driverSubject.next(driver);
                      console.log(`Driver saved in browser local storage`);
                    })
                  )
  }
}
