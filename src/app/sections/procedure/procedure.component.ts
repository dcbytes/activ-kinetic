import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MarkdownModule } from 'ngx-markdown';

@Component({
  selector: 'app-procedure',
  standalone: true,
  imports: [CommonModule, MarkdownModule],
  templateUrl: './procedure.component.html',
  styleUrl: './procedure.component.scss',
})
export class ProcedureComponent {
  @Input() procedure: string;
  @Input() markdownFile: string;
}
