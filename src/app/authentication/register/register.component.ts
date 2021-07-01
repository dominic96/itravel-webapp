import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize, first } from 'rxjs/operators';

import { MessageService } from "primeng/api";
import { User } from 'src/app/user/user';
import { AuthenticationService } from '../authentication.service';
import { NewUser } from './new-user';


/**
 * @author Dominic Mundirewa
 */
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [MessageService]
})
export class RegisterComponent implements OnInit {

  signupForm: FormGroup;
  user: NewUser = {firstname: '', lastname: '', email:'', password: '', type: ''};
  password: string = '';
  errorMessage: string = '';
  loading: boolean = false;

  constructor(private fb: FormBuilder, 
              private authenticationService: AuthenticationService,
              private router: Router, private messageService: MessageService) {
    this.signupForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', Validators.required],
      password: [this.password, Validators.required],
      type: ['commuter', Validators.required]
    });

  

   }

  ngOnInit(): void {

  }


  get s() {return this.signupForm.controls;}

  public registerUser(): void {

    console.log("New User: " + this.signupForm);

    if (this.signupForm.invalid) {
      console.log("Invalid Form");
      return;
      
    }

    this.loading = true;

    console.log("Registering new User...");
    this.user.firstname = this.s.firstname.value;
    this.user.lastname = this.s.lastname.value;
    this.user.email = this.s.email.value;
    this.user.password = this.s.password.value;
    this.user.type = this.s.type.value;
    console.log("Firstname: " + this.user.firstname);

 

    this.authenticationService.register(this.user)
                                .pipe(first(), finalize(() => this.loading = false))
                                .subscribe(
                                  data => {
                                    console.log("Registered user with userId: " + data.userId);
                                    this.showSuccess();
                                    this.login();
                                  },
                                  (error) => {
                                    console.error("failed to register: " + error)
                                    this.errorMessage = "Registration Failed, retry in a moment";
                                    this.showError();
                                    this.router.navigate(['/register/register'])            
                                
                                  }
                                );

  }

  login(): void {
    this.router.navigate(['/login/login']);   
  }


  showSuccess() {
    this.messageService.add({severity:'success', summary: 'Success', detail: 'Registered account successfully'});
  }

  showError() {
    this.messageService.add({severity:'error', summary: 'Error', detail: this.errorMessage});
  }
}
