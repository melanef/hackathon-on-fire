import Difficulty from "./Difficulty";

const TICK_THRESHOLD = 20;

export default class Score {
  private readonly element: HTMLHeadingElement;
  private readonly difficulty: Difficulty;
  private value: number = 0;
  private tickCounter: number = 0;
  constructor(element: HTMLHeadingElement, difficulty: Difficulty) {
    this.element = element;
    this.difficulty = difficulty;
  }

  tick() {
    this.tickCounter++;
    if (this.tickCounter >= TICK_THRESHOLD) {
      this.value += 1 + (this.difficulty.get() / 10);
      this.tickCounter = 0;
    }

    this.element.innerText = String(this.value.toFixed(0)).valueOf();
  }

  incrementByObstacle() {
    this.value += 10 + (this.difficulty.get() / 10);
  }

  reset() {
    this.value = 0;
    this.tickCounter = 0;
  }
}