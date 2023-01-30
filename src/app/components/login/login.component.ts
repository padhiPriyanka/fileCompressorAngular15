import { Component } from '@angular/core';
import { FormControl,Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  hide = true;
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('',[Validators.required,Validators.minLength(6),Validators.maxLength(12)])

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
