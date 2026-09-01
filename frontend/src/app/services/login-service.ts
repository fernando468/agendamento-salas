import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { LoginRequest, LoginResponse } from '../types/login.type';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  login(loginRequest: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.baseUrl}/auth/login`, loginRequest);
  }
}
