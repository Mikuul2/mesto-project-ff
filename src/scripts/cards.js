import {openPopup} from './modal.js'

// создание карточки
function createCard(data, onDelete){
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
  const likeButton = cardElement.querySelector('.card__like-button');

  cardElement.querySelector('.card__title').textContent = data.name;
  cardElement.querySelector('.card__image').src = data.link;
  cardElement.querySelector('.card__image').alt = data.name;

  cardElement.querySelector('.card__delete-button').addEventListener('click', function () {
    onDelete (cardElement);
  });

  cardElement.querySelector('.card__image').addEventListener('click', function () {
    openPopup(document.querySelector('.popup_type_image'));
    document.querySelector('.popup__image').src = data.link;
    document.querySelector('.popup__image').alt = data.name;
    document.querySelector('.popup__caption').textContent = data.name;
  });

  likeButton.addEventListener('click', function () {
    if (likeButton.classList.contains('card__like-button_is-active')) {
      likeButton.classList.remove('card__like-button_is-active');
    } else {
      likeButton.classList.add('card__like-button_is-active');
    }
  });

  return cardElement;
}

//удаление карточки
function handleDeleteCard(element){
  element.remove();
}

//вставка карточки в список карточек
function renderCard(createCard){
  const cardsList = document.querySelector('.places__list');
  cardsList.append(createCard)
}

//вывод массива карточек
function displayingCards (arr) {
  arr.forEach((elements) => { 
    renderCard(createCard(elements, handleDeleteCard))
  });
}

export {displayingCards};