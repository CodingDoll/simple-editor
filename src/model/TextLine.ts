import { isNumber } from "@/utils/check";

export class TextLine {
  content = "";

  constructor() {}

  insert(text: string, column: number) {
    this.content = this.content.substring(0, column) + text + this.content.substring(column);
  }

  remove(start: number, end?: number) {
    const rmStr = this.content.substring(start, end);
    this.content = this.content.substring(0, start) + (isNumber(end) ? this.content.substring(end) : "");
    return rmStr;
  }
}
