import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {

  hide = true;
  checked= false;
  userName = new FormControl('',[Validators.required,Validators.minLength(2)]);
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('',[Validators.required,Validators.minLength(6),Validators.maxLength(12)])

  getUserNameMessage() {
    if (this.userName.hasError('required')) {
      return 'You must enter a value';
    }
    return this.userName.hasError('required') ? 'Username must be of atleast 2 character' : '';
  }

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }
    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  getPassErrorMessage(){

    if(this.password.hasError('required')){
      return 'Please enter a Password';
    }
    return this.password.hasError('password')? 'Password must be of atleast 6 character' : '';
  }
}
