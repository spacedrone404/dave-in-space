// draggable Dave

// const draggableBox = document.getElementById(".dave-wrapper");

// let posX = 0,
//   posY = 0;
// let mouseOffsetX = 0,
//   mouseOffsetY = 0;
// let isDragging = false;

// draggableBox.addEventListener("mousedown", startDrag);
// document.addEventListener("mousemove", onMouseMove);
// document.addEventListener("mouseup", stopDrag);

// function startDrag(e) {
//   e.preventDefault();
//   isDragging = true;
//   mouseOffsetX = e.clientX - parseInt(draggableBox.offsetLeft);
//   mouseOffsetY = e.clientY - parseInt(draggableBox.offsetTop);
// }

// function onMouseMove(e) {
//   if (!isDragging) return;

//   posX = e.clientX - mouseOffsetX;
//   posY = e.clientY - mouseOffsetY;

//   draggableBox.style.left = `${posX}px`;
//   draggableBox.style.top = `${posY}px`;
// }

// function stopDrag() {
//   isDragging = false;
// }
