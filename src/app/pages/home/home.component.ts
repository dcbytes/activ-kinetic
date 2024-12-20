import { Component, OnInit } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { PrimeNGConfig } from "primeng/api";
import { RippleModule } from "primeng/ripple";
import { ToastModule } from "primeng/toast";
import { SeparatorComponent } from "../../components/separator/separator.component";
import { NavbarComponent } from "../../global/navbar/navbar.component";
import { EvaluateComponent } from "../../sections/evaluate/evaluate.component";
import { FooterComponent } from "../../sections/footer/footer.component";
import { HeadlinerComponent } from "../../sections/headliner/headliner.component";
import { LocationComponent } from "../../sections/location/location.component";
import { ProcedureComponent } from "../../sections/procedure/procedure.component";

@Component({
  selector: 'app-home',
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
    EvaluateComponent,
    FooterComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  constructor(private readonly primeConfig: PrimeNGConfig) {}

  ngOnInit(): void {
    this.primeConfig.ripple = true;
  }
}

