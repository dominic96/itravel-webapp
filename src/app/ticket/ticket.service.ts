import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Ticket } from './ticket';
/**
 * @author Dominic Mundirewa
 */
@Injectable({
  providedIn: 'root'
})
export class TicketService {

  //options header 
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  private baseUrl = "http://localhost:8080/itravel/rest/tickets";

  constructor(private http: HttpClient) { }

  public generateTicket(ticket: Ticket, commuterId: number): Observable<Ticket> {
    console.log("Generating ticket");
  
    const url = `${this.baseUrl}/generate/${commuterId}`;
    return this.http.post<Ticket>(url, ticket, this.httpOptions)
                      .pipe(
                        tap( ticket =>`Successfuly created a ticket with Id: ${ticket.ticketId}` ),
                       /* catchError(this.handleError<Ticket>(`generateTicket commuterId: ${commuterId}`))*/
                      );
  }



  public validateTicket(commuterId: number, token: string): Observable<Ticket> {
    console.log("Validating Ticket with token: " + token);
    const url = `${this.baseUrl}/validate/${commuterId}/${token}`;
    return this.http.get<Ticket>(url, this.httpOptions)
                      .pipe(
                        tap( ticket => this.log(`Validated Ticket with Id: ${ticket.ticketId}`)),
                        catchError(this.handleError<Ticket>(`validateTicket : Commuter ID: ${commuterId} Token: ${token}`))
                      );
  }

  public getTickets(commuterId: number): Observable<Ticket[]> {
    console.log(`Fetching Tickets for Commuter with id: ${commuterId}`);
    const url = `${this.baseUrl}/gettickets/${commuterId}`;
    return this.http.get<Ticket[]>(url, this.httpOptions)
                      .pipe(
                        tap(tickets => this.log(`Fetched ${tickets.length} for Commuter Id: ${commuterId}`)),
                        catchError(this.handleError<Ticket[]>(`getTickets Commuter Id: ${commuterId}`))
                      );
  }



    private log(message: string) {
      console.log(`TicketService : ${message}`);
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

