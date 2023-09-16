import { Position } from "@/common/Position";
import "@/styles/caret.css";

export class ViewCursor {
  $el = document.createElement("div");

  setPosition(p: Position) {
    this.$el.style.display = "block";
    const coordinate = Position.toCoordinate(p);
    this.$el.style.top = coordinate.top;
    this.$el.style.left = coordinate.left;
  }

  constructor() {
    this.$el.classList.add("simeditor-caret");
    this.$el.style.display = "none";
  }
}
