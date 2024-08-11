import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';

@Component({
  selector: 'app-k-button',
  standalone: true,
  imports: [CommonModule, ButtonModule, RippleModule],
  templateUrl: './k-button.component.html',
  styleUrl: './k-button.component.scss',
})
export class KButtonComponent {
  @Input()
  label: string = '';

  @Input()
  type: 'button' | 'submit' = 'button';

  @Output()
  clickEventEmitter: EventEmitter<void> = new EventEmitter<void>();

  onClick(): void {
    this.clickEventEmitter.emit();
  }
}
