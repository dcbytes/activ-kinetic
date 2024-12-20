import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PrimeNGConfig } from 'primeng/api';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { NavbarComponent } from './global/navbar/navbar.component';
import { FooterComponent } from './sections/footer/footer.component';
import { HeadlinerComponent } from './sections/headliner/headliner.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    ToastModule,
    NavbarComponent,
    HeadlinerComponent,
    RippleModule,
    FooterComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  constructor(private readonly primeConfig: PrimeNGConfig) {}

  ngOnInit(): void {
    this.primeConfig.ripple = true;
  }
}
