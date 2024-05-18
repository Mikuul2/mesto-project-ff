import {closePopup, openPopup} from './modal.js'
import {handleDeleteCard, createCard} from './cards.js';
import {clearValidation} from './validation.js'
import {patchProfileData, postNewCard, patchProfileAvatar} from './api.js'

// id пользователя
const userId = '84784d7812ca7cdb7bad727f';

// переменные профиля
const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

// переменная списка карточек
const cardsList = document.querySelector('.places__list');

// переменные всех попапов
const editPopup = document.querySelector('.popup_type_edit');
const imgPopup = document.querySelector('.popup_type_image');
const addPopup = document.querySelector('.popup_type_new-card');
const popupAvatar = document.querySelector('.popup_type_new-avatar');

// переменные попапа картинки
const popupCardImg = document.querySelector('.popup__image');
const popupImgText = document.querySelector('.popup__caption');

// переменная элемента ававтара
const avatarElement = document.querySelector('.profile__image');

// конфигурация классов для валидации форм
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

// смена данных в форме изменения профиля в соответствии с актуальными данными
function changeEditForm (form) {
	const nameInput = form.elements.name;
	const descriptionInput = form.elements.description;
	nameInput.value = profileName.textContent;
	descriptionInput.value = profileDescription.textContent;
}

// смена данных и отправка формы изменения профиля
function handleFormSubmit(evt) {
	evt.preventDefault();

	const nameInput = document.forms['edit-profile'].elements.name.value;
	const descriptionInput = document.forms['edit-profile'].elements.description.value;

	profileName.textContent = nameInput;
	profileDescription.textContent = descriptionInput;

	patchProfileData(nameInput, descriptionInput);

	closePopup(editPopup)
}

//вставка карточки в список карточек
function renderCard(createCard){
  const cardsList = document.querySelector('.places__list');
  cardsList.append(createCard)
}

//вывод массива карточек
function displayingCards (arr) {
  arr.forEach((elements) => { 
    renderCard(createCard(elements, handleDeleteCard, openImgPopup, userId))
  });
}

// открытие попапа карточки
function openImgPopup (data) {
  openPopup(imgPopup);
  popupCardImg.src = data.link;
  popupCardImg.alt = data.name;
  popupImgText.textContent = data.name;
};

function addNewAvatar (evt) {
	evt.preventDefault();
	const avatarForm = document.forms['new-avatar'];
	const avatarUrl = avatarForm.elements.link.value;
	const buttonElement = avatarForm.querySelector(`${validationConfig.submitButtonSelector}`);

	avatarElement.style.backgroundImage = `url('${avatarUrl}')`;

	patchProfileAvatar(avatarUrl);
	closePopup(popupAvatar);
	avatarForm.reset();
	buttonElement.classList.add(`${validationConfig.inactiveButtonClass}`);
}

// добавление новой карточки
function addNewCard(evt) {
	evt.preventDefault();

	const newCardForm = document.forms['new-place'];
	const cardName = newCardForm.elements['place-name'].value;
	const cardUrl = newCardForm.elements.link.value;
	const buttonElement = newCardForm.querySelector(`${validationConfig.submitButtonSelector}`);
	const likesArr = [];

	const newCardArr = [
		{
			name: cardName,
			link: cardUrl,
			likes: likesArr,
			owner: {
				_id: userId
			}
		}
	];

	// вывод карточки
	displayingCards(newCardArr);

	// вставляем карточку в начало
	cardsList.prepend(cardsList.lastChild);

	// закрываем попап добавления карточки
	closePopup(addPopup);

	// очищаем форму добавления карточки
	newCardForm.reset();

	// очищаем форму добавления карточки от ошибок валидации
	clearValidation(newCardForm, validationConfig);

	// блокируем кнопку отправки карточки
	buttonElement.classList.add(`${validationConfig.inactiveButtonClass}`);

	// отправляем карточку на сервер
	postNewCard(cardName, cardUrl);
}

export {changeEditForm, handleFormSubmit, addNewCard, addNewAvatar};