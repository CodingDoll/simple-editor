import "@/styles/background.css";
import "@/styles/viewContainer.css";
import { ViewLine } from "./ViewLine";
import { TextModel } from "@/core/TextModel";

export class ViewContainer {
  $el = document.createElement("div");

  overlay = document.createElement("div");

  viewLines: ViewLine[] = [];

  textModel: TextModel;

  constructor(textModel: TextModel) {
    this.textModel = textModel;

    this.overlay.classList.add("simeditor-overlay");
    this.$el.appendChild(this.overlay);

    this.$el.classList.add("simeditor-background");
    this.$el.classList.add("simeditor-view-container");
  }

  render() {
    this.viewLines = this.textModel.lines.map((e, index) => new ViewLine(e, { height: 28, top: index * 28 }));
    this.$el.replaceChildren(...this.viewLines.map((i) => i.$el));
    this.$el.appendChild(this.overlay);
  }
}
