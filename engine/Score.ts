import Difficulty from "./Difficulty";
import TickeableElement from "./TickeableElement";

const TICK_THRESHOLD = 20;

export default class Score extends TickeableElement {
  private readonly difficulty: Difficulty;
  private value: number = 0;
  private tickCounter: number = 0;
  private highest: number[] = [];

  constructor(element: HTMLHeadingElement, difficulty: Difficulty) {
    super(element);

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

  applyObstacleBonus() {
    this.value += 10 + (this.difficulty.get() / 10);
  }

  applyLswCloudBonus() {
    this.value += 50 + (this.difficulty.get() / 10);
  }

  applyOtherCloudLoss() {
    this.value -= 100 + (this.difficulty.get() / 10);
  }

  reset() {
    this.save();

    this.value = 0;
    this.tickCounter = 0;
  }

  getHighest(): number[] {
    return this.highest;
  }

  save() {
    const discreteValue = Number(this.value.toFixed(0)).valueOf();
    if (discreteValue !== 0) {
      if (this.highest.indexOf(discreteValue) !== -1) {
        return;
      }

      this.highest.push(discreteValue);
      this.highest = this.highest.sort((a,b) => {
        if (a > b) {
          return -1;
        }

        if (b > a) {
          return 1;
        }

        return 0;
      });
    }
  }
}