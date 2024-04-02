// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const container = document.querySelector('.content');
const cardsList = container.querySelector('.places__list');

// @todo: Функция создания карточки
function createCard(data, onDelete){
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);

  cardElement.querySelector('.card__title').textContent = data.name;
  cardElement.querySelector('.card__image').src = data.link;
  cardElement.querySelector('.card__image').alt = data.name;
  cardElement.querySelector('.card__delete-button').addEventListener('click', function () {
    onDelete (cardElement);
  });
  return cardElement;
}

// @todo: Функция удаления карточки
function handleDeleteCard(element){
  element.remove();
}

// Функция добавления карточки
function renderCard(createCard){
  cardsList.append(createCard)
}

// @todo: Вывести карточки на страницу
initialCards.forEach((cards) => { 
  renderCard(createCard(cards, handleDeleteCard))
});  