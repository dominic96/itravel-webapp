import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { Ticket } from 'src/app/ticket/ticket';
import { ItravelRoute } from './itravel-route';

@Component({
  selector: 'app-routes',
  templateUrl: './routes.component.html',
  styleUrls: ['./routes.component.css']
})
export class RoutesComponent implements OnInit {


  @Input() public routes: ItravelRoute[] = [];
  @Input() public routeType: string = '';
  @Output() private buyTicket: EventEmitter<ItravelRoute>;



  sortOptions: SelectItem[] =[];
  sortOrder: number = 1;
  sortField: string = '';
  sortKey: string = '';
  constructor() {
    this.buyTicket = new EventEmitter<ItravelRoute>();
   }

  ngOnInit(): void {
  }

  onBuyTicketEvent(event: Event, route: ItravelRoute) {
    this.buyTicket.emit(route);
  }


}
