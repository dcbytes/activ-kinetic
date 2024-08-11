import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-location-pin',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './location-pin.component.html',
  styleUrl: './location-pin.component.scss',
})
export class LocationPinComponent {
  @Input() location: string;
}
