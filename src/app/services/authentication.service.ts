import { Injectable } from '@angular/core';
import { AuthenticationClient } from '../clients/authentication.client';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private authService : AuthenticationClient) { }

  
}
