import { Tickeable } from "./Tickeable";

const TICK_THRESHOLD = 15;

export default class Difficulty extends Tickeable {
  private value: number = 0;
  private tickCounter: number = 0;

  constructor() {
    super();
  }

  tick() {
    this.tickCounter++;
    if (this.tickCounter >= TICK_THRESHOLD) {
      this.value++;
      this.tickCounter = 0;
    }
  }

  get(): number {
    return this.value;
  }

  reset(): void {
    this.value = 0;
    this.tickCounter = 0;
  }
}