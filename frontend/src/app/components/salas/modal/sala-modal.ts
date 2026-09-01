import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SalaRequest, SalaResponse } from '../../../types/sala.type';
import { CustomInput } from '../../custom-input/custom-input';

@Component({
  selector: 'app-sala-modal',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    CustomInput,
  ],
  templateUrl: './sala-modal.html',
  styleUrl: './sala-modal.css',
})
export class SalaModalComponent {
  form: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<SalaModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SalaResponse | null,
    private fb: FormBuilder,
  ) {
    this.form = this.fb.group({
      nome: [
        data?.nome ?? '',
        [Validators.required, Validators.minLength(2), Validators.maxLength(20)],
      ],
      capacidade: [
        data?.capacidade ?? 1,
        [Validators.required, Validators.min(1), Validators.max(100)],
      ],
    });
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.dialogRef.close(this.form.value as SalaRequest);
  }

  cancelar(): void {
    this.dialogRef.close();
  }
}
