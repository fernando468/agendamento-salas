import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { SalaRequest, SalaResponse } from '../types/sala.type';

@Injectable({
  providedIn: 'root',
})
export class SalaService {
  baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  salvar(salaRequest: SalaRequest): Observable<SalaResponse> {
    return this.http.post<SalaResponse>(`${this.baseUrl}/salas`, salaRequest);
  }

  atualizar(id: number, salaRequest: SalaRequest): Observable<SalaResponse> {
    return this.http.put<SalaResponse>(`${this.baseUrl}/salas/${id}`, salaRequest);
  }

  buscarPorId(id: number): Observable<SalaResponse> {
    return this.http.get<SalaResponse>(`${this.baseUrl}/salas/${id}`);
  }

  buscarTodos(): Observable<SalaResponse[]> {
    return this.http.get<SalaResponse[]>(`${this.baseUrl}/salas/ativas`);
  }

  excluir(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/salas/${id}`);
  }
}
