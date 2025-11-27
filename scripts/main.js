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
  event.preventDefault();

  switch (event.code) {
    case "ArrowLeft":
      isLeftPressed = true;
      lastFacingDirection = -1;
      updateDaveTransformLeft();
      if (!soundPlayed) {
        playSoundMove("media/audio/move.mp3");
        soundPlayed = true;
      }
      break;
    case "ArrowRight":
      isRightPressed = true;
      lastFacingDirection = 1;
      updateDaveTransformRight();
      if (!soundPlayed) {
        playSoundMove("media/audio/move.mp3");
        soundPlayed = true;
      }
      break;
    case "ArrowUp":
      isUpPressed = true;
      if (!soundPlayed) {
        playSoundMove("media/audio/move.mp3");
        soundPlayed = true;
      }
      break;
    case "ArrowDown":
      isDownPressed = true;
      if (!soundPlayed) {
        playSoundMove("media/audio/move.mp3");
        soundPlayed = true;
      }
      break;
    case "Space":
      playSoundBlast("media/audio/blast.mp3");
      shootBullet();
      break;
    case "Enter":
      showSpeechBubble(
        dave,
        "IT'S TIME TO KICK ASS AND CHEW BUBBLEGUM & I'AM ALL OUT OF GUM!"
      );
      playSoundMove("media/audio/duke3d/duke3d.mp3");
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

// Turns Dave right
function updateDaveTransformRight() {
  dave.style.transform = "scaleX(-1) translateX(-35px) translateY(-100px)";
}

// Turns Dave left
function updateDaveTransformLeft() {
  dave.style.transform = "scaleX(1) translateX(-35px) translateY(-100px)";
}

// Dave movement

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
    const r = Math.round(Math.max(0, 255 - colorIndex * 155));
    const g = Math.round(colorIndex * 155);
    const b = Math.round(colorIndex * 155);
    trailEl.style.backgroundImage = `radial-gradient(circle at center, rgb(${r},${g},${b}), transparent 100%)`;
    trailEl.style.boxShadow = `
      inset 0 0 0 4px orange,
      0 0 0 4px orange
    `;

    wrapper.appendChild(trailEl);
  });
}

renderTrail();

// laser shoot
function shootBullet() {
  const bulletImg = new Image();
  bulletImg.src = "media/blast.png";
  bulletImg.className = "bullet";

  let directionX = lastFacingDirection;

  bulletImg.style.position = "absolute";
  bulletImg.style.left = "0px";
  bulletImg.style.top = "0px";
  bulletImg.style.transform = "scale(2.24)";
  bulletImg.style.imageRendering = "pixelated";

  if (directionX === -1) {
    // bulletImg.style.transform = "scaleX(-1)";
  }

  bulletsContainer.appendChild(bulletImg);

  setTimeout(() => {
    bulletImg.style.transition = "all 0.5s linear";
    bulletImg.style.left = `${directionX * 512}px`;
  }, 100);

  setTimeout(() => {
    bulletImg.style.transition = "all 0.8s linear";
    bulletImg.style.filter = "blur(10px)";
    bulletImg.style.opacity = "0";

    bulletImg.addEventListener("transitionend", () => {
      bulletsContainer.removeChild(bulletImg);
    });
  }, 800);

  // blast audio
  playSoundBlast("media/audio/blast.mp3");
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
  const audioStartup = new Audio("media/audio/teleport.mp3");
  const dukeStartup = new Audio("media/audio/duke3d/duke3d-intro.mp3");
  audioStartup.volume = 0.4;
  audioStartup.play();

  setTimeout(function () {
    dukeStartup.volume = 1;
    dukeStartup.play();
  }, 2000);
}

// backdrop ambience sound
function playSoundAmbience() {
  const audioAmbience = new Audio("media/audio/backdrop.mp3");
  audioAmbience.loop = true;
  audioAmbience.volume = 0.2;

  audioAmbience.play();
}

