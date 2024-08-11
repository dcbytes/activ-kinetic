import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-separator',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './separator.component.html',
  styleUrl: './separator.component.scss',
})
export class SeparatorComponent {
  @Input() sectionName: string;
}
