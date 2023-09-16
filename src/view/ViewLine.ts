import { TextLine } from "@/model/TextLine";
import "@/styles/viewLine.css";

import { HTMLEscapeParser } from "@/utils/HTMLEscapeParser";
import { toCSSUnit } from "@/utils/style";

export interface ViewLineOption {
  height: string | number;
  top: string | number;
}

export class ViewLine {
  $el = document.createElement("div");

  textLine: TextLine;

  constructor(textLine: TextLine, option?: ViewLineOption) {
    this.textLine = textLine;
    this.render();

    this.$el.classList.add("simeditor-view-line");
    this.$el.style.height = toCSSUnit(option?.height);
    this.$el.style.top = toCSSUnit(option?.top);
    this.$el.style.width = "100%";
  }

  setContent(text: string) {
    this.$el.innerHTML = HTMLEscapeParser.escape(text);
  }

  render() {
    this.setContent(this.textLine!.content);
  }
}
