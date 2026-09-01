import { NgClass } from '@angular/common';
import { Component, inject, input, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ReservaService } from '../../services/reserva-service';
import { ReservaRequest, ReservaResponse, TotalAgrupadoResponse } from '../../types/reserva.type';
import { SalaResponse } from '../../types/sala.type';
import { DateFormatUtil } from '../../utils/date-format.util';
import { CustomCard } from '../custom-card/custom-card';
import { ReservaModalComponent, ReservaModalData } from './modal/reserva-modal';

@Component({
  selector: 'app-reservas',
  imports: [
    CustomCard,
    MatTableModule,
    MatChipsModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    MatTooltipModule,
    NgClass,
  ],
  templateUrl: './reservas.html',
  styleUrl: './reservas.css',
  providers: [],
})
export class Reservas {
  displayedColumns: string[] = ['sala', 'data', 'horario', 'motivo', 'status', 'acoes'];
  totaisReservas = input.required<TotalAgrupadoResponse>();
  dataSource = signal<ReservaResponse[]>([]);
  snackBar = inject(MatSnackBar);

  constructor(
    private reservaService: ReservaService,
    private dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.carregarReservas();
  }

  carregarReservas(): void {
    this.reservaService.buscarTodas().subscribe({
      next: (reservas) => this.dataSource.set(reservas),
      error: () => this.dataSource.set([]),
    });
  }

  carregarMinhasReservas(): void {
    this.reservaService.buscarMinhasReservas().subscribe({
      next: (reservas) => this.dataSource.set(reservas),
      error: () => this.dataSource.set([]),
    });
  }

  carregarTotais() {
    this.reservaService.buscarTotaisReservas().subscribe({
      next: (total) => {
        this.totaisReservas().totalConfirmada = total.totalConfirmada;
        this.totaisReservas().totalCancelada = total.totalCancelada;
      },
      error: () => {
        this.totaisReservas().totalConfirmada = 0;
        this.totaisReservas().totalCancelada = 0;
      },
    });
  }

  formatarData(data: string): string {
    return DateFormatUtil.formatDate(data);
  }

  formatarHora(hora: string): string {
    return DateFormatUtil.formatTime(hora);
  }

  abrirModalReserva(reserva?: ReservaResponse): void {
    const dialogRef = this.dialog.open<ReservaModalComponent, ReservaModalData>(
      ReservaModalComponent,
      {
        width: '520px',
        maxWidth: 'calc(100vw - 32px)',
        data: {
          data: reserva?.data ?? '',
          horaInicio: reserva?.horaInicio ?? '',
          horaFim: reserva?.horaFim ?? '',
          motivo: reserva?.motivo ?? '',
          sala: reserva?.sala ?? null,
          modoEdicao: reserva != null,
        },
        disableClose: true,
      },
    );

    dialogRef.afterClosed().subscribe((resultado: ReservaModalData | undefined) => {
      if (!resultado || !this.isSalaSelecionada(resultado.sala)) {
        return;
      }

      const payload: ReservaRequest = {
        data: resultado.data,
        horaInicio: resultado.horaInicio,
        horaFim: resultado.horaFim,
        motivo: resultado.motivo.trim(),
        salaId: resultado.sala.id,
      };

      const operacao = reserva?.id
        ? this.reservaService.atualizar(reserva.id, payload)
        : this.reservaService.salvar(payload);

      operacao.subscribe({
        next: () => {
          const mensagem = reserva?.id
            ? 'Reserva atualizada com sucesso'
            : 'Reserva criada com sucesso';
          this.snackBar.open(mensagem, 'X');
          this.carregarReservas();
          this.carregarTotais();
          this.carregarMinhasReservas();
        },
        error: () => {
          const mensagem = reserva?.id ? 'Erro ao atualizar reserva' : 'Erro ao criada reserva';
          this.snackBar.open(mensagem, 'X');
          return undefined;
        },
      });
    });
  }

  cancelarReserva(reserva: ReservaResponse): void {
    if (!window.confirm('Deseja cancelar esta reserva?')) {
      return;
    }

    this.reservaService.cancelar(reserva.id).subscribe({
      next: () => {
        this.snackBar.open('Reserva cancelada com sucesso', 'X');
        this.carregarReservas();
        this.carregarTotais();
      },
      error: () => {
        this.snackBar.open('Erro ao cancelar reserva', 'X');
        return undefined;
      },
    });
  }

  private isSalaSelecionada(sala: SalaResponse | null): sala is SalaResponse & { id: number } {
    return sala?.id != null;
  }
}
