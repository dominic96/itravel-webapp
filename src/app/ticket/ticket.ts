/**
 * @author Dominic Mundirewa
 * @description A Ticket representation
 */
 export interface Ticket {
    ticketId: number;
    routeId: number;
    price: number;
    token: string;
    origin: string;
    destination: string;
    departureTime: string;
    scheduleId: number;
    originStation: string;
    phoneNumber?: string;
}
