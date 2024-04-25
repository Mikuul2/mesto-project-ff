import {displayingCards} from './scripts/cards.js';
import {openPopup, closePopup} from './scripts/modal.js'
import {changeEditForm, handleFormSubmit, addNewCard} from './scripts/form.js'
import './pages/index.css';

const  arhizImage = new URL('https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg', import.meta.url);
const  chelyabinskImage = new URL('https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg', import.meta.url);
const  ivanovoImage = new URL('https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg', import.meta.url);
const  kamchatkaImage = new URL('https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg', import.meta.url);
const  holmogorImage = new URL('https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg', import.meta.url);
const  baikalImage = new URL('https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg', import.meta.url);

const editPopup = document.querySelector('.popup_type_edit');
const editButton = document.querySelector('.profile__edit-button');
const editCloseButton = document.querySelector('.popup_type_edit .popup__close');
const addPopup = document.querySelector('.popup_type_new-card');
const addButton = document.querySelector('.profile__add-button');
const addCloseButton = document.querySelector('.popup_type_new-card .popup__close');
const imgPopup = document.querySelector('.popup_type_image');
const imgCloseButton = document.querySelector('.popup__content_content_image .popup__close');

const profileForm = document.forms['edit-profile'];
const newCardForm = document.forms['new-place'];

const initialCards = [
  {
    name: "Архыз",
    link: arhizImage,
  },
  {
    name: "Челябинская область",
    link: chelyabinskImage,
  },
  {
    name: "Иваново",
    link: ivanovoImage,
  },
  {
    name: "Камчатка",
    link: kamchatkaImage,
  },
  {
    name: "Холмогорский район",
    link: holmogorImage,
  },
  {
    name: "Байкал",
    link: baikalImage,
  }
];

// вывод карточек
displayingCards(initialCards);

// открытие попапа редактирования профиля
editButton.addEventListener('click', function () {
  openPopup(editPopup);
});

// закрытие попапа редактирования профиля
editCloseButton.addEventListener('click', function () {
  closePopup(editPopup);
  profileForm.elements.name.value = document.querySelector('.profile__title').textContent;
  profileForm.elements.description.value = document.querySelector('.profile__description').textContent;
});

// открытие попапа добавления карточки
addButton.addEventListener('click', function () {
  openPopup(addPopup);
});

// закрытие попапа добавления карточки
addCloseButton.addEventListener('click', function () {
  closePopup(addPopup);
});

// закрытие попапа картинки в карточке
imgCloseButton.addEventListener('click', function () {
  closePopup(imgPopup);
});

// редактирование и отправка форм
changeEditForm(profileForm);

profileForm.addEventListener('submit', handleFormSubmit);

newCardForm.addEventListener('submit', addNewCard);