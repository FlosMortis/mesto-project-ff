// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

import { initialCards } from './cards.js';

const cardTemplate = document.querySelector('#card-template');
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

function handleDeleteCard(card) {
  card.remove();
}

function createCard(cardData, deleteCardHandler) {
  const card = cardTemplate.content.cloneNode(true).querySelector('.card');
  const cardImage = card.querySelector('.card__image');
  const cardTitle = card.querySelector('.card__title');
  const likeButton = card.querySelector('.card__like-button');

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;

  card.querySelector('.card__delete-button').addEventListener('click', () => deleteCardHandler(card));
  
  cardImage.addEventListener('click', () => openPopup(imagePopup, cardData));
  
  likeButton.addEventListener('click', () => {
    likeButton.classList.toggle('card__like-button_is-active');
  });

  return card;
}

function renderCard(cardData) {
  cardsList.prepend(createCard(cardData, handleDeleteCard));
}

function openPopup(popup, data = null) {
  if (popup === imagePopup && data) {
    popupImage.src = data.link;
    popupImage.alt = data.name;
    popupCaption.textContent = data.name;
  }
  if (popup === editProfilePopup) {
    editProfileForm.name.value = profileName.textContent;
    editProfileForm.description.value = profileDescription.textContent;
  }
  popup.classList.add('popup_is-opened');
}

function closePopup(popup) {
  popup.classList.remove('popup_is-opened');
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = editProfileForm.name.value;
  profileDescription.textContent = editProfileForm.description.value;
  closePopup(editProfilePopup);
}

function handleAddCardFormSubmit(evt) {
  evt.preventDefault();
  renderCard({
    name: addCardForm['place-name'].value,
    link: addCardForm.link.value
  });
  closePopup(addCardPopup);
  addCardForm.reset();
}

initialCards.forEach(renderCard);

editProfileButton.addEventListener('click', () => openPopup(editProfilePopup));
addCardButton.addEventListener('click', () => openPopup(addCardPopup));

popups.forEach(popup => {
  popup.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup__close') || evt.target === popup) {
      closePopup(popup);
    }
  });
});

editProfileForm.addEventListener('submit', handleProfileFormSubmit);
addCardForm.addEventListener('submit', handleAddCardFormSubmit);
