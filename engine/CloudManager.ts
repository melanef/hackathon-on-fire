import TickeableElement from "./TickeableElement";
import Cloud from "./Cloud";
import { TYPE_LSW, TYPE_NEUTRAL, TYPE_OTHER } from "./CloudTypes";
import Character from "./Character";
import CollisionCheck from "./CollisionCheck";
import Score from "./Score";

const TICK_THRESHOLD = 10;

export default class CloudManager extends TickeableElement {
  private items: Cloud[] = [];
  private tickCounter: number;
  private score: Score;

  constructor(score: Score, element: HTMLElement) {
    super(element);

    this.score = score;
  }

  tick(speed: number): void {
    this.tickCounter++;
    this.trySpawn();

    for (let i = 0; i < this.items.length; i++) {
      this.items[i].tick(speed);
      if (!this.items[i].isItsElementAttached()) {
        this.items = this.items.filter((value, j) => j !== i);
        break;
      }
    }
  }

  checkCollisions(character: Character): void {
    for (const item of this.items) {
      if (CollisionCheck(character, item)) {
        if (item.isLsw()) {
          this.score.applyLswCloudBonus();
          continue;
        }

        if (item.isOther()) {
          this.score.applyOtherCloudLoss();
          continue;
        }
      }
    }
  }

  private trySpawn() {
    if (this.items.length === 0) {
      this.spawnCloud();
      return;
    }

    if (this.tickCounter >= TICK_THRESHOLD) {
      const diceThreshold = Math.max(0.99, 0.7 + (0.05 * this.items.length));
      if (Math.random() > diceThreshold) {
        this.spawnCloud();
        this.tickCounter = 0;
      }
    }
  }

  private spawnCloud() {
    const dice = Math.random();

    const element = document.createElement("div");
    this.element.append(element);

    if (dice > 0.7) {
      this.items.push(new Cloud(TYPE_LSW, element));
    } else if (dice > 0.2) {
      this.items.push(new Cloud(TYPE_OTHER, element));
    } else {
      this.items.push(new Cloud(TYPE_NEUTRAL, element));
    }
  }

}