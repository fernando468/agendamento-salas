import { CommonModule } from '@angular/common';
import { Component, forwardRef, input, output } from '@angular/core';
import { FormControl, FormGroup, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

type TypeField = 'text' | 'password' | 'numeric' | 'email' | 'date' | 'time';

@Component({
  selector: 'app-custom-input',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatIconModule,
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomInput),
      multi: true,
    },
  ],
  templateUrl: './custom-input.html',
  styleUrl: './custom-input.css',
})
export class CustomInput {
  form = input.required<FormGroup>();
  name = input.required<string>();
  label = input.required<string>();
  type = input<TypeField>('text');
  required = input<boolean>(false);
  endIcon = input<string>('');
  minLength = input<Null<number>>(null);
  maxLength = input<Null<number>>(null);
  fieldRepeatToCompare = input<Null<string>>(null);

  endIconAction = output<NullOrUndefined<PointerEvent>>();

  value = '';
  isDisabled = false;

  onChange: (value: string) => void = (value) => value;
  onTouched: () => void = () => {
    return;
  };

  writeValue(value: string): void {
    this.value = value;
  }

  registerOnChange(fn: () => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  onInput(value: string): void {
    this.value = value;
    this.onChange(this.value);
  }

  onBlur(): void {
    this.onTouched();
    if (this.fieldRepeatToCompare() !== null) {
      this.control(this.fieldRepeatToCompare()).updateValueAndValidity();
    }
  }

  clickEvent(event: PointerEvent) {
    this.endIconAction.emit(event);
  }

  control(name?: NullOrUndefined<string>): FormControl {
    return this.form().get(name || this.name()) as FormControl;
  }

  message(): string {
    const formField = this.control(this.name());

    if (formField?.hasError('required')) {
      return `${this.label()} é obrigatório(a)`;
    }
    if (formField?.hasError('email')) {
      return 'Informe um e-mail válido';
    }
    if (formField?.hasError('minlength')) {
      return `${this.label()} não atingiu o mínimo de caracteres`;
    }
    if (formField?.hasError('maxlength')) {
      return `${this.label()} passou do máximo de caracteres`;
    }
    if (formField?.hasError('equalTo')) {
      return 'Campos estão diferentes';
    }
    return '';
  }
}
