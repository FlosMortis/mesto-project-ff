import { initialCards } from './components/cards.js';
import { createCard, handleDeleteCard, handleLikeCard } from './components/card.js';
import { openModal, closeModal, setEventListeners } from './components/modal.js';
import { enableValidation, clearValidation } from './components/validation.js';
import * as api from './components/api.js';
import * as constants from './components/constants.js';
import '../index.css';

let userId;

function renderCard(cardData) {
  const card = createCard(cardData, handleDeleteCard, openImagePopup, handleLikeCard, userId);
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
  const submitButton = evt.target.querySelector('.popup__button');
  const originalButtonText = submitButton.textContent;
  submitButton.textContent = 'Сохранение...';
  
  api.updateProfile(constants.editProfileForm.name.value, constants.editProfileForm.description.value)
    .then((userData) => {
      constants.profileName.textContent = userData.name;
      constants.profileDescription.textContent = userData.about;
      closeModal(constants.editProfilePopup);
    })
    .catch((err) => console.log(err))
    .finally(() => {
      submitButton.textContent = originalButtonText;
    });
}

function handleAddCardFormSubmit(evt) {
  evt.preventDefault();
  const submitButton = evt.target.querySelector('.popup__button');
  const originalButtonText = submitButton.textContent;
  submitButton.textContent = 'Сохранение...';
  
  api.addCard(constants.addCardForm['place-name'].value, constants.addCardForm.link.value)
    .then((newCard) => {
      renderCard(newCard);
      closeModal(constants.addCardPopup);
      constants.addCardForm.reset();
    })
    .catch((err) => console.log(err))
    .finally(() => {
      submitButton.textContent = originalButtonText;
    });
}

function handleEditProfileButtonClick() {
  constants.editProfileForm.name.value = constants.profileName.textContent;
  constants.editProfileForm.description.value = constants.profileDescription.textContent;
  clearValidation(constants.editProfileForm, validationConfig);
  openModal(constants.editProfilePopup);
}

function handleAddCardButtonClick() {
  constants.addCardForm.reset();
  clearValidation(constants.addCardForm, validationConfig);
  openModal(constants.addCardPopup);
}

function handleAvatarFormSubmit(evt) {
  evt.preventDefault();
  const submitButton = evt.target.querySelector('.popup__button');
  const originalButtonText = submitButton.textContent;
  submitButton.textContent = 'Сохранение...';
  
  api.updateAvatar(constants.avatarForm.link.value)
    .then((userData) => {
      constants.profileAvatar.style.backgroundImage = `url(${userData.avatar})`;
      closeModal(constants.avatarPopup);
      constants.avatarForm.reset();
    })
    .catch((err) => console.log(err))
    .finally(() => {
      submitButton.textContent = originalButtonText;
    });
}

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, cards]) => {
    userId = userData._id;
    constants.profileName.textContent = userData.name;
    constants.profileDescription.textContent = userData.about;
    constants.profileAvatar.style.backgroundImage = `url(${userData.avatar})`;
    
    cards.forEach(renderCard);
  })
  .catch((err) => console.log(err));

constants.editProfileButton.addEventListener('click', handleEditProfileButtonClick);
constants.addCardButton.addEventListener('click', handleAddCardButtonClick);
constants.avatarButton.addEventListener('click', () => openModal(constants.avatarPopup));
constants.popups.forEach(setEventListeners);
constants.editProfileForm.addEventListener('submit', handleProfileFormSubmit);
constants.addCardForm.addEventListener('submit', handleAddCardFormSubmit);
constants.avatarForm.addEventListener('submit', handleAvatarFormSubmit);

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

enableValidation(validationConfig);