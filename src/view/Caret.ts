import { Position } from "@/model/Position";
import "@/styles/caret.css";

export class Caret {
  $el = document.createElement("div");

  position: Position | null = null;
  setPosition(p: Position) {
    this.position = p;
    this.render();
  }

  constructor() {
    this.$el.classList.add("simeditor-caret");
  }

  render() {
    if (this.position) {
      const coordinate = Position.toCoordinate(this.position);
      this.$el.style.top = coordinate.top;
      this.$el.style.left = coordinate.left;
    }
  }
}
