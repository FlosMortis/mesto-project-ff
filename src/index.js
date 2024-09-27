import { initialCards } from './components/cards.js';
import { createCard, handleDeleteCard, handleLikeCard } from './components/card.js';
import { openModal, closeModal, setEventListeners } from './components/modal.js';
import * as constants from './components/constants.js';
import '../index.css';

function renderCard(cardData) {
  const card = createCard(cardData, handleDeleteCard, openImagePopup, handleLikeCard);
  constants.cardsList.prepend(card);
}

function openImagePopup(cardData) {
  constants.popupImage.src = cardData.link;
  constants.popupImage.alt = cardData.name;
  constants.popupCaption.textContent = cardData.name;
  openModal(constants.imagePopup);
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  constants.profileName.textContent = constants.editProfileForm.name.value;
  constants.profileDescription.textContent = constants.editProfileForm.description.value;
  closeModal(constants.editProfilePopup);
}

function handleAddCardFormSubmit(evt) {
  evt.preventDefault();
  renderCard({
    name: constants.addCardForm['place-name'].value,
    link: constants.addCardForm.link.value
  });
  closeModal(constants.addCardPopup);
  constants.addCardForm.reset();
}

function handleEditProfileButtonClick() {
  constants.editProfileForm.name.value = constants.profileName.textContent;
  constants.editProfileForm.description.value = constants.profileDescription.textContent;
  openModal(constants.editProfilePopup);
}

function handleAddCardButtonClick() {
  openModal(constants.addCardPopup);
}

initialCards.forEach(renderCard);

constants.editProfileButton.addEventListener('click', handleEditProfileButtonClick);
constants.addCardButton.addEventListener('click', handleAddCardButtonClick);

constants.popups.forEach(setEventListeners);

constants.editProfileForm.addEventListener('submit', handleProfileFormSubmit);
constants.addCardForm.addEventListener('submit', handleAddCardFormSubmit);