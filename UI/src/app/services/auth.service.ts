import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl: string = 'http://localhost:5039/api/';
  constructor(private http: HttpClient) {}

  signUp(userObj: any) {
    return this.http.post<any>(`${this.baseUrl}user/register`, userObj);
  }

  login(loginObj: any) {
    return this.http.post<any>(`${this.baseUrl}user/authenticate`, loginObj);
  }
  companySignUp(companyObj: any) {
    return this.http.post<any>(
      `${this.baseUrl}company/companyRegister`,
      companyObj
    );
  }
  companyLogin(loginObj: any) {
    return this.http.post<any>(
      `${this.baseUrl}company/companyAuthenticate`,
      loginObj
    );
  }
}
