import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SelectItem } from 'primeng/api';

import { Ticket } from './ticket';
import { TicketService } from './ticket.service';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css']
})
export class TicketComponent implements OnInit {

  ticket1: Ticket = {ticketId: 0, routeId: 0,  price: 0, token: '4444', origin: '', destination: '', departureTime: '', scheduleId: 0, originStation: ''}; 
 
  sortOptions: SelectItem[] =[];
  sortOrder: number = 1;
  sortField: string = '';
  sortKey: string = '';
  qrcode: boolean = false;

  size = 300;
  dataToString: any;


  @Input() public tickets: Ticket[] = [];
 // @Output() private showQRCode: EventEmitter<Ticket>;
  

  constructor(private ticketService: TicketService, private fb: FormBuilder) {
   // this.showQRCode = new EventEmitter<Ticket>()
   }

  ngOnInit(): void {
    
  }

  public showBarcodeDailog(ticket: Ticket) {

    console.log("Showing qrcode");
    console.log("Size : " + this.tickets.length);
    console.log("ticketId " + ticket.ticketId + "OriginStation :" + ticket.originStation);
    this.dataToString = JSON.stringify(ticket);
    this.qrcode = true;
    console.log(this.qrcode);
  }
}
