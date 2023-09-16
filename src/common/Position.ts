import { toCSSUnit } from "@/utils/style";
import { TextModel } from "@/core/TextModel";

const toFloor = (v: number) => {
  if ((v * 10) % 10 >= 6) return Math.ceil(v);
  return Math.floor(v);
};

export class Position {
  line: number;
  column: number;

  constructor(line: number, column: number) {
    this.line = line;
    this.column = column;
  }

  static getPosition(textModel: TextModel, x: number, y: number) {
    const possibleLine = Math.floor(y / 28);
    let line = possibleLine;

    if (possibleLine > textModel.lines.length) {
      line = textModel.lines.length - 1;
    }

    const possibleColumn = toFloor(x / 11);
    let column = possibleColumn;
    if (possibleColumn > textModel.lines[line].content.length) {
      column = textModel.lines[line].content.length;
    }

    return new Position(line, column);
  }

  static toCoordinate(pos: Position) {
    const top = toCSSUnit(pos.line * 28);

    const left = toCSSUnit(pos.column * 11);

    return { top, left };
  }
}
