import { TextModel } from "@/core/TextModel";
import { TextLine } from "@/model/TextLine";
import { Position } from "@/common/Position";
import { ViewContainer } from "./ViewContainer";
import { Cursor } from "@/core/cursor/Cursor";

export class InputHandler {
  $el = document.createElement("textarea");

  cursor: Cursor;
  textModel: TextModel;
  viewModel: ViewContainer;

  handler: Record<string, (e: InputEvent) => void> = {
    insertCompositionText: (e: InputEvent) => {},
    insertText: (e: InputEvent) => {
      const currentPos = this.cursor.getPosition()!;
      this.textModel.lines[currentPos.line].insert(e.data!, currentPos.column);

      this.viewModel.viewLines[currentPos.line].render();

      this.cursor.moveColumn(1);
    },
    insertFromPaste: (e: InputEvent) => {},
    insertLineBreak: (e: InputEvent) => {
      const currentPos = this.cursor.getPosition()!;
      const nextLineContent = this.textModel.lines[currentPos.line].remove(currentPos.column);

      const nextTextLine = new TextLine();
      nextTextLine.content = nextLineContent;

      this.textModel.lines.splice(currentPos.line + 1, 0, nextTextLine);
      this.viewModel.render();

      this.cursor.setPosition(new Position(currentPos.line + 1, 0));
    },
    deleteContentBackward: (e: InputEvent) => {
      const currentPos = this.cursor.getPosition()!;
      if (currentPos.column) {
        this.textModel.lines[currentPos.line].remove(currentPos.column - 1, currentPos.column);
        this.viewModel.render();
        this.cursor.moveColumn(-1);
      } else {
        if (currentPos.line) {
          if (this.textModel.lines[currentPos.line].content.length === 0) this.textModel.lines.splice(currentPos.line, 1);
          const previousLine = this.textModel.lines[currentPos.line - 1];
          const previousLineLength = previousLine.content.length;
          previousLine.remove(previousLineLength - 1, previousLineLength);
          this.viewModel.render();
          this.cursor.moveColumn(-1);
        }
      }
    },
  };

  constructor(cursor: Cursor, textModel: TextModel, viewModel: ViewContainer) {
    this.cursor = cursor;
    this.textModel = textModel;
    this.viewModel = viewModel;

    this.$el.style.width = "1px";
    this.$el.style.height = "1px";
    this.$el.style.opacity = "0";
    this.$el.style.position = "absolute";
    this.$el.addEventListener("beforeinput", (e) => {
      this.handler[e.inputType](e);
      console.log(e);
    });
  }
}
