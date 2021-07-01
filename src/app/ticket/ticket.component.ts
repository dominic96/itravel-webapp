import { Component, Input, OnInit } from '@angular/core';
import { tick } from '@angular/core/testing';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SelectItem } from 'primeng/api';
import { Commuter } from '../user/commuter/commuter';
import { Ticket } from './ticket';
import { TicketService } from './ticket.service';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css']
})
export class TicketComponent implements OnInit {

  ticket: Ticket = {ticketId: 0, routeId: 0,  price: 0, token: '', origin: '', destination: ''}; 
 
  sortOptions: SelectItem[] =[];
  sortOrder: number = 1;
  sortField: string = '';
  sortKey: string = '';

  @Input() public tickets: Ticket[] = [];

  constructor(private ticketService: TicketService, private fb: FormBuilder) {
   }

  ngOnInit(): void {
    
  }

 


  private castToTicket(ticketJson: Ticket): void {

    this.ticket = {
      ticketId: (ticketJson as any).ticketId,
      routeId: (ticketJson as any).routerId,
      price: (ticketJson as any ).price,
      token: (ticketJson as any).token,
      origin: (ticketJson as any).origin,
      destination: (ticketJson as any).destination

    }
  }
}
