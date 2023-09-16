import "@/styles/viewport.css";
import { toCSSUnit } from "@/utils/style";

export interface ViewportOption {
  width: number | string;
  height: number | string;
}

export class Viewport {
  $el = document.createElement("div");

  constructor(option: ViewportOption) {
    this.$el.classList.add("simeditor-viewport");
    this.$el.style.width = toCSSUnit(option?.width);
    this.$el.style.height = toCSSUnit(option?.height);
  }
}
