import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ReservaRequest, ReservaResponse, TotalAgrupadoResponse } from '../types/reserva.type';

@Injectable({
  providedIn: 'root',
})
export class ReservaService {
  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  buscarTodas(): Observable<ReservaResponse[]> {
    return this.http.get<ReservaResponse[]>(`${this.apiUrl}/reservas`);
  }

  buscarPorSala(salaId: number): Observable<ReservaResponse[]> {
    return this.http.get<ReservaResponse[]>(`${this.apiUrl}/reservas/sala/${salaId}`);
  }

  buscarMinhasReservas(): Observable<ReservaResponse[]> {
    return this.http.get<ReservaResponse[]>(`${this.apiUrl}/reservas/minhas-reservas`);
  }

  buscarTotaisReservas(): Observable<TotalAgrupadoResponse> {
    return this.http.get<TotalAgrupadoResponse>(`${this.apiUrl}/reservas/totais-reservas`);
  }

  salvar(reserva: ReservaRequest): Observable<ReservaResponse> {
    return this.http.post<ReservaResponse>(`${this.apiUrl}/reservas`, reserva);
  }

  atualizar(id: number, reserva: ReservaRequest): Observable<ReservaResponse> {
    return this.http.put<ReservaResponse>(`${this.apiUrl}/reservas/${id}`, reserva);
  }

  cancelar(id: number): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/reservas/cancelar/${id}`, {});
  }
}
