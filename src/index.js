import {handleDeleteCard, createCard} from './scripts/cards.js';
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
const closeButtons = document.querySelectorAll('.popup__close');

const imgPopup = document.querySelector('.popup_type_image');
const popupCardImg = document.querySelector('.popup__image');
const popupImgText = document.querySelector('.popup__caption');

const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');


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

//вставка карточки в список карточек
function renderCard(createCard){
  const cardsList = document.querySelector('.places__list');
  cardsList.append(createCard)
}

//вывод массива карточек
function displayingCards (arr) {
  arr.forEach((elements) => { 
    renderCard(createCard(elements, handleDeleteCard, openImgPopup))
  });
}

//вывод массива карточек
displayingCards(initialCards);

// открытие попапа редактирования профиля
editButton.addEventListener('click', function () {
  openPopup(editPopup);
});

// очищение попапа редактирования профиля при нажатии на крестик
editCloseButton.addEventListener('click', function () {
  profileForm.elements.name.value = profileName.textContent;
  profileForm.elements.description.value = profileDescription.textContent;
});

// открытие попапа добавления карточки
addButton.addEventListener('click', function () {
  openPopup(addPopup);
});

// открытие попапа карточки
function openImgPopup (data) {
  openPopup(imgPopup);
  popupCardImg.src = data.link;
  popupCardImg.alt = data.name;
  popupImgText.textContent = data.name;
};

// великолепная функция закрытия любого попапа
closeButtons.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', function () {
    closePopup(popup);
  });
});

// редактирование и отправка форм
changeEditForm(profileForm);

profileForm.addEventListener('submit', handleFormSubmit);

newCardForm.addEventListener('submit', addNewCard);