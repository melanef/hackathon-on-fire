import CharacterAttributes from "./CharacterAttributes";

const defaultAttributes: CharacterAttributes = {
  jumpHeight: 200,
  jumpCooldown: 5,
  jumpSpeed: 20,
  fallSpeed: 10,
  runningSpeed: 20,
};
export default class Character {
  private readonly element: HTMLDivElement;
  private isJumping: boolean;
  private jumpCooldown: number;
  private y: number;
  private attributes: CharacterAttributes;
  constructor(element: HTMLDivElement, attributes?: CharacterAttributes) {
    this.element = element;
    this.attributes = attributes || defaultAttributes;
    this.reset();
  }

  getElement(): HTMLDivElement {
    return this.element;
  }

  canJump(): boolean {
    return !this.isJumping && this.y === 0 && this.jumpCooldown === 0;
  }

  getBaseSpeed(): number {
    return this.attributes.runningSpeed;
  }

  reset() {
    this.isJumping = false;
    this.jumpCooldown = 0;
    this.y = 0;

    this.updatePosition();
  }

  jump() {
    this.isJumping = true;
    this.jumpCooldown = this.attributes.jumpCooldown;
  }

  tick() {
    if (this.isJumping) {
      if (this.y >= this.attributes.jumpHeight) {
        this.isJumping = false;
        return;
      }

      this.y += this.attributes.jumpSpeed;
    } else {
      this.y = Math.max(0, this.y - this.attributes.fallSpeed);
    }

    if (this.y === 0 && this.jumpCooldown !== 0) {
      this.jumpCooldown--;
    }

    this.updatePosition();
  }

  private updatePosition() {
    this.element.style.top = `${0 - (this.y + 102)}px`;
  }
}