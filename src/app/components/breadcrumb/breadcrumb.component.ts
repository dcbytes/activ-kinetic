import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";

@Component({
  selector: "app-breadcrumb",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./breadcrumb.component.html",
  styleUrl: "./breadcrumb.component.scss",
})
export class BreadcrumbComponent {
  _items: { label: string; href?: string }[] = [];
  get items(): { label: string; href?: string }[] {
    return this._items;
  }
  @Input()
  set items(values: { label: string; href?: string }[] | string[]) {
    if (typeof values[0] === "string") {
      this._items = (values as string[]).map((label, index) => ({
        label,
      }));
    } else {
      this._items = values as { label: string; href?: string }[];
    }
  }
  @Input()
  color: "orange" | "white" = "orange";
}
