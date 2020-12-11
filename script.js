'use strict';

const checkBtn = document.querySelector('.check');
const againBtn = document.querySelector('.again');
const message = document.querySelector('.message');
const previousGuess = document.querySelector('.previous-guess');
const previousGuess2 = document.querySelector('.previous-guess');
const scoreText = document.querySelector('.score');
const highscoreText = document.querySelector('.highscore');

//generate a number between start and end, you can adjust the start, end number, and score
const start = 1;
const end = 20;
let answer;
const score = 20;
let CurrentScore;
let HighScore = 0;
let pre_guess = [];

let ranNum = function () {
  CurrentScore = score;
  scoreText.textContent = CurrentScore;
  message.classList.remove('congrats');
  answer = Math.trunc(Math.random() * end) + 1;
};

//display message:use function to make code dry
const displayMessage = function (text) {
  message.textContent = text;
};

//Check if input is between 1~20(include 1 and 20)
//Check if the input match answer
let checkAnswer = function () {
  //Use DOM here so guess value will renew every time the check btn was clicked
  const guess = document.querySelector('.guess').value;
  console.log(guess);
  if (guess > end || guess < start) {
    alert('請輸入' + start + '~' + end + '(含)的數字');
  } else if (guess == answer) {
    message.classList.add('congrats');
    displayMessage('Congratulations!');
    stop();
    console.log(CurrentScore + ':' + HighScore);
    highscoreText.textContent =
      CurrentScore > HighScore ? CurrentScore : HighScor;
  } else {
    if (CurrentScore == 1) {
      scoreText.textContent = 0;
      displayMessage('GAME OVER');
      stop();
    } else {
      //display message if the guess is too high or too low

      displayMessage(guess > answer ? 'TOO HIGH!' : 'TOO LOW!');
      CurrentScore--;
      scoreText.textContent = CurrentScore;

      //diplay previous guess, break line when previous guess is more than 10
      if (CurrentScore == 9) {
        pre_guess.push('\n');
        pre_guess.push(guess);
        console.log(pre_guess);
        let pre_guessString = pre_guess.join(' ');
        console.log(pre_guessString);
        previousGuess.textContent = pre_guessString;
      } else {
        pre_guess.push(guess);
        let pre_guessString = pre_guess.join(' ');
        previousGuess.textContent = pre_guessString;
      }
    }
  }
};

//stop the game when game over or the guess match the answer, restart the game when again button is clicked
let stop = function () {
  checkBtn.disabled = true;
  checkBtn.style.pointerEvents = 'none';
  checkBtn.style.color = 'gray';
};

let Restart = function () {
  ranNum();
  checkBtn.disabled = false;
  checkBtn.style.pointerEvents = 'auto';
  checkBtn.style.color = '#222';
  console.log(answer);
  document.querySelector('.guess').value = '';
  pre_guess = [];
  let pre_guessString = pre_guess.toString();
  previousGuess.textContent = '';
};

ranNum();
console.log(answer);
checkBtn.addEventListener('click', checkAnswer);
againBtn.addEventListener('click', Restart);
document.querySelector('.guess').addEventListener('keypress', function (event) {
  // Number 13 is the "Enter" key on the keyboard
  if (event.keyCode === 13) {
    checkAnswer();
  }
});
