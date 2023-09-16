import { ViewContainer } from "./view/ViewContainer";
import { Viewport } from "./view/Viewport";
import { InputHandler } from "./view/InputHandler";
import { ArrowKeyCtrl } from "@/controller/ArrowKeyCtrl";

import "@/styles/simeditor.css";
import { TextModel } from "./core/TextModel";
import { Position } from "@/common/Position";
import { Cursor } from "./core/cursor/Cursor";

export class Simeditor {
  private $el = document.createElement("div");
  private viewport: Viewport | null = null;
  private textModel = new TextModel();
  private viewContainer = new ViewContainer(this.textModel);
  private primaryCursor: Cursor = new Cursor(this.textModel);
  private inputHandler: InputHandler = new InputHandler(this.primaryCursor, this.textModel, this.viewContainer);

  constructor() {
    this.$el.classList.add("simeditor");

    this.$el.addEventListener("click", (e) => {
      const positon = Position.getPosition(this.textModel, e.offsetX, e.offsetY);

      this.primaryCursor.setPosition(positon);

      this.inputHandler.$el.focus();
    });
  }

  mount(node: Element) {
    const nodeComputedStyle = getComputedStyle(node);
    this.$el.style.width = nodeComputedStyle.width;
    this.$el.style.height = nodeComputedStyle.height;

    this.viewport = new Viewport({ width: nodeComputedStyle.width, height: nodeComputedStyle.height });
    this.viewContainer.render();

    this.viewport.$el.appendChild(this.primaryCursor.viewCursor.$el);

    this.$el.appendChild(this.inputHandler.$el);

    this.viewport!.$el.appendChild(this.viewContainer.$el);
    this.$el.append(this.viewport.$el);
    new ArrowKeyCtrl(this.primaryCursor, this.inputHandler);
    node.appendChild(this.$el);
  }
}
