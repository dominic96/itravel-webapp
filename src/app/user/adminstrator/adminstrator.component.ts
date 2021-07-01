import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { Adminstrator } from './adminstrator';
import { AdminstratorService } from './adminstrator.service';


/**
 * @author Dominic Mundirewa
 */
@Component({
  selector: 'app-adminstrator',
  templateUrl: './adminstrator.component.html',
  styleUrls: ['./adminstrator.component.css']
})
export class AdminstratorComponent implements OnInit {

  currentUsers: User[];
  adminstrator: Adminstrator;
  constructor(private adminstratorService: AdminstratorService) { 
    this.currentUsers = [];
    this.adminstrator =  {userId:0, adminstratorId: 0, firstname:'', lastname: '', email:''};
  }

  ngOnInit(): void {
    this.getAdminstrator();

  }


  private getAdminstrator() {
    this.adminstratorService.getAccont()
                              .subscribe(adminstrator => {
                                this.castToAdminstrator(adminstrator);
                                localStorage.setItem('admin', JSON.stringify(this.adminstrator));
                              });
  }

  public getLoggedInUsers() {
    this.adminstratorService.getLoggedInUsers()
                              .subscribe(users => this.currentUsers = users);
  }


  private castToAdminstrator(adminstratorJson: Adminstrator): void {
    this.adminstrator = {
      userId: (adminstratorJson as any).userId,
      adminstratorId: (adminstratorJson as any).adminstratorId,
      firstname: (adminstratorJson as any).firstname,
      lastname: (adminstratorJson as any).lastname,
      email: (adminstratorJson as any).email
    }

  }
  private castToUsers(users: User[]): void {

    this.currentUsers = [
      {
        userId: (users as any).userId,
        firstname: (users as any).firstname,
        lastname: (users as any).lastname,
        email: (users as any).email,
        token: (users as any).token,
        type: (users as any).type
      }
    ];
  }

}

