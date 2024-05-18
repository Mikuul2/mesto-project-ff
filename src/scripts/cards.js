import {deleteNewCard, putCardsLike, deleteCardsLike} from './api.js'

// создание карточки
function createCard(data, onDelete, openImgPopup, userId) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
  const likeButton = cardElement.querySelector('.card__like-button');
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const cardImg = cardElement.querySelector('.card__image');
  const likeCounter = cardElement.querySelector('.card__like-counter');

  cardElement.querySelector('.card__title').textContent = data.name;
  cardImg.src = data.link;
  cardImg.alt = data.name;
  likeCounter.textContent = data.likes.length;

  deleteButton.classList.add('visually-hidden');

  if (data.owner._id === userId) {
    deleteButton.classList.remove('visually-hidden');
  }

  deleteButton.addEventListener('click', function () {
    onDelete (cardElement, data._id);
  });

  cardImg.addEventListener('click', function () {
    openImgPopup (data);
  });

  likeButton.addEventListener('click', function () {
    likeCard (likeButton, data._id);
    if (likeButton.classList.contains('card__like-button_is-active')) {
      likeCounter.textContent = Number(likeCounter.textContent) + 1;
    } else {
      likeCounter.textContent = Number(likeCounter.textContent) - 1;
    }
  });

  return cardElement;
};

// удаление карточки
function handleDeleteCard(element, elementId) {
  element.remove();
  deleteNewCard(elementId);
};

// лайк карточки
function likeCard (likeButton, id) {
  if (likeButton.classList.contains('card__like-button_is-active')) {
    likeButton.classList.remove('card__like-button_is-active');
    deleteCardsLike(id);
  } else {
    likeButton.classList.add('card__like-button_is-active');
    putCardsLike(id);
  }
};

export {handleDeleteCard, createCard};