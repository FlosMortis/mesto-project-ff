import { initialCards } from './components/cards.js';
import { createCard, handleDeleteCard } from './components/card.js';
import { openModal, closeModal, setEventListeners } from './components/modal.js';
import '../index.css';

const cardsList = document.querySelector('.places__list');
const editProfilePopup = document.querySelector('.popup_type_edit');
const addCardPopup = document.querySelector('.popup_type_new-card');
const imagePopup = document.querySelector('.popup_type_image');
const editProfileButton = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.profile__add-button');
const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const popups = document.querySelectorAll('.popup');
const editProfileForm = document.forms['edit-profile'];
const addCardForm = document.forms['new-place'];
const popupImage = imagePopup.querySelector('.popup__image');
const popupCaption = imagePopup.querySelector('.popup__caption');

function renderCard(cardData) {
  const card = createCard(cardData, handleDeleteCard, openImagePopup);
  cardsList.prepend(card);
}

function openImagePopup(cardData) {
  popupImage.src = cardData.link;
  popupImage.alt = cardData.name;
  popupCaption.textContent = cardData.name;
  openModal(imagePopup);
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = editProfileForm.name.value;
  profileDescription.textContent = editProfileForm.description.value;
  closeModal(editProfilePopup);
}

function handleAddCardFormSubmit(evt) {
  evt.preventDefault();
  renderCard({
    name: addCardForm['place-name'].value,
    link: addCardForm.link.value
  });
  closeModal(addCardPopup);
  addCardForm.reset();
}

initialCards.forEach(renderCard);

editProfileButton.addEventListener('click', () => {
  editProfileForm.name.value = profileName.textContent;
  editProfileForm.description.value = profileDescription.textContent;
  openModal(editProfilePopup);
});
addCardButton.addEventListener('click', () => openModal(addCardPopup));

popups.forEach(setEventListeners);

editProfileForm.addEventListener('submit', handleProfileFormSubmit);
addCardForm.addEventListener('submit', handleAddCardFormSubmit);