export interface Driver {
    driverId: number;
    userId: number;
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    nationalId: string;

    routeStatusId: number;
    nextRouteStatusId: number;
    
}
