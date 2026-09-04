import { Component, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomCard } from '../../components/custom-card/custom-card';
import { SalaModalComponent } from '../../components/salas/modal/sala-modal';
import { SalaService } from '../../services/sala-service';
import { SalaRequest, SalaResponse } from '../../types/sala.type';

@Component({
  selector: 'app-sala',
  imports: [CustomCard, MatButtonModule, MatIconModule, MatDialogModule],
  templateUrl: './sala.html',
  styleUrl: './sala.css',
})
export class Sala {
  salas = signal<SalaResponse[]>([]);
  snackBar = inject(MatSnackBar);

  constructor(
    private salaService: SalaService,
    private dialog: MatDialog,
  ) {
    this.carregarSalas();
  }

  carregarSalas(): void {
    this.salaService.buscarTodos().subscribe({
      next: (salas) => this.salas.set(salas),
      error: () => this.salas.set([]),
    });
  }

  abrirModalSala(sala?: SalaResponse): void {
    const dialogRef = this.dialog.open(SalaModalComponent, {
      width: '420px',
      data: sala ?? null,
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((resultado: SalaRequest | undefined) => {
      if (!resultado) {
        return;
      }

      const payload: SalaRequest = {
        nome: resultado.nome.trim(),
        capacidade: Number(resultado.capacidade),
      };

      const operacao =
        sala?.id != null
          ? this.salaService.atualizar(sala.id, payload)
          : this.salaService.salvar(payload);

      operacao.subscribe({
        next: () => {
          const mensagem = sala?.id ? 'Sala atualizada com sucesso' : 'Sala criada com sucesso';
          this.snackBar.open(mensagem, 'X');
          this.carregarSalas();
        },
        error: () => {
          const mensagem = sala?.id ? 'Erro ao atualizar sala' : 'Erro ao criar sala';
          this.snackBar.open(mensagem, 'X');
          return undefined;
        },
      });
    });
  }

  removerSala(id?: number): void {
    if (id == null) {
      return;
    }

    const confirmar = window.confirm('Deseja realmente excluir esta sala?');
    if (!confirmar) {
      return;
    }

    this.salaService.excluir(id).subscribe({
      next: () => {
        this.snackBar.open('Sala excluida com sucesso', 'X');
        this.carregarSalas();
      },
      error: () => {
        this.snackBar.open('Erro ao excluir sala', 'X');
        return undefined;
      },
    });
  }
}
