function createStarElement(className) {
  let div = document.createElement("div");
  div.classList.add(className);
  return div;
}

function randomPosition(element) {
  element.style.top = `${Math.random() * 100}%`;
  element.style.left = `${Math.random() * 100}%`;
}

function generateStars(count) {
  const container = document.querySelector(".space");
  for (let i = 0; i < count; i++) {
    let type = Math.floor(Math.random() * 3); 
    let newStar;
    switch (type) {
      case 0:
        newStar = createStarElement("star");
        break;
      case 1:
        newStar = createStarElement("star-small");
        break;
      default:
        newStar = createStarElement("star-middle");
    }
    randomPosition(newStar);
    container.appendChild(newStar);
  }
}

window.onload = () => {
  generateStars(48);
};

document.addEventListener("DOMContentLoaded", () => {
  const stars = document.querySelectorAll(".star");
  const stars_middle = document.querySelectorAll(".star-middle");
  const stars_small = document.querySelectorAll(".star-small");

  stars.forEach((stars) => {
    const delay = Math.random() * 1.8;
    stars.style.animationDelay = `${delay}s`;
    stars.style.animationDuration = `${2 + Math.random()}s`;
  });

  stars_middle.forEach((stars_middle) => {
    const delay = Math.random() * 1.9;
    stars_middle.style.animationDelay = `${delay}s`;
    stars_middle.style.animationDuration = `${1.8 + Math.random()}s`;
  });

  stars_small.forEach((stars_small) => {
    const delay = Math.random() * 2;
    stars_small.style.animationDelay = `${delay}s`;
    stars_small.style.animationDuration = `${1.9 + Math.random()}s`;
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const starContainer = document.querySelector(".space");
  const numberOfStars = 18;
  for (let i = 0; i < numberOfStars; i++) {
    const star = document.createElement("div");
    star.classList.add("star-moving");
    star.style.left = Math.random() * 100 + "vw";
    star.style.animationDuration = 5 + Math.random() * 15 + "s";
    star.style.animationDelay = Math.random() * 10 + "s";
    starContainer.appendChild(star);
  }
});
