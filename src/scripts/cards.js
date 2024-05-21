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
  
  if (data.likes.find(like => like._id === userId)) {
    likeButton.classList.add('card__like-button_is-active');
  }

  deleteButton.addEventListener('click', function () {
    onDelete (cardElement, data._id);
  });

  cardImg.addEventListener('click', function () {
    openImgPopup (data);
  });

  likeButton.addEventListener('click', function () {
    likeCard (likeButton, data._id, likeCounter);
  });

  return cardElement;
};

// удаление карточки
function handleDeleteCard(element, elementId) {
  deleteNewCard(elementId)
  .then(() => {
    element.remove();
  })
  .catch((err) => {
    console.log(err);
  });
};

// лайк карточки
function likeCard (likeButton, id, likeCounter) {
  if (likeButton.classList.contains('card__like-button_is-active')) {
    deleteCardsLike(id)
      .then(() => {
        likeButton.classList.remove('card__like-button_is-active');
        likeCounter.textContent = Number(likeCounter.textContent) - 1;
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    putCardsLike(id)
      .then(() => {
        likeButton.classList.add('card__like-button_is-active');
        likeCounter.textContent = Number(likeCounter.textContent) + 1;
      })
      .catch((err) => {
        console.log(err);
      });
  }
};

export {handleDeleteCard, createCard};