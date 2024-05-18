import {handleDeleteCard, createCard} from './scripts/cards.js';
import {openPopup, closePopup} from './scripts/modal.js';
import {enableValidation, clearValidation} from './scripts/validation.js'
import {changeEditForm, handleFormSubmit, addNewCard, addNewAvatar} from './scripts/form.js';
import {getProfileData, getInitialCards} from './scripts/api.js';
import './pages/index.css';

// переменные попапа профиля
const editPopup = document.querySelector('.popup_type_edit');
const editCloseButton = document.querySelector('.popup_type_edit .popup__close');

// переменные попапа добавления карточки
const closeButtons = document.querySelectorAll('.popup__close');
const addPopup = document.querySelector('.popup_type_new-card');

// переменные кнопок открытия попапов профиля и добавления карточки
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');

// переменные попапа картинки
const imgPopup = document.querySelector('.popup_type_image');
const popupCardImg = document.querySelector('.popup__image');
const popupImgText = document.querySelector('.popup__caption');

// переменные профиля
const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileAvatar = document.querySelector('.profile__image');

// переменные аватара и его попапа
const avatarElement = document.querySelector('.profile__image');
const popupAvatar = document.querySelector('.popup_type_new-avatar');

// переменные форм
const profileForm = document.forms['edit-profile'];
const newCardForm = document.forms['new-place'];
const avatarForm = document.forms['new-avatar'];

// конфигурация классов для валидации форм
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

// id пользователя
const userId = '84784d7812ca7cdb7bad727f';

// вывод карточек
// вставка карточки в список карточек
function renderCard(createCard){
  const cardsList = document.querySelector('.places__list');
  cardsList.append(createCard)
}

// вывод массива карточек
function displayingCards (arr) {
  arr.forEach((elements) => { 
    renderCard(createCard(elements, handleDeleteCard, openImgPopup, userId))
  });
}

// закрытие, открытие и очищение попапов
// открытие попапа редактирования профиля
editButton.addEventListener('click', function () {
  openPopup(editPopup);
  clearValidation(profileForm, validationConfig);
});

avatarElement.addEventListener('click', function() {
  openPopup(popupAvatar);
  clearValidation(avatarForm, validationConfig);
})

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

// валидация
// валидация форм
enableValidation(validationConfig);

// отправка формы редактирования профиля
profileForm.addEventListener('submit', handleFormSubmit);

// отправка формы добавления карточки
newCardForm.addEventListener('submit', addNewCard);

// отправка формы смены аватара
avatarForm.addEventListener('submit', addNewAvatar)

// работа с данными
// подставляем данные профиля
function renderProfileData(profile) {
  profileName.textContent = profile.name;
  profileDescription.textContent = profile.about;
  profileAvatar.style.backgroundImage = `url('${profile.avatar}')`;
}

// получаем и обрабатываем данные профиля
getProfileData()
  .then((result) => {
    renderProfileData(result);
    changeEditForm(profileForm);
  })
  .catch((err) => {
    console.log(err);
  });

// получаем и обрабатываем данные карточек
getInitialCards()
  .then((result) => {
    displayingCards(result);
  })
  .catch((err) => {
    console.log(err);
  });