import { Tickeable } from "./Tickeable";

export default abstract class TickeableElement extends Tickeable {
  protected readonly element: HTMLElement;
  protected isElementAttached: boolean = true;

  isItsElementAttached(): boolean {
    return this.isElementAttached;
  }

  getBoundaries(): {top: number, bottom: number, left: number, right: number} {
    return {
      top: this.element.offsetTop + this.element.parentElement.offsetTop,
      bottom: this.element.offsetTop + this.element.parentElement.offsetTop + this.element.offsetHeight,
      left: this.element.offsetLeft,
      right: this.element.offsetLeft + this.element.offsetWidth,
    };
  }

  protected constructor(element: HTMLElement) {
    super();

    this.element = element;
  }
}