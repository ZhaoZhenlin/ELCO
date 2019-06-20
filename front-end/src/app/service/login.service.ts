import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';



const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  baseUrl = environment.baseUrl;

  public constructor(private http: HttpClient) {
  }

  login(usr: string, pwd: string): Observable<any> {
    const url = `${this.baseUrl}/v0/user/login`;
    // const url = `/v0/user/login`;
    return this.http.post(url, {
      username: usr,
      password: pwd
    }, httpOptions);
  }
}






