import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-procedure',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './procedure.component.html',
  styleUrl: './procedure.component.scss'
})
export class ProcedureComponent {
  @Input() procedure: string;
  @Input() description: string;
  @Input() picture: string;
  @Input() points: string[];
}
