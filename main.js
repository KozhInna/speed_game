const startBtn = document.querySelector("#startBtn");
const endBtn = document.querySelector("#endBtn");
const backBtn = document.querySelector("#backBtn");

const circles = document.querySelectorAll(".circle"); //querySelectorAll - created a NodeList like an array, so its index can be looped through
const overlayEnd = document.querySelector(".overlay-endGame");
const modalEnd = document.querySelector(".modal-endGame");

const overlayBtw = document.querySelector(".overlay-btwRounds");
const modalBtw = document.querySelector(".modal-btwRounds");
const overlayBlood = document.querySelector(".overlay-blood");

const score = document.querySelector(".score");
/* const roundMain = document.querySelector(".round-main"); */
const roundBetween = document.querySelector(".round-between");
const resultText = document.querySelector(".game-result-text");
const bestScore = document.querySelector(".best-score");
const livesImg = document.querySelector(".lives");
const healthImg = document.querySelector(".health");
const speed = document.querySelector(".speed");
const rulesOverlay = document.querySelector(".rules-overlay");

let scoreValue = 0;
let timer;
let pace = 1500;
let active = 0;

let playing = true;
let highestScore = 0;

let hits = 0;
let moves = 0;

let lives = 3;
let timer2;
let mosquito = 0;

/* let clicked = false; */
/* function to generate a random num */
const getRandomNum = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);
/* console.log(getRandomNum(0, 3)); */

const stopGame = () => {
  if (lives !== 0) {
    playing = false;
    overlayBtw.classList.toggle("visible");
    lives > 1
      ? (roundBetween.textContent = `${lives} lives`)
      : (roundBetween.textContent = `${lives} life`);
    bestScore.textContent = highestScore;
  } else {
    return endGame;
  }
};

function openOverlayBlood() {
  overlayBlood.classList.add("open");
  playing = false;
  setTimeout(() => {
    overlayBlood.classList.remove("open");
  }, 500);
}

const hitBreak = () => {
  console.log(`this is hit ${hits}`);
  healthImg.src = `/img/health--${hits}.png`;
  playing = true;
};

const timerForStop = () => {
  setTimeout(stopGame, 1000);
};
const timerForEnd = () => {
  setTimeout(endGame, 1000);
};

const clickCircle = (i) => {
  if (i !== active) {
    hits++;
    moves--;
    if (hits < 3 && lives >= 1) {
      openOverlayBlood();
      return hitBreak();
    } else if (hits === 3 && lives > 1) {
      healthImg.src = `/img/health--${hits}.png`;
      lives--;
      console.log(`this are lives left ${lives}`);
      return timerForStop();
    } else if (hits === 3 && lives === 1) {
      healthImg.src = `/img/health--${hits}.png`;
      livesImg.src = `/img/hearts--${lives}.png`;
      return timerForEnd();
    }
  }
  circles[active].classList.add("killed");

  /*  console.log("circle is clicked", i); */
  /* score increases only after a right click */
  scoreValue += 10;
  moves--;
  console.log(`this is score ${scoreValue}`);

  score.textContent = scoreValue;

  if (highestScore < scoreValue) {
    highestScore = scoreValue;
  }
};
/* i is an index for NodeList */
circles.forEach((circle, i) => {
  circle.addEventListener("click", () => clickCircle(i));
});
const enableCircle = () => {
  circles.forEach((circle) => {
    circle.style.pointerEvents = "auto";
  });
};
const startGame = () => {
  if (playing) {
    rulesOverlay.classList.remove("hidden");
    if (moves >= 3) {
      return endGame();
    }

    livesImg.src = `/img/hearts--${lives}.png`;
    startBtn.classList.add("hidden");
    endBtn.classList.remove("hidden");

    if (lives === 0) {
      console.log(`problem with rounds`);
      return endGame();
    }
    enableCircle();
    /* newActive - store the new random num and is the
      result of func pickNewNum with argument 0 initially */
    const newActive = pickNewNum(active);

    circles[newActive].classList.add("active");
    circles[active].classList.remove("killed");
    circles[active].classList.remove("active");

    active = newActive;

    timer = setTimeout(startGame, pace);
    pace -= 10;
    mosquito++;
    speed.textContent = mosquito;
    moves++;

    /* console.log(rounds); */

    function pickNewNum(active) {
      const newActive = getRandomNum(0, 3);

      if (newActive !== active) {
        return newActive;
      }
      return pickNewNum(active);
    }
  }
  /* console.log(active); */
};

const endGame = () => {
  if (playing) {
    if (highestScore > 100) {
      resultText.textContent = `You are a professional! Your best score is ${highestScore}. Now`;
    } else if (highestScore > 50 && highestScore < 100) {
      resultText.textContent = `Your best score is ${highestScore}. Good result!`;
    } else if (highestScore > 10 && highestScore < 50) {
      resultText.textContent = `Try again. Your score is ${highestScore}.`;
    } else if (scoreValue === 0) {
      resultText.textContent = `Try again. Your score is ${highestScore}.`;
    }
    overlayEnd.classList.toggle("visible");
    overlayEnd.addEventListener("click", resetGame);

    clearTimeout(timer);
    /* round.textContent = 3; */
  }
};

const resetGame = () => {
  window.location.reload();
};
const openModal = () => {
  overlayEnd.classList.add("visible");
  modalEnd.classList.remove("visible");
};
const continueGame = () => {
  playing = true;
  score.textContent = 0;
  scoreValue = 0;
  overlayBtw.classList.toggle("visible");
  healthImg.src = `/img/health--0.png`;

  hits = 0;

  startGame();
};

startBtn.addEventListener("click", startGame);
endBtn.addEventListener("click", endGame);
backBtn.addEventListener("click", continueGame);
