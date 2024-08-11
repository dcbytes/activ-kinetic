import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { LocationPinComponent } from '../../components/location-pin/location-pin.component';

@Component({
  selector: 'app-location',
  standalone: true,
  imports: [CommonModule, LocationPinComponent],
  templateUrl: './location.component.html',
  styleUrl: './location.component.scss',
})
export class LocationComponent {}
