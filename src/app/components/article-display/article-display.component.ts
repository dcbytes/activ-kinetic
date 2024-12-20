import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";
import { ArticleTitleEllipsisComponent } from "../article-title-ellipsis/article-title-ellipsis.component";

@Component({
  selector: "app-article-display",
  standalone: true,
  imports: [CommonModule, ArticleTitleEllipsisComponent],
  templateUrl: "./article-display.component.html",
  styleUrl: "./article-display.component.scss",
})
export class ArticleDisplayComponent {
  @Input() articleImage: string;

  @Input() articleTitle: string;

  @Input() articleTldr: string;

  @Input() articleCreated: Date;

  @Input() articleHref: string;

  imgLoaded = false;

  loadImage(): void {
    this.imgLoaded = true;
  }
}
