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
  SENHA_MAX_LENGTH,
  SENHA_MIN_LENGTH,
} from '../../consts/auth.consts';
import { LoginService } from '../../services/login-service';
import { JwtUtil } from '../../utils/jwt.util';

@Component({
  selector: 'app-login',
  standalone: true,
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
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
})
export class Login {
  snackBar = inject(MatSnackBar);
  ocultar = signal(true);

  loginForm: FormGroup;
  hidePassword = true;
  loading = signal(false);

  emailMinLength = EMAIL_MIN_LENGTH;
  emailMaxLength = EMAIL_MAX_LENGTH;
  senhaMinLength = SENHA_MIN_LENGTH;
  senhaMaxLength = SENHA_MAX_LENGTH;

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router,
  ) {
    this.loginForm = this.fb.group({
      email: [
        'joao@email.com',
        [
          Validators.required,
          Validators.email,
          Validators.minLength(this.emailMinLength),
          Validators.maxLength(this.emailMaxLength),
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
    });
  }

  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.loading.set(true);

      this.loginService.login(this.loginForm.value).subscribe({
        next: (response) => {
          JwtUtil.saveToken(response.token);
          this.snackBar.open('Login realizado com sucesso', 'X');
          this.loading.set(false);
          this.router.navigate(['/inicio']);
        },
        error: (error) => {
          this.snackBar.open('Erro ao realizar login', 'X');
          this.loading.set(false);
        },
      });
    }
  }

  clickEvent(event: NullOrUndefined<PointerEvent>) {
    this.ocultar.set(!this.ocultar());
    event?.preventDefault();
  }

  get email() {
    return this.loginForm.get('email');
  }

  get senha() {
    return this.loginForm.get('senha');
  }
}
