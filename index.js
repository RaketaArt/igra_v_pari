import { createBoard } from './scripts/createBoard.js';

const startButton = document.querySelector('.board__button');

startButton.addEventListener("click", (event) => {
  event.preventDefault()
  const input = document.querySelector('.board__input');

  let columns = input.value;
  let count;

  if (columns >= 2 && columns <= 6 && columns % 2 == 0) {
    count = columns * columns;
  } else {
    alert("нужно написать четное число в указанном диапазоне.");
    return;
  }

  createBoard(count, columns);
});





