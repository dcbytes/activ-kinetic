import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-nav-link',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './nav-link.component.html',
  styleUrl: './nav-link.component.scss',
})
export class NavLinkComponent {
  @Input() link: string;
  @Input() text: string;
  @Input() icon: string;
  @Input() activeRoute: boolean;
}
