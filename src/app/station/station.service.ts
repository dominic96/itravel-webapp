import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Dock } from './create-dock/dock';
import { Station } from './station';

@Injectable({
  providedIn: 'root'
})
export class StationService {

  private baseUrl  = "http://localhost:8080/itravel/rest/station";
   //options header
   httpOptions = {
    headers: new HttpHeaders({ 'Content-Type':'application/json'})
  };

  constructor(private http: HttpClient) { }


  public createStation(station: Station) {
    const url = `${this.baseUrl}/create`;

    return this.http.post<any>(url, station, this.httpOptions)
                      .pipe(
                        tap( _ => console.log("created station"))
                      );
  }

  public getStations(): Observable<Station[]> {
    const url = `${this.baseUrl}/getall`;
    return this.http.get<Station[]>(url, this.httpOptions)
                      .pipe(
                        tap(stations => {
                          console.log(`Fetched ${stations.length} stations`);
                        })
                      );
  }

  public getStatinByName(name: string): Observable<Station> {
    const url = `${this.baseUrl}/getbyname/${name}`;

    return this.http.get<Station>(url, this.httpOptions)
                      .pipe(
                        tap( station=> {console.log(`fetched station with name ${station.name}`);})
                      );
  }

  public createDock(dock: Dock): Observable<any> {

    const url = "http://localhost:8080/itravel/rest/dock/create";

    return this.http.post<any>(url, dock, this.httpOptions)
                      .pipe(
                        tap( _=>(console.log("created Dock ")))
                      );
  }


}
