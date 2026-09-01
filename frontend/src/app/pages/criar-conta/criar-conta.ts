import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, RouterLink } from '@angular/router';
import { CustomButton } from '../../components/custom-button/custom-button';
import { CustomCard } from '../../components/custom-card/custom-card';
import { CustomInput } from '../../components/custom-input/custom-input';
import {
  EMAIL_MAX_LENGTH,
  EMAIL_MIN_LENGTH,
  NOME_MAX_LENGTH,
  NOME_MIN_LENGTH,
  SENHA_MAX_LENGTH,
  SENHA_MIN_LENGTH,
} from '../../consts/auth.consts';
import { CriarContaService } from '../../services/criar-conta-service';
import { FormValidations } from '../../validations/inputValidations';

@Component({
  selector: 'app-criar-conta',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatIconModule,
    CustomInput,
    RouterLink,
    CustomButton,
    CustomCard,
  ],
  templateUrl: './criar-conta.html',
  styleUrl: './criar-conta.css',
})
export class CriarConta {
  ocultarSenha = signal(true);
  ocultarRepetirSenha = signal(true);
  loading = signal(false);
  snackBar = inject(MatSnackBar);

  criarContaForm: FormGroup;
  hideSenha = true;
  hideRepetirSenha = true;

  nomeMinLength = NOME_MIN_LENGTH;
  nomeMaxLength = NOME_MAX_LENGTH;
  emailMinLength = EMAIL_MIN_LENGTH;
  emailMaxLength = EMAIL_MAX_LENGTH;
  senhaMinLength = SENHA_MIN_LENGTH;
  senhaMaxLength = SENHA_MAX_LENGTH;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private criarContaService: CriarContaService,
  ) {
    this.criarContaForm = this.fb.group({
      nome: [
        'João',
        [
          Validators.required,
          Validators.minLength(this.nomeMinLength),
          Validators.maxLength(this.nomeMaxLength),
        ],
      ],
      email: [
        'joao@gmail.com',
        [
          Validators.required,
          Validators.email,
          Validators.minLength(this.emailMinLength),
          Validators.maxLength(this.emailMaxLength),
        ],
      ],
      repitaEmail: [
        'joao@gmail.com',
        [
          Validators.required,
          Validators.email,
          Validators.minLength(this.emailMinLength),
          Validators.maxLength(this.emailMaxLength),
          FormValidations.equalTo('email'),
        ],
      ],
      senha: [
        '12345678',
        [
          Validators.required,
          Validators.minLength(this.senhaMinLength),
          Validators.maxLength(this.senhaMaxLength),
        ],
      ],
      repitaSenha: [
        '12345678',
        [
          Validators.required,
          Validators.minLength(this.senhaMinLength),
          Validators.maxLength(this.senhaMaxLength),
          FormValidations.equalTo('senha'),
        ],
      ],
    });
  }

  onSubmit(): void {
    this.criarContaForm.markAllAsTouched();

    if (this.criarContaForm.valid) {
      this.criarContaService.criarConta(this.criarContaForm.value).subscribe({
        next: () => {
          this.snackBar.open('Conta criada com sucesso', 'X');
          this.router.navigate(['/login']);
          this.loading.set(false);
        },
        error: () => {
          this.snackBar.open('Erro ao criar conta', 'X');
          this.loading.set(false);
        },
      });
    }
    setTimeout(() => {
      this.loading.set(false);
    }, 2000);
  }

  clickEventSenha(event: NullOrUndefined<PointerEvent>) {
    this.ocultarSenha.set(!this.ocultarSenha());
    event?.preventDefault();
  }

  clickEventRepetirSenha(event: NullOrUndefined<PointerEvent>) {
    this.ocultarRepetirSenha.set(!this.ocultarRepetirSenha());
    event?.preventDefault();
  }
}
