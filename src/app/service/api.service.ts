import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { User } from '../model/user.model';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseurl = 'http://localhost:3000/enquiry' 
  constructor( private http : HttpClient) { }

  postRegister(registerObj: User){
    return this.http.post<User>(`${this.baseurl}`, registerObj)
  }
}
