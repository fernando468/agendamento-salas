import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { CriarContaRequest, CriarContaResponse } from '../types/criar-conta.type';

@Injectable({
  providedIn: 'root',
})
export class CriarContaService {
  apiURL = environment.apiUrl;

  constructor(private http: HttpClient) {}

  criarConta(criarContaRequest: CriarContaRequest): Observable<CriarContaResponse> {
    return this.http.post<CriarContaResponse>(`${this.apiURL}/auth/register`, criarContaRequest);
  }
}
