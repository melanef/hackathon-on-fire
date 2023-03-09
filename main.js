const clock = 40;
const speed = 200;
let score;

window.addEventListener("load", initialize);

let hills = [];
let clouds = [];
let obstacles = [];

let ground;
let background;
let sky;

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
  message.innerText = "Press 'space' to begin; press 'enter' to pause";

  ground = document.getElementById("ground");
  background = document.getElementById("background");
  sky = document.getElementById("sky");

  spawnHill();
  window.addEventListener("keypress", (event) => {
    if (state !== "playing" && event.key === " ") {
      play();
      return;
    }

    if (state === "playing" && event.key === "Enter") {
      pause();
      return;
    }
  })
}

function play() {
  state = "playing";

  message.innerText = "";
  message.style.display = "none";

  interval = window.setInterval(step, clock);
}

function pause() {
  state = "paused";

  message.innerText = "Paused. Press 'space' to resume";
  message.style.display = "block";

  window.clearInterval(interval);
  interval = null;
}

function spawnHill() {
  const hill = {
    element: document.createElement("div"),
    x: ground.offsetWidth - 100,
    y: 80 + (Math.random() * 15),
  };
  hill.element.innerHTML = hillIcon;
  ground.append(hill.element);
  hill.element.classList.add("hill");
  hill.element.style.top = `${0 - hill.y}px`;
  hill.element.style.left = `${hill.x}px`;

  hills.push(hill);
}

function step() {
  score.element.innerText = score.value;
  stepHills();
}

function stepHills() {
  for (let i = 0; i < hills.length; i++) {
    const hill = hills[i];
    hill.x = hill.x - (speed / 10);
    hill.element.style.left = `${hill.x}px`;

    if (hill.x < 0) {
      hill.element.remove();
      hills = hills.filter((value, j) => j !== i);
      break;
    }

    if (hills.length === 1 && hill.x < ground.offsetWidth / 2 && Math.random() >= 0.5) {
      spawnHill();
      break;
    }
  }

  if (hills.length === 0) {
    spawnHill();
  }
}

