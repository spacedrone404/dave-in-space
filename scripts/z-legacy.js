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
