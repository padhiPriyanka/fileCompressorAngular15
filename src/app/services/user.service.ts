import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})


export class UserService {

  private baseUrl = 'http://localhost:8000/api/v1/signUp';

  constructor(private http: HttpClient) { }

  create(data):Observable<any>{
    const headers = new HttpHeaders({'Content-Type':'application/json'});
    return this.http.post(`${this.baseUrl}`,data,{headers:headers}).pipe(map((res=>res)));
  }


}
