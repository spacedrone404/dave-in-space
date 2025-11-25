const ball = document.getElementById("ball");
const dave = document.querySelector(".dave");
const daveWrapper = document.querySelector(".dave-wrapper");
const bulletsContainer = document.getElementById("bullets");

const positions = []; // Array to store previous positions of the object
const maxTrailLength = 8; // Number of elements in the trail

let positionX = 150;
let positionY = 150;

let velocityX = 0;
let velocityY = 0;

const acceleration = 0.8;
const friction = 0.8;

let isLeftPressed = false,
  isRightPressed = false,
  isUpPressed = false,
  isDownPressed = false;

let soundPlayed = false; // Var for audio muting
let lastFacingDirection = -1; // default facing position

document.addEventListener("keydown", function (event) {
  // event.preventDefault();

  switch (event.code) {
    case "ArrowLeft":
      isLeftPressed = true;
      lastFacingDirection = -1;
      updateDaveTransformLeft();
      if (!soundPlayed) {
        playSoundMove("../media/audio/move.mp3");
        soundPlayed = true;
      }
      break;
    case "ArrowRight":
      isRightPressed = true;
      lastFacingDirection = 1;
      updateDaveTransformRight();
      if (!soundPlayed) {
        playSoundMove("../media/audio/move.mp3");
        soundPlayed = true;
      }
      break;
    case "ArrowUp":
      isUpPressed = true;
      if (!soundPlayed) {
        playSoundMove("../media/audio/move.mp3");
        soundPlayed = true;
      }
      break;
    case "ArrowDown":
      isDownPressed = true;
      if (!soundPlayed) {
        playSoundMove("../media/audio/move.mp3");
        soundPlayed = true;
      }
      break;
    case "Space":
      playSoundBlast("../media/audio/blast.mp3");
      shootBullet();
      break;
  }
});

document.addEventListener("keyup", function (event) {
  event.preventDefault();

  switch (event.code) {
    case "ArrowLeft":
      isLeftPressed = false;
      soundPlayed = false; // Exclude audio repeat upon key hold
      break;
    case "ArrowRight":
      isRightPressed = false;
      soundPlayed = false;
      break;
    case "ArrowUp":
      isUpPressed = false;
      soundPlayed = false;
      break;
    case "ArrowDown":
      isDownPressed = false;
      soundPlayed = false;
      break;
  }
});

function updateDaveTransformRight() {
  dave.style.transform = "scaleX(-1) translateX(-35px) translateY(-100px)";
}

function updateDaveTransformLeft() {
  dave.style.transform = "scaleX(1) translateX(-35px) translateY(-100px)";
}

function updatePosition() {
  // acceleration
  if (isLeftPressed && !isRightPressed) velocityX -= acceleration;
  else if (!isLeftPressed && isRightPressed) velocityX += acceleration;
  else velocityX *= friction; // slow down

  if (isUpPressed && !isDownPressed) velocityY -= acceleration;
  else if (!isUpPressed && isDownPressed) velocityY += acceleration;
  else velocityY *= friction; // slow down

  // speed limiting
  // velocityX = Math.max(-10, Math.min(velocityX, 10));
  // velocityY = Math.max(-10, Math.min(velocityY, 10));

  positionX += velocityX;
  positionY += velocityY;

  if (positionX < 0 || positionX > window.innerWidth - 30) {
    positionX = Math.max(0, Math.min(positionX, window.innerWidth - 30));
    velocityX = -velocityX * 0.8;
  }

  if (positionY < 0 || positionY > window.innerHeight - 50) {
    positionY = Math.max(0, Math.min(positionY, window.innerHeight - 50));
    velocityY = -velocityY * 0.8;
  }

  // Add current position to positions array
  positions.push({ x: positionX, y: positionY });

  // Remove old positions beyond our limit
  while (positions.length > maxTrailLength) {
    positions.shift();
  }

  // Render the trail of Dave
  renderTrail();

  ball.style.left = `${positionX}px`;
  ball.style.top = `${positionY}px`;

  requestAnimationFrame(updatePosition); // repeat
}

requestAnimationFrame(updatePosition); //repeat

// Draw trail from saved positions
function renderTrail() {
  const wrapper = document.querySelector(".dave-wrapper");
  const trailElements = wrapper.querySelectorAll(".trail-element");

  trailElements.forEach((el) => el.remove());

  positions.forEach((pos, index) => {
    const trailEl = document.createElement("div");
    trailEl.classList.add("trail-element");
    trailEl.style.left = pos.x + "px";
    trailEl.style.top = pos.y + "px";
    trailEl.style.opacity = ((maxTrailLength - index) / maxTrailLength) * 0.3;
    trailEl.style.mixBlendMode = "hard-light";

    const colorIndex = Math.min(index / maxTrailLength, 1);
    const r = Math.round(Math.max(0, 255 - colorIndex * 55));
    const g = Math.round(colorIndex * 255);
    const b = Math.round(colorIndex * 155);
    trailEl.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;

    wrapper.appendChild(trailEl);
  });
}

renderTrail();

// laser shoot
function shootBullet() {
  const bulletImg = new Image();
  bulletImg.src = "../media/blast.png";
  bulletImg.className = "bullet";

  let directionX = lastFacingDirection;

  bulletImg.style.position = "absolute";
  bulletImg.style.left = "0px";
  bulletImg.style.top = "0px";

  if (directionX === -1) {
    bulletImg.style.transform = "scaleX(-1)";
  }

  bulletsContainer.appendChild(bulletImg);

  setTimeout(() => {
    bulletImg.style.transition = "left 0.5s linear";
    bulletImg.style.left = `${directionX * 512}px`; // blast distance
  }, 100);

  // blast removal
  setTimeout(() => {
    bulletsContainer.removeChild(bulletImg);
  }, 600);

  // blast audio
  playSoundBlast("../media/audio/blast.mp3");
}

// laser blaster sound
function playSoundBlast(src) {
  const audioBlast = new Audio(src);
  audioBlast.volume = 0.3;
  audioBlast.play();
}

// jetpack dave movement sound
function playSoundMove(src) {
  const audioMove = new Audio(src);
  audioMove.play();
}

playSoundStartup();

// teleport startup sound
function playSoundStartup(src) {
  const audioStartup = new Audio("../media/audio/teleport.mp3");
  audioStartup.volume = 0.3;
  audioStartup.play();
}

// backdrop ambience sound
function playSoundAmbience() {
  const audioAmbience = new Audio("../media/audio/backdrop.mp3");
  audioAmbience.loop = true;
  audioAmbience.volume = 0.2;

  audioAmbience.play();
}

playSoundAmbience();
