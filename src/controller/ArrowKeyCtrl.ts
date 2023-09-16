import { Position } from "@/common/Position";
import { Cursor } from "@/core/cursor/Cursor";
import { InputHandler } from "@/view/InputHandler";
import { ViewContainer } from "@/view/ViewContainer";

export class ArrowKeyCtrl {
  cursor;

  strategy = {
    ArrowDown: () => {
      const currentPosition = this.cursor.getPosition();
      if (currentPosition) {
        this.cursor.setPosition(new Position(currentPosition.line + 1, currentPosition.column));
      }
    },
    ArrowLeft: () => {
      this.cursor.moveColumn(-1);
    },
    ArrowRight: () => {
      this.cursor.moveColumn(1);
    },
    ArrowUp: () => {
      const currentPosition = this.cursor.getPosition();
      if (currentPosition) {
        this.cursor.setPosition(new Position(currentPosition.line - 1, currentPosition.column));
      }
    },
  };

  constructor(cursor: Cursor, inputHandler: InputHandler) {
    this.cursor = cursor;
    inputHandler.$el.addEventListener("keydown", (e) => {
      this.strategy[e.key as keyof typeof this.strategy]?.();
    });
  }
}
