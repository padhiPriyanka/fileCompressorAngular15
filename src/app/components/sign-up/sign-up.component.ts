import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { ResponseService } from 'src/app/services/response.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {

  constructor(private router: Router,
    private userService: UserService,
    private response: ResponseService,
   ) { }

    user: User = {
      name: '',
      email: '',
      password: ''
    };

  hide = true;
  checked = false;
  name = new FormControl('', [Validators.required, Validators.minLength(2)]);
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(12)])

  onSubmit() {
    console.log(this.user);
    this.userService.create(this.user).subscribe({
      next: (res) => {
        console.log(res);
        console.log('registration succesful');
        this.response.success('Registration Successful', true);
        this.router.navigate(['login']);
      },
      error: (e) => {
        console.error(e);
        this.response.error(e);
      }
    });
  }

  selectedCheckbox(){
    return !this.checked
  }

  getUserNameMessage() {
    if (this.name.hasError('required')) {
      return 'You must enter a value';
    }
    return this.name.hasError('minlength') ? 'Username must be of atleast 2 character' : '';
  }

  getEmailErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }
    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  getPassErrorMessage() {
    if (this.password.hasError('required')) {
      return 'Please enter a Password';
    }
    return this.password.hasError('minlength') ? 'Password must be of atleast 8 character' : '';
  }

  
  }











