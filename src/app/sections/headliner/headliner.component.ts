import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { KButtonComponent } from '../../components/k-button/k-button.component';

@Component({
  selector: 'app-headliner',
  standalone: true,
  imports: [CommonModule, KButtonComponent],
  templateUrl: './headliner.component.html',
  styleUrl: './headliner.component.scss',
})
export class HeadlinerComponent {}
