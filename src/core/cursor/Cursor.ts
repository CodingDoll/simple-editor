import { ViewCursor } from "./ViewCursor";

import { Event } from "@/common/Event";
import { Position } from "@/common/Position";
import { Subject } from "@/common/Subject";

import { TextModel } from "@/core/TextModel";

export interface IPositionDelta {
  lineDelta: number;
  columnDelta: number;
}

export class PositionEvent extends Event {
  type: "PositionChange";
  position: Position;
  constructor(type: "PositionChange", position: Position) {
    super();
    this.type = type;
    this.position = position;
  }
}

export class Cursor extends Subject {
  private textModel: TextModel;
  private position: Position | null = null;
  viewCursor: ViewCursor = new ViewCursor();

  setPosition(pos: Position) {
    let finalLine = pos.line;
    let finalColumn = pos.column;

    if (pos.line < 0) finalLine = 0;
    if (pos.line > this.textModel.lines.length - 1) finalLine = this.textModel.lines.length - 1;

    if (pos.column < 0) finalColumn = 0;
    if (pos.column > this.textModel.lines[pos.line].content.length) finalColumn = this.textModel.lines[pos.line].content.length;

    this.position = new Position(finalLine, finalColumn);
    this.emit("change", new PositionEvent("PositionChange", this.position));
  }

  moveColumn(column: number) {
    let finalColumn = this.position!.column + column;

    let finalLine = this.position!.line;

    if (finalColumn < 0) {
      finalLine -= 1;
      finalColumn = this.textModel.lines[finalLine].content.length;

      if (finalLine < 0) {
        finalLine = 0;
        finalColumn = 0;
      }
    } else if (finalColumn > this.textModel.lines[finalLine].content.length) {
      finalColumn = 0;
      finalLine += 1;
      if (finalLine > this.textModel.lines.length - 1) {
        finalLine = this.textModel.lines.length - 1;
        finalColumn = this.textModel.lines[finalLine].content.length;
      }
    }

    this.setPosition(new Position(finalLine, finalColumn));
  }

  getPosition() {
    return this.position;
  }

  constructor(textModel: TextModel) {
    super();
    this.textModel = textModel;

    this.subscribe("change", (e) => {
      this.viewCursor.setPosition(e.position);
    });
  }

  // #region event related
  protected emit(type: "change", e: PositionEvent) {
    super.emit(type, e);
  }
  subscribe(type: "change", handler: (e: PositionEvent) => void): void {
    super.subscribe(type, handler as (e: Event) => void);
  }
  // #endregion
}
