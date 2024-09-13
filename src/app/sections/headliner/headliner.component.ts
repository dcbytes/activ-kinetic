import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { KButtonComponent } from '../../components/k-button/k-button.component';
import { AnimationOptions, LottieComponent } from 'ngx-lottie';

@Component({
  selector: 'app-headliner',
  standalone: true,
  imports: [CommonModule, KButtonComponent, LottieComponent],
  templateUrl: './headliner.component.html',
  styleUrl: './headliner.component.scss',
})
export class HeadlinerComponent {
  lottieOptions: AnimationOptions = {
    path: 'scroll-down.json',
  };
}
