const startBtn = document.querySelector("#startButton");
const endBtn = document.querySelector("#endButton");
const circles = document.querySelectorAll(".round");
/* querySelectorAll - created a NodeList like an array,
so i index can be looped through */
const score = document.querySelector(".score");

let scoreValue = 0;
let timer;
let pace = 1000;
let active = 0;
let rounds = 0;

/* function to generate a random num */
const getRandomNum = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);
/* console.log(getRandomNum(0, 3)); */

const clickCircle = (i) => {
  if (i !== active) {
    /* return won't let to read the code below this function */
    return endGame();
  }
  console.log("circle is clicked", i);
  rounds--;
  scoreValue += 10;
  score.textContent = scoreValue;
};

circles.forEach((circle, i) => {
  circle.addEventListener("click", () => clickCircle(i));
});

const enableCircle = () => {
  circles.forEach((circle) => {
    circle.style.pointerEvents = "auto";
  });
};

const startGame = () => {
  if (rounds >= 3) {
    return endGame;
  }
  enableCircle();
  /* newActive - store the new random num and is the 
  result of func pickNewNum with argument 1000 initially */
  const newActive = pickNewNum(active);

  circles[newActive].classList.toggle("active");
  circles[active].classList.remove("active");

  active = newActive;

  timer = setTimeout(startGame, pace);
  pace -= 10;
  rounds++;
  function pickNewNum(active) {
    const newActive = getRandomNum(0, 3);
    if (newActive !== active) {
      return newActive;
    }
    return pickNewNum(active);
  }
  /* console.log(active); */
};
const resetGame = () => {
  window.location.reload();
};

const endGame = () => {
  console.log("Game ended");
  clearTimeout(timer);
  resetGame();
};

/* for (const item of circles) {
  item.addEventListener("click", clickCircle);
}  (for loop you can use value instead of index i */

startBtn.addEventListener("click", startGame);
endBtn.addEventListener("click", endGame);
