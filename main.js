import bugIcon from "bundle-text:./icons/bug.svg";
import hillIcon from "bundle-text:./icons/hill.svg";
import Character from './engine/Character';

const clock = 50;
let difficultySpeed = 0;

let debugging = false;
let score;

window.addEventListener("load", initialize);

let hills = [];
let clouds = [];
let obstacles = [];

let ground;
let background;
let sky;
let character;

let message;

let interval;
let state;

function initialize() {
  state = "initialized";
  score = {
    value: 0,
    element: document.getElementById("score"),
  };

  message = document.getElementById("message");
  message.innerText = "Press 'enter' to begin; press 'esc' to pause";

  ground = document.getElementById("ground");
  background = document.getElementById("background");
  sky = document.getElementById("sky");

  character = new Character(document.getElementById('character'));

  window.addEventListener("keydown", listener);
}

function reset() {
  score.value = 0;
  character.reset();

  for (let i = 0; i < obstacles.length; i++) {
    obstacles[i].element.remove();
  }

  obstacles = [];

  play();
}

function listener(event) {
  console.log(event, state);

  if (event.key === "F1") {
    debugging = !debugging;
  }

  if (state === "dead" && event.key === "Enter") {
    reset();
    return;
  }

  if (state !== "playing" && event.key === "Enter") {
    play();
    return;
  }

  if (state === "playing") {
    if (event.key === "Escape") {
      pause();
      return;
    }

    if (event.key === "ArrowUp" && character.canJump()) {
      character.jump();
      return;
    }
  }
}

function play() {
  state = "playing";

  message.innerText = "";
  message.style.display = "none";

  interval = window.setInterval(step, clock);
}

function pause() {
  state = "paused";

  message.innerText = "Paused. Press 'enter' to resume";
  message.style.display = "block";

  window.clearInterval(interval);
  interval = null;
}

function die() {
  state = "dead";

  message.innerHTML = "You died, read more documentation next time to avoid bugs!<br><br>Press 'enter' to start again";
  message.style.display = "block";

  window.clearInterval(interval);
  interval = null;
}

function spawnHill() {
  const hill = {
    element: document.createElement("div"),
    x: ground.offsetWidth - 100,
    y: 20 + (Math.random() * 15),
  };
  hill.element.innerHTML = hillIcon;
  ground.append(hill.element);
  hill.element.classList.add("hill");
  hill.element.style.top = `${0 - hill.y}px`;
  hill.element.style.left = `${hill.x}px`;

  hills.push(hill);
}

function spawnObstacle() {
  const obstacle = {
    element: document.createElement("div"),
    x: ground.offsetWidth - 100,
  }
  obstacle.element.innerHTML = bugIcon;
  ground.append(obstacle.element);
  obstacle.element.classList.add("obstacle");
  obstacle.element.style.top = "-20px";
  obstacle.element.style.left = `${obstacle.x}px`;

  obstacles.push(obstacle);
}

function step() {
  score.element.innerText = score.value;
  stepHills();
  stepObstacle();
  character.tick();

  try {
    checkCollisions();
  } catch (e) {
    console.log(e);
    die();
  }
}

function stepHills() {
  if (hills.length === 0) {
    spawnHill();
  }

  for (let i = 0; i < hills.length; i++) {
    const hill = hills[i];
    hill.x = hill.x - ((difficultySpeed + character.getBaseSpeed()) * 0.3);
    hill.element.style.left = `${hill.x}px`;

    if (hill.x < 0 - hill.element.offsetWidth) {
      hill.element.remove();
      hills = hills.filter((value, j) => j !== i);
      break;
    }

    if (hills.length === 1 && hill.x < 2 * ground.offsetWidth / 3 && Math.random() >= 0.8) {
      spawnHill();
      break;
    }
  }
}

function stepObstacle() {
  if (obstacles.length === 0) {
    spawnObstacle();
  }

  for (let i = 0; i < obstacles.length; i++) {
    const obstacle = obstacles[i];
    obstacle.x = obstacle.x - (difficultySpeed + character.getBaseSpeed());
    obstacle.element.style.left = `${obstacle.x}px`;

    if (obstacle.x < 0 - obstacle.element.offsetWidth) {
      obstacle.element.remove();
      obstacles = obstacles.filter((value, j) => j !== i);
      score.value++;
      break;
    }
  }
}

function checkCollisions() {
  const characterBoundaries = getElementBoundaries(character.getElement());

  for (let i = 0; i < obstacles.length; i++) {
    const obstacleBoundaries = getElementBoundaries(obstacles[i].element);

    debugging && console.log(characterBoundaries, obstacleBoundaries);

    let horizontalCollision = false;
    let verticalCollision = false;

    if (characterBoundaries.right >= obstacleBoundaries.left && characterBoundaries.right <= obstacleBoundaries.right) {
      horizontalCollision = true;
    }

    if (characterBoundaries.left >= obstacleBoundaries.left && characterBoundaries.left <= obstacleBoundaries.right) {
      horizontalCollision = true;
    }

    if (characterBoundaries.bottom <= obstacleBoundaries.bottom && characterBoundaries.bottom >= obstacleBoundaries.top) {
      verticalCollision = true;
    }

    if (characterBoundaries.top <= obstacleBoundaries.bottom && characterBoundaries.top >= obstacleBoundaries.top) {
      verticalCollision = true;
    }

    if (verticalCollision && horizontalCollision) {
      throw new Error();
    }
  }
}

function getElementBoundaries(element) {
  return {
    top: element.offsetTop + element.parentElement.offsetTop,
    bottom: element.offsetTop + element.parentElement.offsetTop + element.offsetHeight,
    left: element.offsetLeft,
    right: element.offsetLeft + element.offsetWidth,
  };
}