playSoundAmbience();

// Dave's speech bubble

function showSpeechBubble(element, text) {
  const bubble = document.createElement("div");
  bubble.className = "speech-bubble";
  bubble.textContent = text;

  const rect = element.getBoundingClientRect();
  bubble.style.left = `${rect.right + 20}px`;
  bubble.style.top = `${rect.top - 20}px`;

  setTimeout(() => {
    bubble.classList.add("fade-in");
  }, 100);

  setTimeout(() => {
    bubble.classList.add("fade-out");
    setTimeout(() => bubble.remove(), 800);
  }, 4000);

  document.body.appendChild(bubble);
}

// touch input support
let startTouchPos = { x: null, y: null };

document.addEventListener("touchstart", function (event) {
  event.preventDefault();
  startTouchPos.x = event.touches[0].clientX;
  startTouchPos.y = event.touches[0].clientY;
});

document.addEventListener("touchmove", function (event) {
  event.preventDefault();
  const moveDeltaX = event.touches[0].clientX - startTouchPos.x;
  const moveDeltaY = event.touches[0].clientY - startTouchPos.y;

  if (Math.abs(moveDeltaX) > Math.abs(moveDeltaY)) {
    if (moveDeltaX > 0) {
      isRightPressed = true;
      isLeftPressed = false;
      updateDaveTransformRight();
    } else {
      isLeftPressed = true;
      isRightPressed = false;
      updateDaveTransformLeft();
    }
  } else {
    if (moveDeltaY > 0) {
      isDownPressed = true;
      isUpPressed = false;
    } else {
      isUpPressed = true;
      isDownPressed = false;
    }
  }

  if (!soundPlayed) {
    playSoundMove("media/audio/move.mp3");
    soundPlayed = true;
  }
});

document.addEventListener("touchend", function (event) {
  event.preventDefault();
  isLeftPressed = false;
  isRightPressed = false;
  isUpPressed = false;
  isDownPressed = false;
  soundPlayed = false;
});

// secondary touch
let firstTouchID = null;

document.addEventListener("touchstart", function (event) {
  event.preventDefault();

  if (firstTouchID === null) {
    firstTouchID = event.touches[0].identifier;
    startTouchPos.x = event.touches[0].clientX;
    startTouchPos.y = event.touches[0].clientY;
  } else {
    if (event.touches.length >= 2) {
      shootBullet();
    }
  }
});

document.addEventListener("touchmove", function (event) {
  event.preventDefault();

  if (firstTouchID !== null) {
    const activeTouch = Array.from(event.touches).find(
      (touch) => touch.identifier === firstTouchID
    );

    if (activeTouch) {
      const moveDeltaX = activeTouch.clientX - startTouchPos.x;
      const moveDeltaY = activeTouch.clientY - startTouchPos.y;

      if (Math.abs(moveDeltaX) > Math.abs(moveDeltaY)) {
        if (moveDeltaX > 0) {
          isRightPressed = true;
          isLeftPressed = false;
          updateDaveTransformRight();
        } else {
          isLeftPressed = true;
          isRightPressed = false;
          updateDaveTransformLeft();
        }
      } else {
        if (moveDeltaY > 0) {
          isDownPressed = true;
          isUpPressed = false;
        } else {
          isUpPressed = true;
          isDownPressed = false;
        }
      }

      if (!soundPlayed) {
        playSoundMove("media/audio/move.mp3");
        soundPlayed = true;
      }
    }
  }
});

document.addEventListener("touchend", function (event) {
  event.preventDefault();

  // removal of first touch if it is not completed
  if (
    firstTouchID !== null &&
    event.changedTouches.some((touch) => touch.identifier === firstTouchID)
  ) {
    firstTouchID = null;
    isLeftPressed = false;
    isRightPressed = false;
    isUpPressed = false;
    isDownPressed = false;
    soundPlayed = false;
  }
});
