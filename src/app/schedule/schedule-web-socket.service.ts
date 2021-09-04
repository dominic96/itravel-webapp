
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { catchError, map, switchAll, tap } from 'rxjs/operators';
import { WebSocketSubject, webSocket } from "rxjs/webSocket";
import { Message } from './Message';


const url = "ws://localhost:8080";

@Injectable({
  providedIn: 'root'
})
export class ScheduleWebSocketService {

  connection$: WebSocketSubject<any> | undefined; 

  
  constructor() { }

  connect(): Observable<any> {
    this.connection$ = webSocket(`${url}/itravel/scheduleupdate`);
    return this.connection$;
  }

  send(data: Message): void {
    if (this.connection$) {
      this.connection$.next(JSON.stringify(data));

    }else{
      console.log("Sending failed!!");
    }
  }

  closeConnection(): void {
    if(this.connection$) {
      this.connection$.complete();
      this.connection$ = undefined;
    }
  }
  
  
}
