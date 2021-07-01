import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './user/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  user!: User;
  title = 'itravel-webapp';

  constructor(private router: Router) {
    this.user = JSON.parse(localStorage.getItem('user') || '{}');
    console.log("Constructor");
  }

  ngOnInit(): void{
    console.log("Initializing App")
    console.log("user value: " + Object.keys(this.user).length)
    this.initializeApp();
  

  }

  initializeApp(): void {

    if (this.user.type == 'admin') {
      this.router.navigate(['adminstrator/adminstrator']);
      
    } else if (this.user.type == 'commuter') {
     
      this.router.navigate(['commuter/commuter']);
      
    } else{
      console.log("no user logged in, navigating to login");
      this.router.navigate(['/login/login']);
    }


    /*if (Object.keys(this.user).length === 0) {
      console.log("no user logged in, navigating to login");
      this.router.navigate(['login/login']);

    }*/

  }

  
}
