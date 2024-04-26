import {closePopup} from './modal.js'
import {handleDeleteCard, createCard} from './cards.js';

const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const editPopup = document.querySelector('.popup_type_edit');
const cardsList = document.querySelector('.places__list');
const addPopup = document.querySelector('.popup_type_new-card');

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

	const nameInput = document.forms['edit-profile'].elements.name;
	const descriptionInput = document.forms['edit-profile'].elements.description;

	profileName.textContent = nameInput.value;
	profileDescription.textContent = descriptionInput .value

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
    renderCard(createCard(elements, handleDeleteCard))
  });
}

// добавление новой карточки
function addNewCard(evt) {
	evt.preventDefault();

	const newCardForm = document.forms['new-place'];
	const cardName = newCardForm.elements['place-name'].value;
	const cardSrc = newCardForm.elements.link.value;

	const newCardArr = [
		{
			name: cardName,
			link: cardSrc,
		}
	];

	displayingCards(newCardArr);
	cardsList.prepend(cardsList.lastChild);
	closePopup(addPopup);
	newCardForm.reset();
}

export {changeEditForm, handleFormSubmit, addNewCard};