const hillIcon = '<svg version="1.1" viewBox="100 0 500 300" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><defs><symbol id="t" overflow="visible"><path d="m3.6562-0.21875c-0.1875 0.09375-0.38672 0.16797-0.59375 0.21875-0.19922 0.050781-0.40625 0.078125-0.625 0.078125-0.66797 0-1.1992-0.17969-1.5938-0.54688-0.38672-0.375-0.57812-0.87891-0.57812-1.5156 0-0.64453 0.19141-1.1484 0.57812-1.5156 0.39453-0.375 0.92578-0.5625 1.5938-0.5625 0.21875 0 0.42578 0.027344 0.625 0.078125 0.20703 0.054687 0.40625 0.125 0.59375 0.21875v0.82812c-0.1875-0.125-0.375-0.21875-0.5625-0.28125-0.17969-0.0625-0.37109-0.09375-0.57812-0.09375-0.36719 0-0.65625 0.12109-0.875 0.35938-0.21094 0.23047-0.3125 0.55469-0.3125 0.96875 0 0.40625 0.10156 0.73047 0.3125 0.96875 0.21875 0.23047 0.50781 0.34375 0.875 0.34375 0.20703 0 0.39844-0.023437 0.57812-0.078125 0.1875-0.0625 0.375-0.16016 0.5625-0.29688z"/></symbol><symbol id="c" overflow="visible"><path d="m2.6875-2.1719c-0.085938-0.039063-0.16797-0.070313-0.25-0.09375-0.085938-0.019531-0.16797-0.03125-0.25-0.03125-0.25 0-0.44531 0.085937-0.57812 0.25-0.125 0.15625-0.1875 0.38281-0.1875 0.67188v1.375h-0.96875v-2.9844h0.96875v0.48438c0.11328-0.19531 0.25-0.33594 0.40625-0.42188 0.16406-0.09375 0.35938-0.14062 0.57812-0.14062h0.10938c0.039063 0 0.09375 0.007812 0.15625 0.015625z"/></symbol><symbol id="b" overflow="visible"><path d="m3.4375-1.5v0.26562h-2.2344c0.03125 0.23047 0.11328 0.40234 0.25 0.51562 0.13281 0.10547 0.32812 0.15625 0.57812 0.15625 0.20703 0 0.41406-0.023438 0.625-0.078125 0.20703-0.0625 0.42188-0.15625 0.64062-0.28125v0.73438c-0.21875 0.09375-0.44531 0.16406-0.67188 0.20312-0.23047 0.039062-0.45312 0.0625-0.67188 0.0625-0.54297 0-0.96484-0.13281-1.2656-0.40625-0.30469-0.28125-0.45312-0.67188-0.45312-1.1719 0-0.47656 0.14453-0.85938 0.4375-1.1406 0.30078-0.28125 0.70703-0.42188 1.2188-0.42188 0.46875 0 0.84375 0.14062 1.125 0.42188s0.42188 0.66406 0.42188 1.1406zm-0.96875-0.32812c0-0.17578-0.058594-0.31641-0.17188-0.42188-0.10547-0.11328-0.24219-0.17188-0.40625-0.17188-0.1875 0-0.33984 0.054687-0.45312 0.15625-0.11719 0.10547-0.1875 0.25-0.21875 0.4375z"/></symbol><symbol id="d" overflow="visible"><path d="m1.7969-1.3438c-0.19922 0-0.35156 0.039062-0.45312 0.10938-0.09375 0.0625-0.14062 0.16406-0.14062 0.29688 0 0.11719 0.035156 0.21094 0.10938 0.28125 0.082031 0.0625 0.19531 0.09375 0.34375 0.09375 0.17578 0 0.32812-0.0625 0.45312-0.1875s0.1875-0.28516 0.1875-0.48438v-0.10938zm1.4688-0.35938v1.7031h-0.96875v-0.4375c-0.125 0.17969-0.27344 0.30859-0.4375 0.39062-0.15625 0.082031-0.35156 0.125-0.57812 0.125-0.3125 0-0.57031-0.085938-0.76562-0.26562-0.1875-0.1875-0.28125-0.42188-0.28125-0.70312 0-0.35156 0.11719-0.61328 0.35938-0.78125 0.23828-0.16406 0.61719-0.25 1.1406-0.25h0.5625v-0.0625c0-0.15625-0.0625-0.26562-0.1875-0.32812-0.11719-0.070312-0.29688-0.10938-0.54688-0.10938-0.21094 0-0.40234 0.023437-0.57812 0.0625-0.17969 0.042969-0.33984 0.10156-0.48438 0.17188v-0.71875c0.19531-0.050781 0.39844-0.085938 0.60938-0.10938 0.20703-0.03125 0.41406-0.046875 0.625-0.046875 0.53906 0 0.92969 0.10938 1.1719 0.32812 0.23828 0.21094 0.35938 0.55469 0.35938 1.0312z"/></symbol><symbol id="a" overflow="visible"><path d="m1.5-3.8438v0.85938h0.98438v0.67188h-0.98438v1.2812c0 0.13672 0.023438 0.23047 0.078125 0.28125 0.0625 0.042969 0.17578 0.0625 0.34375 0.0625h0.48438v0.6875h-0.8125c-0.38672 0-0.65625-0.078125-0.8125-0.23438s-0.23438-0.42188-0.23438-0.79688v-1.2812h-0.46875v-0.67188h0.46875v-0.85938z"/></symbol><symbol id="i" overflow="visible"><path d="m2.5-2.5469v-1.6094h0.95312v4.1562h-0.95312v-0.4375c-0.13672 0.17969-0.28125 0.30859-0.4375 0.39062-0.15625 0.082031-0.33984 0.125-0.54688 0.125-0.375 0-0.68359-0.14453-0.92188-0.4375-0.23047-0.28906-0.34375-0.67188-0.34375-1.1406 0-0.45703 0.11328-0.83203 0.34375-1.125 0.23828-0.28906 0.54688-0.4375 0.92188-0.4375 0.19531 0 0.375 0.042969 0.53125 0.125 0.16406 0.085938 0.31641 0.21484 0.45312 0.39062zm-0.64062 1.9375c0.20703 0 0.36328-0.070313 0.46875-0.21875 0.11328-0.15625 0.17188-0.37891 0.17188-0.67188 0-0.28125-0.058594-0.49219-0.17188-0.64062-0.10547-0.15625-0.26172-0.23438-0.46875-0.23438-0.19922 0-0.35547 0.078125-0.46875 0.23438-0.10547 0.14844-0.15625 0.35938-0.15625 0.64062 0 0.29297 0.050781 0.51562 0.15625 0.67188 0.11328 0.14844 0.26953 0.21875 0.46875 0.21875z"/></symbol><symbol id="h" overflow="visible"><path d="m2.0469-0.60938c0.20703 0 0.36328-0.070313 0.46875-0.21875 0.11328-0.15625 0.17188-0.37891 0.17188-0.67188 0-0.28125-0.058594-0.49219-0.17188-0.64062-0.10547-0.15625-0.26172-0.23438-0.46875-0.23438-0.19922 0-0.35547 0.078125-0.46875 0.23438-0.10547 0.14844-0.15625 0.35938-0.15625 0.64062 0 0.29297 0.050781 0.51562 0.15625 0.67188 0.11328 0.14844 0.26953 0.21875 0.46875 0.21875zm-0.625-1.9375c0.125-0.17578 0.26562-0.30469 0.42188-0.39062 0.16406-0.082031 0.35156-0.125 0.5625-0.125 0.36328 0 0.66406 0.14844 0.90625 0.4375 0.23828 0.29297 0.35938 0.66797 0.35938 1.125 0 0.46875-0.12109 0.85156-0.35938 1.1406-0.24219 0.29297-0.54297 0.4375-0.90625 0.4375-0.21094 0-0.39844-0.042969-0.5625-0.125-0.15625-0.082031-0.29688-0.21094-0.42188-0.39062v0.4375h-0.96875v-4.1562h0.96875z"/></symbol><symbol id="g" overflow="visible"><path d="m0.0625-2.9844h0.95312l0.8125 2.0156 0.6875-2.0156h0.95312l-1.2656 3.2656c-0.125 0.33203-0.27344 0.56641-0.4375 0.70312-0.16797 0.13281-0.39062 0.20312-0.67188 0.20312h-0.54688v-0.64062h0.29688c0.16406 0 0.28516-0.027344 0.35938-0.078125 0.070313-0.054688 0.12891-0.14062 0.17188-0.26562l0.03125-0.09375z"/></symbol><symbol id="f" overflow="visible"><path d="m0.5-3.9844h2.7812v0.78125h-1.75v0.73438h1.6406v0.78125h-1.6406v1.6875h-1.0312z"/></symbol><symbol id="s" overflow="visible"><path d="m0.45312-4.1562h0.96875v4.1562h-0.96875z"/></symbol><symbol id="r" overflow="visible"><path d="m2.4219-4.1562v0.625h-0.51562c-0.13672 0-0.23438 0.027344-0.29688 0.078125-0.054687 0.054687-0.078125 0.13672-0.078125 0.25v0.21875h0.82812v0.67188h-0.82812v2.3125h-0.95312v-2.3125h-0.46875v-0.67188h0.46875v-0.21875c0-0.32031 0.085937-0.5625 0.26562-0.71875 0.1875-0.15625 0.47266-0.23438 0.85938-0.23438z"/></symbol><symbol id="e" overflow="visible"><path d="m1.875-2.375c-0.21094 0-0.37109 0.078125-0.48438 0.23438-0.10547 0.14844-0.15625 0.35938-0.15625 0.64062 0 0.29297 0.050781 0.51562 0.15625 0.67188 0.11328 0.14844 0.27344 0.21875 0.48438 0.21875 0.20703 0 0.36719-0.070313 0.48438-0.21875 0.11328-0.15625 0.17188-0.37891 0.17188-0.67188 0-0.28125-0.058594-0.49219-0.17188-0.64062-0.11719-0.15625-0.27734-0.23438-0.48438-0.23438zm0-0.6875c0.51953 0 0.92188 0.14062 1.2031 0.42188 0.28906 0.27344 0.4375 0.65234 0.4375 1.1406 0 0.5-0.14844 0.89062-0.4375 1.1719-0.28125 0.27344-0.68359 0.40625-1.2031 0.40625-0.51172 0-0.91406-0.13281-1.2031-0.40625-0.29297-0.28125-0.4375-0.67188-0.4375-1.1719 0-0.48828 0.14453-0.86719 0.4375-1.1406 0.28906-0.28125 0.69141-0.42188 1.2031-0.42188z"/></symbol><symbol id="q" overflow="visible"><path d="m3.2344-2.5c0.11328-0.17578 0.25391-0.3125 0.42188-0.40625 0.16406-0.10156 0.35156-0.15625 0.5625-0.15625 0.33203 0 0.58594 0.10938 0.76562 0.32812 0.1875 0.21094 0.28125 0.51172 0.28125 0.90625v1.8281h-0.96875v-1.5625c0.007813-0.019531 0.015625-0.039062 0.015625-0.0625v-0.10938c0-0.21875-0.03125-0.375-0.09375-0.46875s-0.16406-0.14062-0.29688-0.14062c-0.1875 0-0.33594 0.078125-0.4375 0.23438-0.09375 0.14844-0.14062 0.35938-0.14062 0.64062v1.4688h-0.96875v-1.5625c0-0.33203-0.03125-0.54688-0.09375-0.64062-0.054688-0.09375-0.15234-0.14062-0.29688-0.14062-0.17969 0-0.32031 0.078125-0.42188 0.23438-0.09375 0.14844-0.14062 0.35938-0.14062 0.64062v1.4688h-0.96875v-2.9844h0.96875v0.4375c0.11328-0.17578 0.24219-0.30469 0.39062-0.39062 0.15625-0.082031 0.32812-0.125 0.51562-0.125 0.20703 0 0.39062 0.054688 0.54688 0.15625 0.15625 0.09375 0.27344 0.23047 0.35938 0.40625z"/></symbol><symbol id="p" overflow="visible"><path d="m3.4688-1.8281v1.8281h-0.96875v-1.3906c0-0.25781-0.007812-0.4375-0.015625-0.53125-0.011719-0.10156-0.03125-0.17578-0.0625-0.21875-0.03125-0.0625-0.085937-0.10938-0.15625-0.14062-0.0625-0.039062-0.13281-0.0625-0.20312-0.0625-0.21094 0-0.37109 0.078125-0.48438 0.23438-0.10547 0.15625-0.15625 0.37109-0.15625 0.64062v1.4688h-0.96875v-4.1562h0.96875v1.6094c0.13281-0.17578 0.28516-0.30469 0.45312-0.39062 0.16406-0.082031 0.34375-0.125 0.53125-0.125 0.34375 0 0.60156 0.10938 0.78125 0.32812 0.1875 0.21094 0.28125 0.51172 0.28125 0.90625z"/></symbol><symbol id="o" overflow="visible"><path d="m0.5-3.9844h1.1562l1.4375 2.7344v-2.7344h0.98438v3.9844h-1.1562l-1.4375-2.7344v2.7344h-0.98438z"/></symbol><symbol id="n" overflow="visible"><path d="m0.42188-1.1719v-1.8125h0.96875v0.29688 0.60938 0.48438c0 0.24219 0.003906 0.41797 0.015625 0.53125 0.007812 0.10547 0.03125 0.17969 0.0625 0.21875 0.039062 0.0625 0.09375 0.11719 0.15625 0.15625 0.0625 0.03125 0.13281 0.046875 0.21875 0.046875 0.19531 0 0.35156-0.078125 0.46875-0.23438 0.11328-0.15625 0.17188-0.36719 0.17188-0.64062v-1.4688h0.95312v2.9844h-0.95312v-0.4375c-0.14844 0.17969-0.30469 0.30859-0.46875 0.39062-0.15625 0.082031-0.33594 0.125-0.53125 0.125-0.34375 0-0.60938-0.10156-0.79688-0.3125-0.17969-0.21875-0.26562-0.53125-0.26562-0.9375z"/></symbol><symbol id="m" overflow="visible"><path d="m3.4688-1.8281v1.8281h-0.96875v-1.3906c0-0.25781-0.007812-0.4375-0.015625-0.53125-0.011719-0.10156-0.03125-0.17578-0.0625-0.21875-0.03125-0.0625-0.085937-0.10938-0.15625-0.14062-0.0625-0.039062-0.13281-0.0625-0.20312-0.0625-0.21094 0-0.37109 0.078125-0.48438 0.23438-0.10547 0.15625-0.15625 0.37109-0.15625 0.64062v1.4688h-0.96875v-2.9844h0.96875v0.4375c0.13281-0.17578 0.28516-0.30469 0.45312-0.39062 0.16406-0.082031 0.34375-0.125 0.53125-0.125 0.34375 0 0.60156 0.10938 0.78125 0.32812 0.1875 0.21094 0.28125 0.51172 0.28125 0.90625z"/></symbol><symbol id="l" overflow="visible"><path d="m0.5-3.9844h1.7031c0.50781 0 0.89844 0.11719 1.1719 0.34375 0.26953 0.21875 0.40625 0.53906 0.40625 0.95312 0 0.41797-0.13672 0.74219-0.40625 0.96875-0.27344 0.21875-0.66406 0.32812-1.1719 0.32812h-0.67188v1.3906h-1.0312zm1.0312 0.75v1.1094h0.5625c0.19531 0 0.34766-0.046875 0.45312-0.14062 0.11328-0.10156 0.17188-0.24219 0.17188-0.42188 0-0.17578-0.058594-0.3125-0.17188-0.40625-0.10547-0.09375-0.25781-0.14062-0.45312-0.14062z"/></symbol><symbol id="k" overflow="visible"><path d="m0.45312-2.9844h0.96875v2.9375c0 0.39453-0.10156 0.69531-0.29688 0.90625-0.1875 0.21875-0.46484 0.32812-0.82812 0.32812h-0.48438v-0.64062h0.17188c0.17578 0 0.29688-0.042969 0.35938-0.125 0.070312-0.074219 0.10938-0.23047 0.10938-0.46875zm0-1.1719h0.96875v0.78125h-0.96875z"/></symbol><symbol id="j" overflow="visible"><path d="m2.875-2.8906v0.76562c-0.125-0.082031-0.25781-0.14453-0.39062-0.1875-0.13672-0.039062-0.27344-0.0625-0.40625-0.0625-0.27344 0-0.48047 0.078125-0.625 0.23438-0.14844 0.15625-0.21875 0.37109-0.21875 0.64062 0 0.28125 0.070313 0.5 0.21875 0.65625 0.14453 0.15625 0.35156 0.23438 0.625 0.23438 0.14453 0 0.28516-0.019531 0.42188-0.0625 0.13281-0.039063 0.25781-0.10938 0.375-0.20312v0.78125c-0.14844 0.0625-0.29688 0.10156-0.45312 0.125-0.15625 0.03125-0.3125 0.046875-0.46875 0.046875-0.54297 0-0.96484-0.13281-1.2656-0.40625-0.30469-0.28125-0.45312-0.67188-0.45312-1.1719 0-0.48828 0.14844-0.86719 0.45312-1.1406 0.30078-0.28125 0.72266-0.42188 1.2656-0.42188 0.15625 0 0.3125 0.015625 0.46875 0.046875 0.15625 0.023437 0.30469 0.0625 0.45312 0.125z"/></symbol></defs><g><path d="m601.55 383.91h-135.94c-0.86328 0-1.7188-0.35156-2.332-0.95312-0.60156-0.625-0.96094-1.4648-0.96094-2.3281l0.011719-55.434c0-1.8164 1.4648-3.2812 3.2812-3.2812 1.8047 0 3.2695 1.4648 3.2695 3.2812v52.152h125.22l-58.734-64.148-43.508-46.453-22.98 12.719v1.9805c0 1.8047-1.4648 3.2812-3.2695 3.2812-1.8164 0-3.293-1.4766-3.293-3.2812v-3.9141c0-1.1914 0.65625-2.2852 1.6953-2.8672l26.906-14.898c1.2812-0.71094 2.9844-0.4375 3.9805 0.63281l45.281 48.332 63.797 69.684c0.875 0.95312 1.1055 2.3398 0.57813 3.5312-0.51953 1.1992-1.7031 1.9648-3.0039 1.9648zm-135.94-77.316c-1.8164 0-3.293-1.4648-3.293-3.2695 0-1.8164 1.4766-3.2812 3.293-3.2812 1.8047 0 3.2695 1.4648 3.2695 3.2812 0 1.8047-1.4648 3.2695-3.2695 3.2695z"/><path d="m465.61 383.91h-58.375c-1.707 0-3.1484-1.3359-3.2695-3.0391l-11.035-152.38c-0.066407-0.96094 0.28516-1.9023 0.97266-2.582l16.977-16.602c0.64453-0.63281 1.5742-0.98438 2.4922-0.91797 0.91797 0.054688 1.7812 0.50391 2.3633 1.2266l52.434 65.887c1.125 1.4102 0.89453 3.4766-0.52344 4.6055-1.3672 1.0938-3.5234 0.85156-4.6055-0.52344l-50.172-63.031-13.289 12.984 10.711 147.81h52.039v-60.453c0-1.8047 1.4648-3.2695 3.2812-3.2695 1.8047 0 3.2695 1.4648 3.2695 3.2695v63.734c0 0.88672-0.33984 1.707-0.95312 2.3203-0.62109 0.62109-1.4414 0.96094-2.3164 0.96094zm0-85.598c-1.8164 0-3.2812-1.4766-3.2812-3.2812 0-1.8164 1.4648-3.2812 3.2812-3.2812 1.8047 0 3.2695 1.4648 3.2695 3.2812 0 1.8047-1.4648 3.2812-3.2695 3.2812z"/><path d="m331.35 383.91c-1.8047 0-3.2812-1.4648-3.2812-3.2812 0-1.8047 1.4766-3.2812 3.2812-3.2812h72.363l-10.695-147.72-41.727-45.258-52.445 63.406 22.148 93.953c0.41406 1.7617-0.67969 3.5312-2.4375 3.9492-1.75 0.41406-3.5312-0.69922-3.9375-2.4375l-22.531-95.539c-0.24219-1.0156 0-2.0469 0.66797-2.8438l55.867-67.57c0.60156-0.72266 1.5-1.1602 2.4492-1.1797 0.95312-0.03125 1.8477 0.35938 2.4922 1.0508l45.051 48.879c0.50391 0.54688 0.79687 1.2344 0.85156 1.9805l11.035 152.39c0.066406 0.90625-0.25 1.8047-0.86328 2.4727-0.625 0.65625-1.5 1.0391-2.4062 1.0391zm-8.5312-16.855c-1.5312 0-2.8438-1.0391-3.1953-2.5273-0.19531-0.85156-0.054688-1.7383 0.40625-2.4844 0.46094-0.74219 1.1914-1.2695 2.0469-1.4648 1.7383-0.41406 3.5312 0.69922 3.9375 2.4375 0.20703 0.85156 0.066406 1.7266-0.39453 2.4844-0.46875 0.74219-1.1914 1.2578-2.0469 1.4648-0.25 0.058593-0.50391 0.089843-0.75391 0.089843z"/><path d="m326.8 383.91h-143.49c-1.0938 0-2.1094-0.53516-2.7227-1.4453-0.60156-0.90625-0.72266-2.0547-0.31641-3.0742l40.098-98.57c0.14062-0.33984 0.35156-0.67969 0.58984-0.95312l45.051-50.574c0.99609-1.125 2.7773-1.4102 4.0781-0.65625l26.828 15.453c0.77734 0.44922 1.3438 1.2148 1.5547 2.0898l13.629 57.793c0.054688 0.24219 0.085938 0.49219 0.085938 0.74219 0.011719 1.5312-1.0391 2.8555-2.5273 3.207-0.25 0.054687-0.50391 0.085937-0.75391 0.085937-1.5312 0-2.8438-1.0391-3.1953-2.5273l-13.301-56.414-23.285-13.41-42.898 48.156-38.035 93.535h134.46l-6.9023-29.281c-0.20703-0.85156-0.066406-1.7266 0.39453-2.4727 0.46875-0.75391 1.1914-1.2695 2.0469-1.4766 0.25-0.054687 0.50391-0.085937 0.75391-0.085937 1.5312 0 2.8438 1.0391 3.1953 2.5273l7.8516 33.316c0.23047 0.98438 0 2-0.625 2.7891-0.62109 0.79688-1.5625 1.2461-2.5703 1.2461zm-12.871-54.602c-1.5312 0-2.8438-1.0391-3.1953-2.5273-0.41406-1.7617 0.67969-3.5312 2.4375-3.9492 1.75-0.41406 3.5312 0.69922 3.9492 2.4375 0.19531 0.85156 0.054687 1.7266-0.40625 2.4727-0.46094 0.75391-1.1797 1.2695-2.0352 1.4766-0.25 0.058594-0.51172 0.089844-0.75 0.089844z"/><path d="m183.31 383.91h-84.863c-1.2578 0-2.3828-0.6875-2.9414-1.8164-0.55859-1.1172-0.4375-2.4297 0.30469-3.4336l28.086-37.395 0.41406-0.44922 79.527-72.109c1.0703-0.96094 2.7344-1.1172 3.9492-0.35156l17.367 10.926c1.3438 0.84375 1.8906 2.5391 1.2891 4.0156l-40.098 98.57c-0.49609 1.2461-1.6914 2.043-3.0352 2.043zm-78.301-6.5625h76.094l38.227-93.977-12.918-8.1367-77.449 70.219z"/><path d="m298.71 264.8c-0.77734 0-1.5312-0.27344-2.1211-0.77734-0.66797-0.57031-1.082-1.3555-1.1484-2.2305-0.078124-0.875 0.19531-1.7266 0.76563-2.3945l50.398-59.477c1.125-1.3359 3.3047-1.5078 4.625-0.38281 0.66797 0.57031 1.082 1.3555 1.1484 2.2305 0.078126 0.875-0.19531 1.7266-0.76562 2.3945l-50.398 59.477c-0.63281 0.73438-1.543 1.1602-2.5039 1.1602z"/><path d="m577.21 383.91c-0.95312 0-1.8477-0.40625-2.4727-1.1172l-79.352-90.77c-1.1797-1.3672-1.0508-3.4453 0.31641-4.6367 1.3125-1.1484 3.4883-0.99609 4.625 0.31641l79.34 90.77c1.1914 1.3555 1.0625 3.4336-0.30469 4.625-0.59766 0.52734-1.3633 0.8125-2.1523 0.8125z"/><path d="m206.09 383.91c-0.30469 0-0.61328-0.03125-0.90625-0.12109-0.84375-0.24219-1.543-0.79688-1.9688-1.5625-0.42578-0.76562-0.52344-1.6641-0.28516-2.4922l24.633-85.781c0.48047-1.6953 2.3516-2.7344 4.0586-2.2422 1.7383 0.49219 2.7461 2.3164 2.2539 4.0586l-24.633 85.773c-0.41016 1.3945-1.6992 2.3672-3.1523 2.3672z"/><use x="70" y="576.40625" xlink:href="#t"/><use x="74.011719" y="576.40625" xlink:href="#c"/><use x="76.710938" y="576.40625" xlink:href="#b"/><use x="80.417969" y="576.40625" xlink:href="#d"/><use x="84.109375" y="576.40625" xlink:href="#a"/><use x="86.722656" y="576.40625" xlink:href="#b"/><use x="90.433594" y="576.40625" xlink:href="#i"/><use x="96.25" y="576.40625" xlink:href="#h"/><use x="100.167969" y="576.40625" xlink:href="#g"/><use x="105.636719" y="576.40625" xlink:href="#f"/><use x="109.371094" y="576.40625" xlink:href="#s"/><use x="111.246094" y="576.40625" xlink:href="#d"/><use x="114.9375" y="576.40625" xlink:href="#a"/><use x="117.550781" y="576.40625" xlink:href="#d"/><use x="121.238281" y="576.40625" xlink:href="#c"/><use x="123.9375" y="576.40625" xlink:href="#a"/><use x="70" y="581.875" xlink:href="#r"/><use x="72.378906" y="581.875" xlink:href="#c"/><use x="75.078125" y="581.875" xlink:href="#e"/><use x="78.832031" y="581.875" xlink:href="#q"/><use x="86.4375" y="581.875" xlink:href="#a"/><use x="89.050781" y="581.875" xlink:href="#p"/><use x="92.941406" y="581.875" xlink:href="#b"/><use x="98.554688" y="581.875" xlink:href="#o"/><use x="103.132812" y="581.875" xlink:href="#e"/><use x="106.890625" y="581.875" xlink:href="#n"/><use x="110.785156" y="581.875" xlink:href="#m"/><use x="116.582031" y="581.875" xlink:href="#l"/><use x="120.589844" y="581.875" xlink:href="#c"/><use x="123.285156" y="581.875" xlink:href="#e"/><use x="127.042969" y="581.875" xlink:href="#k"/><use x="128.917969" y="581.875" xlink:href="#b"/><use x="132.625" y="581.875" xlink:href="#j"/><use x="135.867188" y="581.875" xlink:href="#a"/></g></svg>';
