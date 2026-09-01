import { Component, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-custom-card',
  imports: [MatCardModule],
  templateUrl: './custom-card.html',
  styleUrl: './custom-card.css',
})
export class CustomCard {
  title = input<string>();
  subtitle = input<string>();
  customClass = input<string>('');
  customClassNgContent = input<string>('');
}
