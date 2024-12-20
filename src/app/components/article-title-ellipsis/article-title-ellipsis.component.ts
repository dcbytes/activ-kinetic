import { Component, Input } from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-article-title-ellipsis",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./article-title-ellipsis.component.html",
  styleUrl: "./article-title-ellipsis.component.scss",
})
export class ArticleTitleEllipsisComponent {
  @Input() articleTitle: string;

  @Input() variant: "h3" | "h5" = "h3";
}
