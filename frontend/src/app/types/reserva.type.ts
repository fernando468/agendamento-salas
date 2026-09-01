import { SalaResponse } from './sala.type';

export enum StatusReserva {
  Cancelada = 'Cancelada',
  Confirmada = 'Confirmada',
}

export type ReservaResponse = {
  id: number;
  sala: SalaResponse;
  data: string;
  horaInicio: string;
  horaFim: string;
  motivo: string;
  statusReserva: StatusReserva;
  nomeQuemReservou: string;
  ativo: boolean;
  minhaReserva: boolean;
};

export type ReservaRequest = {
  data: string;
  horaInicio: string;
  horaFim: string;
  motivo: string;
  salaId: number;
};

export type TotalAgrupadoResponse = {
  totalConfirmada: number;
  totalCancelada: number;
};
