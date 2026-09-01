import { Component, Inject, OnInit, computed, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SalaService } from '../../../services/sala-service';
import { SalaResponse } from '../../../types/sala.type';
import { CustomInput } from '../../custom-input/custom-input';

export type ReservaModalData = {
  data: string;
  horaInicio: string;
  horaFim: string;
  motivo: string;
  sala: SalaResponse | null;
  modoEdicao?: boolean;
};

@Component({
  selector: 'app-reserva-modal',
  imports: [
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    CustomInput,
  ],
  templateUrl: './reserva-modal.html',
  styleUrl: './reserva-modal.css',
})
export class ReservaModalComponent implements OnInit {
  private readonly formBuilder = inject(FormBuilder);
  private readonly salaService = inject(SalaService);
  private readonly dialogRef = inject(MatDialogRef<ReservaModalComponent>);

  readonly salas = signal<SalaResponse[]>([]);
  readonly form;
  readonly salaBusca;
  readonly salasFiltradas;
  readonly modoEdicao;

  constructor(@Inject(MAT_DIALOG_DATA) private readonly data: ReservaModalData) {
    this.modoEdicao = data.modoEdicao ?? false;
    this.form = this.formBuilder.group({
      data: [data.data, Validators.required],
      horaInicio: [data.horaInicio, Validators.required],
      horaFim: [data.horaFim, Validators.required],
      motivo: [data.motivo, [Validators.required, Validators.minLength(2)]],
      sala: [data.sala, Validators.required],
    });
    this.salaBusca = signal<string | SalaResponse | null>(data.sala);
    this.salasFiltradas = computed(() => this.filtrarSalas(this.salaBusca()));
    this.form.controls.sala.valueChanges.subscribe((valor) => this.salaBusca.set(valor));
  }

  ngOnInit(): void {
    this.salaService.buscarTodos().subscribe({
      next: (salas) => this.salas.set(salas),
      error: () => this.salas.set([]),
    });
  }

  exibirSala(sala: SalaResponse | null): string {
    return sala?.nome ?? '';
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.dialogRef.close(this.form.getRawValue());
  }

  cancelar(): void {
    this.dialogRef.close();
  }

  private filtrarSalas(valor: string | SalaResponse | null): SalaResponse[] {
    const nome =
      typeof valor === 'string' ? valor.toLowerCase() : (valor?.nome.toLowerCase() ?? '');
    return this.salas().filter((sala) => sala.nome.toLowerCase().includes(nome));
  }
}
