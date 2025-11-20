const ball = document.getElementById("ball");
const dave = document.querySelector(".dave");
const daveWrapper = document.querySelector(".dave-wrapper");

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

document.addEventListener("keydown", function (event) {
  // event.preventDefault();

  switch (event.code) {
    case "ArrowLeft":
      isLeftPressed = true;
      updateDaveTransformLeft();
      break;
    case "ArrowRight":
      isRightPressed = true;
      updateDaveTransformRight();
      break;
    case "ArrowUp":
      isUpPressed = true;
      // updateDaveTransformUp();
      break;
    case "ArrowDown":
      isDownPressed = true;
      // updateDaveTransformDown();
      break;
  }
});

document.addEventListener("keyup", function (event) {
  event.preventDefault();

  switch (event.code) {
    case "ArrowLeft":
      isLeftPressed = false;
      break;
    case "ArrowRight":
      isRightPressed = false;
      break;
    case "ArrowUp":
      isUpPressed = false;
      // updateDaveTransformDown();
      break;
    case "ArrowDown":
      isDownPressed = false;
      // updateDaveTransformUp();
      break;
  }
});

function updateDaveTransformRight() {
  dave.style.transform = "scaleX(-1) translateX(-35px) translateY(-100px)";
}

function updateDaveTransformLeft() {
  dave.style.transform = "scaleX(1) translateX(-35px) translateY(-100px)";
}

function updateDaveTransformUp() {
  // dave.style.transform = "translateX(-35px) translateY(-100px)";
  daveWrapper.classList.remove("down");
  daveWrapper.classList.add("up");
}

function updateDaveTransformDown() {
  // dave.style.transform = "translateX(-35px) translateY(-100px)";
  daveWrapper.classList.remove("up");
  daveWrapper.classList.add("down");
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

  ball.style.left = `${positionX}px`;
  ball.style.top = `${positionY}px`;

  requestAnimationFrame(updatePosition); // repeat
}

requestAnimationFrame(updatePosition); //repeat

// draggable Dave

const draggableBox = document.getElementById(".dave-wrapper");

let posX = 0,
  posY = 0;
let mouseOffsetX = 0,
  mouseOffsetY = 0;
let isDragging = false;

draggableBox.addEventListener("mousedown", startDrag);
document.addEventListener("mousemove", onMouseMove);
document.addEventListener("mouseup", stopDrag);

function startDrag(e) {
  e.preventDefault();
  isDragging = true;
  mouseOffsetX = e.clientX - parseInt(draggableBox.offsetLeft);
  mouseOffsetY = e.clientY - parseInt(draggableBox.offsetTop);
}

function onMouseMove(e) {
  if (!isDragging) return;

  posX = e.clientX - mouseOffsetX;
  posY = e.clientY - mouseOffsetY;

  draggableBox.style.left = `${posX}px`;
  draggableBox.style.top = `${posY}px`;
}

function stopDrag() {
  isDragging = false;
}

// Second version - more realistic movement of Dave, but still discrete

// const ball = document.getElementById("ball");
// let positionX = 0;
// let positionY = 0;

// let isLeftPressed = false,
//   isRightPressed = false,
//   isUpPressed = false,
//   isDownPressed = false;

// document.addEventListener("keydown", function (event) {
//   event.preventDefault();

//   switch (event.code) {
//     case "ArrowLeft":
//       isLeftPressed = true;
//       break;
//     case "ArrowRight":
//       isRightPressed = true;
//       break;
//     case "ArrowUp":
//       isUpPressed = true;
//       break;
//     case "ArrowDown":
//       isDownPressed = true;
//       break;
//   }

//   moveBall();
// });

// document.addEventListener("keyup", function (event) {
//   event.preventDefault();

//   switch (event.code) {
//     case "ArrowLeft":
//       isLeftPressed = false;
//       break;
//     case "ArrowRight":
//       isRightPressed = false;
//       break;
//     case "ArrowUp":
//       isUpPressed = false;
//       break;
//     case "ArrowDown":
//       isDownPressed = false;
//       break;
//   }

//   moveBall();
// });

// function moveBall() {
//   if (isLeftPressed) positionX -= 10;
//   if (isRightPressed) positionX += 10;
//   if (isUpPressed) positionY -= 10;
//   if (isDownPressed) positionY += 10;

//   if (positionX < 0) positionX = 0;
//   if (positionY < 0) positionY = 0;

//   refresh();
// }

// function refresh() {
//   ball.style.left = positionX + "px";
//   ball.style.top = positionY + "px";
// }

// First version - discrete movement of Dave

// const ball = document.getElementById("ball");
// document.addEventListener("keydown", handleKeyPress);
// let positionX = 0;
// let positionY = 0;

// function handleKeyPress(e) {
//   e.preventDefault();

//   if (e.code === "ArrowLeft") {
//     positionX -= 10;
//   }
//   if (e.code === "ArrowRight") {
//     positionX += 10;
//   }
//   if (e.code === "ArrowUp") {
//     positionY -= 10;
//   }
//   if (e.code === "ArrowDown") {
//     positionY += 10;
//   }

//   if (e.code === "ArrowLeft" && e.code === "ArrowUp") {
//     positionX -= 10;
//     positionY -= 10;
//   }
//   if (e.code === "ArrowRight" && e.code === "ArrowUp") {
//     positionX += 10;
//     positionY -= 10;
//   }
//   if (e.code === "ArrowLeft" && e.code === "ArrowDown") {
//     positionX -= 10;
//     positionY += 10;
//   }
//   if (e.code === "ArrowRight" && e.code === "ArrowDown") {
//     positionX += 10;
//     positionY += 10;
//   }

//   if (positionX < 0) positionX = 0;
//   if (positionY < 0) positionY = 0;

//   refresh();
// }

// function refresh() {
//   ball.style.left = positionX + "px";
//   ball.style.top = positionY + "px";
// }
