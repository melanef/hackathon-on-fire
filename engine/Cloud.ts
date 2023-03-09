import TickeableElement from "./TickeableElement";
// @ts-ignore
import icon from "bundle-text:./../icons/cloud.svg";
import { TYPE_LSW, TYPE_OTHER } from "./CloudTypes";

export default class Cloud extends TickeableElement {
  private readonly type: string;
  private x: number;
  private y: number;

  constructor(type: string, element: HTMLElement) {
    super(element);

    this.type = type;
    this.element.innerHTML = `<span>${this.type}</span>${icon}`;
    this.element.classList.add("cloud");
    this.x = this.element.parentElement.offsetWidth;
    this.y = 10 + (Math.random() * 20);
  }

  isLsw(): boolean {
    return this.type === TYPE_LSW;
  }

  isOther(): boolean {
    return this.type === TYPE_OTHER;
  }

  tick(speed: number): void {
    this.x -= speed * 0.5;

    if (this.x < 0 - this.element.offsetWidth) {
      this.element.remove();
      this.isElementAttached = false;
      return;
    }

    this.element.style.top = `${this.y}px`;
    this.element.style.left = `${this.x}px`;
  }
}