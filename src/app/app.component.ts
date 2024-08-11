import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { NavbarComponent } from './global/navbar/navbar.component';
import { HeadlinerComponent } from './sections/headliner/headliner.component';
import { RippleModule } from 'primeng/ripple';
import { PrimeNGConfig } from 'primeng/api';
import { LocationComponent } from './sections/location/location.component';
import { SeparatorComponent } from './components/separator/separator.component';
import { ProcedureComponent } from './sections/procedure/procedure.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    ToastModule,
    NavbarComponent,
    HeadlinerComponent,
    RippleModule,
    LocationComponent,
    SeparatorComponent,
    ProcedureComponent,
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
