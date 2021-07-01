import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Route, Router } from '@angular/router';
import { finalize, first } from 'rxjs/operators';

import { MessageService } from "primeng/api";
import { User } from 'src/app/user/user';
import { UserComponent } from 'src/app/user/user.component';
import { AuthenticationService } from '../authentication.service';
import { Credentials } from '../credentials';

/**
 * @author Dominic Mundirewa
 * Component housing the Login Model and view 
 */

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [MessageService]
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  credentials: Credentials;
  user!: User;
  loading: boolean = false;
  errorMessage: string = '';
  
  submitted = false;
  returnUrl: string;

  constructor(private fb: FormBuilder, private authenticationService: AuthenticationService,
             private router: Router, private messageService: MessageService) { 
    this.returnUrl = '';
    this.loginForm = this.fb.group({
      email: ['',Validators.required],
      password: ['',Validators.required]
    });
    this.credentials = {email: '', password: ''};
  }

  ngOnInit(): void {
    this.createForm();
  }

  private createForm(): void {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  private castToUser(userJson: User) {
    this.user = {
      userId: (userJson as any).userId,
      firstname: (userJson as any).firstname,
      lastname: (userJson as any).lastname,
      email: (userJson as any).email,
      type: (userJson as any).type,
      token: (userJson as any).token
    };
  }



  get f() {return this.loginForm.controls;}

  login() {
    //since the loginForm is valid
    //this.submitted = true;

    if (this.loginForm.invalid) {
      console.log("Invalid Form");
      return;
      
    }
    this.loading = true;

    console.log("Logging in User  ");
    this.loading = true;
    console.log(this.loading);
    this.credentials.email = this.f.email.value;
    this.credentials.password = this.f.password.value;
    this.authenticationService.login(this.credentials)
          .pipe(first(), finalize(()=> this.loading = false))
          .subscribe(
            data => {
             
              if (this.authenticationService.userValue.type == "commuter") {
                //navigate to commuter homepage
                console.log("Navigating user to their Home according to User Type");
                this.router.navigate(['/commuter/commuter']);
                this.showSuccess();

              }
              else if(this.authenticationService.userValue.type == "admin"){
                //navigate to Adminstrator
                console.log("Navigating users to their Home according to the User Type");
                this.router.navigate(['/adminstrator/adminstrator'])
                this.showSuccess();

              }else if(this.authenticationService.userValue.type == "Commuter") {
                //navigate to commuter account
                console.log("navigating to commuter account ");
                this.router.navigate(['/commuter/commuter']);
                this.showSuccess();

              }else{
                this.errorMessage = "Failed to Login, wrong email and/or password";
                this.showError();
                this.router.navigate(['/login/login']);
                this.createForm();
                
              }

            },
            error => {
              console.error("Failed to login" + error);
              console.log("Navigating user to Home , Login Failed");
              this.router.navigate(['']); 
            }
          );
  }

  signup(): void {
    this.router.navigate(['/register/register'])
  }

  showSuccess() {
    this.messageService.add({severity:'success', summary: 'Success', detail: 'Logged in successfully'});
  }

  showError() {
    this.messageService.add({severity:'error', summary: 'Error', detail: this.errorMessage});
  }

}
