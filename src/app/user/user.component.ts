import { Component, OnInit } from '@angular/core';
import { User } from './user';

import { UserService } from "./user.service";
/**
 * @author Dominic Mundirewa
 */

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  user!: User;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  getUser(userId: string): void {
    this.userService.getUser(Number(userId))
                      .subscribe(u => this.castToUser(u))
  }


  /**
   * 
   * @param userJson JSON object representing the User Object return from the 
   * Http request inside the http response
   */
  private castToUser(userJson: User): void {
    this.user = {
      userId: (userJson as any).userId,
      firstname: (userJson as any).firstname,
      lastname: (userJson as any).lastname,
      email: (userJson as any).email,
      token: (userJson as any).token,
      type: (userJson as any).type
    }
  }

}
