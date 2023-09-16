import { Event } from "./Event";

export class Subject {
  protected handlers: Record<string, ((e: Event) => void)[]> = {};

  protected emit(type: string, e: Event) {
    if (this.handlers[type]?.length) {
      this.handlers[type].forEach((h) => h(e));
    }
  }

  subscribe(type: string, handler: (e: Event) => void) {
    if (this.handlers[type]) {
      this.handlers[type].push(handler);
    } else {
      this.handlers[type] = [handler];
    }
  }
}
