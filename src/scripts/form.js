import {closePopup} from './modal'
import {displayingCards} from './cards'


// смена данных в форме изменения профиля в соответствии с актуальными данными
function changeEditForm (form) {
	const nameInput = form.elements.name;
	const descriptionInput = form.elements.description;
	nameInput.value = document.querySelector('.profile__title').textContent;
	descriptionInput.value = document.querySelector('.profile__description').textContent;
}

// смена данных и отправка формы изменения профиля
function handleFormSubmit(evt) {
	evt.preventDefault();

	const nameInput = document.forms['edit-profile'].elements.name;
	const descriptionInput = document.forms['edit-profile'].elements.description;

	document.querySelector('.profile__title').textContent = nameInput.value;
	document.querySelector('.profile__description').textContent = descriptionInput .value

	closePopup(document.querySelector('.popup_type_edit'))
}

// добавление новой карточки
function addNewCard(evt) {
	evt.preventDefault();

	const newCardForm = document.forms['new-place'];
	const cardName = newCardForm.elements['place-name'].value;
	const cardSrc = newCardForm.elements.link.value;
	const cardsList = document.querySelector('.places__list');
	const addPopup = document.querySelector('.popup_type_new-card');

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