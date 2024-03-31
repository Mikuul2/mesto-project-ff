// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const container = document.querySelector('.content');
const cardsList = container.querySelector('.places__list');

// @todo: Функция создания карточки
function createCards(cards) {
  cards.forEach(function (element) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  
    cardElement.querySelector('.card__title').textContent = element.name;
    cardElement.querySelector('.card__image').src = element.link;
    cardElement.querySelector('.card__delete-button').addEventListener('click', function () {
      deleteCard (cardElement);
    });
    cardsList.append(cardElement)
  })
}

// @todo: Функция удаления карточки
function deleteCard (element) {
  element.remove();
}

// @todo: Вывести карточки на страницу
createCards (initialCards);