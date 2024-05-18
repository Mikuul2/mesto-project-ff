import {closePopup, openPopup} from './modal.js'
import {handleDeleteCard, createCard} from './cards.js';
import {clearValidation} from './validation.js'
import {patchProfileData, postNewCard, patchProfileAvatar} from './api.js'

// id пользователя
const userId = '84784d7812ca7cdb7bad727f';

// текст для UX
const isLoadingText = 'Сохранение...';
const normalText = 'Сохранить';

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

// смена данных и отправка формы изменения профиля
function handleFormSubmit(evt) {
	evt.preventDefault();

	const editForm = document.forms['edit-profile'];
	const nameInput = editForm.elements.name.value;
	const descriptionInput = editForm.elements.description.value;

	profileName.textContent = nameInput;
	profileDescription.textContent = descriptionInput;

	renderLoading(true, editForm);
	patchProfileData(nameInput, descriptionInput)
		.then((res) => {
			if (res.ok) {
				return res.json();
			}
			return Promise.reject(res.status);
		})
		.catch((err) => {
			console.log(`Ошибка: ${err}`)
		})
		.finally(() => {
			renderLoading(false, editForm);
		});


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

	renderLoading(true, avatarForm);
	patchProfileAvatar(avatarUrl)
		.then((res) => {
			if (res.ok) {
				return res.json();
			}
			return Promise.reject(res.status);
		})
		.catch((err) => {
			console.log(`Ошибка: ${err}`)
		})
		.finally(() => {
			renderLoading(false, avatarForm);
		});

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
	const newCard = [];

	// отправляем данные на сервер, получаем новые данные и выводим карточку на страницу
	renderLoading(true, newCardForm);
	postNewCard(cardName, cardUrl)
		.then((res) => {
			if (res.ok) {
				return res.json(); // должен вернуть массив, который надо подставить в функцию отображения карточки
			}
			return Promise.reject(res.status);
		})
		.then((data) => {
			newCard.push(data);
      displayingCards(newCard);
			cardsList.prepend(cardsList.lastChild);
  	})
		.catch((err) => {
			console.log(`Ошибка: ${err}`)
		})
		.finally(() => {
			renderLoading(false, newCardForm);
		});

	// закрываем попап 
	closePopup(addPopup);

	// очищаем форму добавления карточки
	newCardForm.reset();

	// очищаем форму добавления карточки от ошибок валидации
	clearValidation(newCardForm, validationConfig);

	// блокируем кнопку отправки карточки
	buttonElement.classList.add(`${validationConfig.inactiveButtonClass}`);
}

export {changeEditForm, handleFormSubmit, addNewCard, addNewAvatar};