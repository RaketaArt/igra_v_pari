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
import { gameLogic } from "./gameLogic.js";

function createCard(flippedIcon) {
  
  const template = document.querySelector('#cardTemplate').cloneNode(true).content;
  
  const card = template.querySelector('.card');
  
  card.querySelector('#flippedIcon').classList.add(`fa-${flippedIcon}`);

  card.addEventListener('click', () => gameLogic(card));

  
  return card;
}

function createIconsArray(initialCount) {
  
  const cardsIcons = [
    "compass",
    "cloud",
    "play",
    "bolt",
    "stop",
    "cogs",
    "atom",
    "basketball-ball",
    "arrows",
    "angle-left",
    "bars",
    "file",
    "filter",
    "gear",
    "folder",
    "folder-open",
    "shield",
    "scissors",
    "pen-clip",
  ];

  
  let cards = cardsIcons.slice(0, Math.floor(initialCount / 2));
  
  const duobleCards = dublicateElements(cards);

  
  return shuffleArray(duobleCards);
};


function shuffleArray(array) {
  
  let currentIndex = array.length;

  
  while (currentIndex !== 0) {
    
    currentIndex--;
    
    const randomIndex = Math.floor(Math.random() * currentIndex);

    
    const temp = array[currentIndex];
    
    array[currentIndex] = array[randomIndex];
    
    array[randomIndex] = temp;
  };

  
  return array;
}


function dublicateElements(array) {
  const newArr = [];

  
  array.forEach((item) => {
    newArr.push(item, item);
  });

  return newArr;
}

export { createCard, createIconsArray };
import { startTimer } from './timer.js';
import { createIconsArray, createCard } from './cards.js';

export function createBoard(count, columns) {
  const gameBoard = document.querySelector(".board");

  gameBoard.textContent = "";

  // Создание клона шаблона
  const template = document.querySelector('#gameTableTemplate').cloneNode(true).content;
  // В шаблоне находится таблица
  const gameTable = template.querySelector('.table');
  // В шаблоне находится кнопка "Рестарт"
  const restartBtn = template.querySelector(".table__button");

  // Создание определенного количества иконок
  const icons = createIconsArray(count);

  // Заполнение ячеек карточками
  icons.forEach((icon) => {
    gameTable.append(createCard(icon));
  });

  gameTable.style = `
  grid-template-columns: repeat(${columns}, 1fr);
  grid-template-rows: repeat(${columns}, 1fr);
  `;

  gameBoard.append(gameTable);

  restartBtn.addEventListener("click", () => {
    location.reload();
  });

  gameBoard.append(restartBtn);

  startTimer();
};






