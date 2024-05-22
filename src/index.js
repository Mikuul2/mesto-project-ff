import {handleDeleteCard, createCard} from './scripts/cards.js';
import {openPopup, closePopup} from './scripts/modal.js';
import {enableValidation, clearValidation} from './scripts/validation.js'
import {getUserInfo, getInitialCards, patchProfileData, postNewCard, patchProfileAvatar} from './scripts/api.js';
import './pages/index.css';

// текст для UX
const isLoadingText = 'Сохранение...';
const normalText = 'Сохранить';

// переменная списка карточек
const cardsList = document.querySelector('.places__list');

// переменные попапа профиля
const editPopup = document.querySelector('.popup_type_edit');

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

// Улучшенный UX
function renderLoading (isLoading, form) {
  const buttonElement = form.querySelector(`${validationConfig.submitButtonSelector}`);
  if (isLoading) {
    buttonElement.textContent = isLoadingText;
  } else {
			buttonElement.textContent = normalText;
  }
}

// смена данных в форме изменения профиля в соответствии с актуальными данными
function changeEditForm (form) {
	const nameInput = form.elements.name;
	const descriptionInput = form.elements.description;
	nameInput.value = profileName.textContent;
	descriptionInput.value = profileDescription.textContent;
}

// закрытие, открытие и очищение попапов
// открытие попапа редактирования профиля
editButton.addEventListener('click', function () {
  changeEditForm(profileForm);
  clearValidation(profileForm, validationConfig);
  openPopup(editPopup);
});

avatarElement.addEventListener('click', function() {
  avatarForm.reset();
  clearValidation(avatarForm, validationConfig);
  openPopup(popupAvatar);
})

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

// смена данных и отправка формы изменения профиля
function handleFormSubmit(evt) {
	evt.preventDefault();

	const editForm = document.forms['edit-profile'];
	const nameInput = editForm.elements.name.value;
	const descriptionInput = editForm.elements.description.value;

	renderLoading(true, editForm);
	patchProfileData(nameInput, descriptionInput)
		.then((data) => {
			profileName.textContent = data.name;
			profileDescription.textContent = data.about;
			closePopup(editPopup);
		})
		.catch((err) => {
			console.log(`Ошибка: ${err}`)
		})
		.finally(() => {
			renderLoading(false, editForm);
		});
}

// функция смены аватара
function addNewAvatar (evt) {
	evt.preventDefault();
	const avatarForm = document.forms['new-avatar'];
	const avatarUrl = avatarForm.elements.link.value;
	const buttonElement = avatarForm.querySelector(`${validationConfig.submitButtonSelector}`);

	renderLoading(true, avatarForm);
	patchProfileAvatar(avatarUrl)
		.then((data) => {
			avatarElement.style.backgroundImage = `url('${data.avatar}')`;
			closePopup(popupAvatar);
			avatarForm.reset();
			buttonElement.classList.add(`${validationConfig.inactiveButtonClass}`);
		})
		.catch((err) => {
			console.log(`Ошибка: ${err}`)
		})
		.finally(() => {
			renderLoading(false, avatarForm);
		});
}

// добавление новой карточки
function addNewCard(evt) {
	evt.preventDefault();

	const newCardForm = document.forms['new-place'];
	const cardName = newCardForm.elements['place-name'].value;
	const cardUrl = newCardForm.elements.link.value;
	const buttonElement = newCardForm.querySelector(`${validationConfig.submitButtonSelector}`);
	
	renderLoading(true, newCardForm);
	postNewCard(cardName, cardUrl)
		.then((data) => {
			cardsList.prepend(createCard(data, handleDeleteCard, openImgPopup, data.owner._id));
			closePopup(addPopup);
			newCardForm.reset();
			clearValidation(newCardForm, validationConfig);
			buttonElement.classList.add(`${validationConfig.inactiveButtonClass}`);
  	})
		.catch((err) => {
			console.log(`Ошибка: ${err}`)
		})
		.finally(() => {
			renderLoading(false, newCardForm);
		});
}

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

//вставка карточки в список карточек
function renderCard(createCard){
  cardsList.append(createCard)
}

// вывод массива карточек
function displayingCards (arr, userId) {
  arr.forEach((elements) => { 
    renderCard(createCard(elements, handleDeleteCard, openImgPopup, userId))
  });
}

Promise.all([ 
  getUserInfo(),
  getInitialCards() ])
    .then(([info, initialCards])=>{
      renderProfileData(info);
      displayingCards(initialCards, info._id);
    })
    .catch((err)=>{
    console.log(err);
    })