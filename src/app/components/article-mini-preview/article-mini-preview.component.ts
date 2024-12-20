import { Component, Input } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ArticleTitleEllipsisComponent } from "../article-title-ellipsis/article-title-ellipsis.component";

@Component({
  selector: "app-article-mini-preview",
  standalone: true,
  imports: [CommonModule, ArticleTitleEllipsisComponent],
  templateUrl: "./article-mini-preview.component.html",
  styleUrl: "./article-mini-preview.component.scss",
})
export class ArticleMiniPreviewComponent {
  @Input() articleImage: string;

  @Input() articleTitle: string;

  @Input() articleCreated: Date;

  @Input() articleHref: string;

  imgLoaded = false;

  loadImage(): void {
    this.imgLoaded = true;
  }
}
