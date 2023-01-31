import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


const baseUrl = 'http://localhost:8000/api/v1/signup'

export class AuthenticationClient{

  constructor(private http: HttpClient) { }

  public register(userName:string,
    email:string,
    password:string):Observable<any>{
      return this.http.post(baseUrl,{userName:userName,email:email,password:password},{
        responseType:"json"
      });

  }
}
