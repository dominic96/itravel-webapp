export interface Schedule {
    scheduleId: number;
    vehicleId: number;
    driverId: number;
    routeId: number;
    departureTime: string;
    arrivalTime: string;
    origin: string;
    destination: string;
    status: string;
    price: number;

}
