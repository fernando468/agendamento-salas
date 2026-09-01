import { Component, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-custom-button',
  imports: [MatButtonModule, MatIconModule, MatProgressSpinner],
  templateUrl: './custom-button.html',
  styleUrl: './custom-button.css',
})
export class CustomButton {
  loading = input<boolean>(false);
  labelLoading = input.required<string>();
  labelNotLoading = input<string>();
  color = input<string>('primary');
}
