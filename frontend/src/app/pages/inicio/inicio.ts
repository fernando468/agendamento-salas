import { Component, signal } from '@angular/core';
import {
  CalendarDateFormatter,
  CalendarDayViewComponent,
  CalendarEvent,
  DateAdapter,
  provideCalendar,
} from 'angular-calendar';
import { Reservas } from '../../components/reservas/reservas';

import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { CustomCalendarDateFormatter } from '../../formatter/CustomCalendarDateFormatter';
import { ReservaService } from '../../services/reserva-service';
import { TotalAgrupadoResponse } from '../../types/reserva.type';

registerLocaleData(localePt);

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [Reservas, CalendarDayViewComponent],
  templateUrl: './inicio.html',
  styleUrl: './inicio.css',
  providers: [
    provideCalendar({ provide: DateAdapter, useFactory: adapterFactory }),
    { provide: CalendarDateFormatter, useClass: CustomCalendarDateFormatter },
  ],
})
export class Inicio {
  locale = 'pt-BR';
  viewDate: Date = new Date();
  events = signal<CalendarEvent[]>([]);
  totaisReservas = signal<TotalAgrupadoResponse>({ totalConfirmada: 0, totalCancelada: 0 });

  constructor(private reservaService: ReservaService) {
    this.buscarMinhasReservas();
  }

  buscarTotalReservas(): void {
    this.reservaService.buscarTotaisReservas().subscribe({
      next: (total) => {
        this.totaisReservas.set(total);
      },
      error: () => {
        this.viewDate = new Date();
      },
    });
  }

  buscarMinhasReservas(): void {
    this.reservaService.buscarMinhasReservas().subscribe({
      next: (reservas) => {
        const minhasReservas = reservas.map((reserva) => {
          const dataInicio = this.criarDataHora(reserva.data, reserva.horaInicio);
          const dataFim = this.criarDataHora(reserva.data, reserva.horaFim);
          return {
            title: reserva.sala.nome,
            start: dataInicio,
            end: dataFim,
            editable: false,
            deletable: false,
          };
        });

        this.events.set(minhasReservas);
      },
      error: () => {
        this.events.set([]);
      },
    });
  }

  criarDataHora(data: string, hora: string): Date {
    const [ano, mes, dia] = data.split('-').map(Number);
    const [horas, minutos, segundos] = hora.split(':').map(Number);

    return new Date(ano, mes - 1, dia, horas, minutos, segundos);
  }
}
