import {openPopup} from './modal.js'

// По заданию для обработки лайка, удаления и клика по картинке нужно сделать отдельные функции 
// и передавать их в вызов функции создания карточки

const imgPopup = document.querySelector('.popup_type_image');
const popupCardImg = document.querySelector('.popup__image');
const popupImgText = document.querySelector('.popup__caption');

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
    openImgPopup (data);
  });

  likeButton.addEventListener('click', function () {
    likeCard (likeButton);
  });

  return cardElement;
};

// открытие попапа карточки
function openImgPopup (data) {
  openPopup(imgPopup);
  popupCardImg.src = data.link;
  popupCardImg.alt = data.name;
  popupImgText.textContent = data.name;
};

// удаление карточки
function handleDeleteCard(element){
  element.remove();
};

// лайк карточки
function likeCard (likeButton) {
  if (likeButton.classList.contains('card__like-button_is-active')) {
    likeButton.classList.remove('card__like-button_is-active');
  } else {
    likeButton.classList.add('card__like-button_is-active');
  }
};

export {handleDeleteCard, createCard};