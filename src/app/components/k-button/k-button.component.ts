import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@Component({
  selector: 'app-k-button',
  standalone: true,
  imports: [CommonModule, ButtonModule, RippleModule, ProgressSpinnerModule],
  templateUrl: './k-button.component.html',
  styleUrl: './k-button.component.scss',
})
export class KButtonComponent {
  @Input()
  label: string = '';

  @Input()
  type: 'button' | 'submit' = 'button';

  @Input() disabled: boolean = false;

  @Input() loading: boolean = false;

  @Input() variant: 'filled' | 'outlined' = 'filled';

  @Input() icon: string = '';

  @Output()
  clickEventEmitter: EventEmitter<void> = new EventEmitter<void>();

  onClick(): void {
    this.clickEventEmitter.emit();
  }
}
