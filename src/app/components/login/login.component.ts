import { Component, Input } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ResponseService } from 'src/app/services/response.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private authService: AuthenticationService,
    private router: Router,
    private response: ResponseService) { }

  loginObj: User = {
    email: '',
    password: ''
  };

  hide = true;
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(12)])

  onLogin() {

    this.authService.login(this.loginObj).subscribe({
      next: (res) => {
        console.log(res.access_token);
        localStorage.setItem('access-token', res.access_token);
        localStorage.setItem('refresh-token', res.refresh_token);
        console.log("login successful")
        this.router.navigateByUrl('/upload');
      },
      error: (e) => {
        console.log(e);
        this.response.error(e);
      }
    })

  }

  getErrorMessage() {
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
