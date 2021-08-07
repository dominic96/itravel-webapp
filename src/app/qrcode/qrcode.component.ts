import { Component, Input, OnInit } from '@angular/core';
import { Ticket } from '../ticket/ticket';

@Component({
  selector: 'app-qrcode',
  templateUrl: './qrcode.component.html',
  styleUrls: ['./qrcode.component.css']
})
export class QrcodeComponent implements OnInit {

  @Input() public ticket: Ticket;
  
  @Input() public origin: string = '';



  data = [{
    'name': 'Dominic Mundirewa',
    'profile': 'Electronic Engineer',
    'email': 'dominic@gmail.com',
    'hobby': 'writing'
  }]

  size = 300;
  dataToString: any;

  

  constructor() {
    this.ticket  = {ticketId: 0, routeId: 0,  price: 70, token: '', origin: '', destination: '', departureTime: '', scheduleId: 0, originStation:''}; 
    
   }

  ngOnInit(): void {
    //this.dataToString = JSON.stringify(this.ticket);
    console.log("initializing");
    console.log("Origin"  + this.origin);
    //console.log(this.dataToString);
     
  }

  logTickets() {
    console.log("ticket id" +this.ticket.ticketId)
  }



  

}
