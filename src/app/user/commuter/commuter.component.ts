import { Component, OnInit } from '@angular/core';
import { Commuter } from './commuter';
import { CommuterService } from './commuter.service';

import { MessageService } from "primeng/api";
import { PrimeNGConfig } from "primeng/api";



import { Ticket } from 'src/app/ticket/ticket';
import { TicketService } from 'src/app/ticket/ticket.service';
import { ItravelRoute } from './routes/itravel-route';
import { Router } from '@angular/router';




/**
 * @author Dominic Mundirewa
 */
@Component({
  selector: 'app-commuter',
  templateUrl: './commuter.component.html',
  styleUrls: ['./commuter.component.css'],
  providers:[MessageService]
})
export class CommuterComponent implements OnInit {

  sideMenu = false;
  buyTicketMenu = false;
  commuter: Commuter;
  routeType: string = '';
  purchaseTicket: boolean = false;
  boardingPass: boolean = false;
  errorMessage: string = '';
  successMessage: string = '';


  
  public localRoutes: ItravelRoute[] =[{routeId:0, origin: '', destination: '', departureTime: 0, arrivalTime: 0, price:0, operator: '', status: ''}];
  public intercityRoutes: ItravelRoute[] = [{routeId:0, origin: '', destination: '', departureTime: 0, arrivalTime: 0, price:0, operator: '', status: ''}];
  public internationalRoutes: ItravelRoute[] = [{routeId:0, origin: '', destination: '', departureTime: 0, arrivalTime: 0, price:0, operator: '', status: ''}];
  public route: ItravelRoute = {routeId:0, origin: '', destination: '', departureTime: 0, arrivalTime: 0, price:0, operator: '', status: ''};
  public  ticket: Ticket = {ticketId: 0, routeId: 0,  price: 0, token: '', origin: '', destination: ''};
  public tickets: Ticket[] = [{ticketId: 0, routeId: 0,  price: 0, token: '', origin: '', destination: ''}];

  constructor(private commuterService: CommuterService,private primeConfig: PrimeNGConfig,
              private ticketService: TicketService, private messageService: MessageService, 
              private router: Router) {
    this.commuter = {userId:0,commuterId:0,firstname:'',lastname:'',email:''};
    this.getCommuter();
   }

  ngOnInit(): void {

    this.getLocalRoutes();
    this.getIntercityRoutes();
    this.getInternationalRoutes();
    this.primeConfig.ripple = true;

  }

  private getCommuter() {
    this.commuterService.getCommuterAccount()
                          .subscribe(c => {
                            console.log("casting customer from JSON object");
                            this.castToCommuter(c);
                          }
                          );

  }

  private getTickets() {
    this.commuterService.getTickets(this.commuterService.commuterValue.commuterId)
                          .subscribe(
                            (t) => {
                              console.log("returned tickets for commuter" + t.length);
                              this.tickets = t;
                              this.successMessage = 'Fectched Boarding passes successfully';
                              this.showSuccess();
                            },
                            (error) =>{
                              console.log("Failed to retrieve tickets: " + error);
                              this.errorMessage = error;
                              this.showError();
                            }
                         
                          );

  }

  getLocalRoutes() {
    this.commuterService.getRoutes("local")
                            .subscribe(routes => {
                              this.localRoutes = routes;
                              console.log('Successfully fetched local routes ' + this.localRoutes.length);
                            });
  }

  getIntercityRoutes() {
    this.commuterService.getRoutes("intercity")
                          .subscribe(routes =>{
                            this.intercityRoutes = routes;
                            console.log(`Successfully fetched ${this.intercityRoutes.length} intercity routes`);
                          });
  }

  getInternationalRoutes() {
    this.commuterService.getRoutes("international")
                          .subscribe(routes =>{
                            this.internationalRoutes = routes;
                            console.log(`Successfully fetched ${this.internationalRoutes.length} international routes`);
                          })
  }

  onBuyTicketEvent(route: ItravelRoute) {
    console.log("onBuyTicketEvent triggered")
    this.route = route;
    this.showPurchaseDialog();
  }

  buyTicket(){
    console.log("Purchasing ticket");
    this.ticket.price = this.route.price;
    this.ticket.destination = this.route.destination;
    this.ticket.origin = this.route.origin;
    this.ticket.routeId = this.route.routeId;
    console.log("Commuter Id: " + this.commuterService.commuterValue.commuterId);
    this.ticketService.generateTicket(this.ticket, this.commuterService.commuterValue.commuterId)
                        .subscribe(
                          (ticket) => {
                            this.ticket = ticket;
                            console.log('Successfully purchased a ticket with id ' + ticket.ticketId);
                            this.successMessage = "Boarding pass purchase successful";
                            this.showSuccess();
                          },

                          (error) => {
                            console.log("caught error while purchasing ticket" );
                            console.error(error);
                            this.errorMessage = "Failed to purchase ticket, please try again in momemnt"; 
                            this.showError();

                          }

                        ); 

  }

  public logout() {
    
    this.router.navigate(['/login/login']);
    this.commuterService.logout().subscribe();

  }

  private castToCommuter(commuterJson: Commuter): void {
    this.commuter = {
      userId: (commuterJson as any).userId,
      commuterId: (commuterJson as any).commuterId,
      firstname: (commuterJson as any).firstname,
      lastname: (commuterJson as any).lastname,
      email: (commuterJson as any).email
    };
  }

  showPurchaseDialog() {
    this.purchaseTicket = true;
  }

  showBoardingPass() {
    this.getTickets();
    this.boardingPass = true;
  }

  closeBoardingPassList() {
    this.boardingPass = false; 
  }

  onConfirmPurchase(){
    this.purchaseTicket = false;
    this.buyTicket();

  }

  showSuccess() {
    this.messageService.add({severity:'success', summary: 'Success', detail: this.successMessage});
  }

  showError() {
    this.messageService.add({severity:'error', summary: 'Error', detail: this.errorMessage});
  }



}
