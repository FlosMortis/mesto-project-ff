import * as api from './api.js';

const cardTemplate = document.querySelector('#card-template');

export function createCard(cardData, deleteCardHandler, openImagePopup, likeCardHandler, userId) {
  const card = cardTemplate.content.cloneNode(true).querySelector('.card');
  const cardImage = card.querySelector('.card__image');
  const cardTitle = card.querySelector('.card__title');
  const likeButton = card.querySelector('.card__like-button');
  const deleteButton = card.querySelector('.card__delete-button');
  const likeCounter = card.querySelector('.card__like-counter');

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;
  likeCounter.textContent = cardData.likes.length;

  if (cardData.likes.some(like => like._id === userId)) {
    likeButton.classList.add('card__like-button_is-active');
  }

  if (cardData.owner._id !== userId) {
    deleteButton.style.display = 'none';
  }

  deleteButton.addEventListener('click', () => deleteCardHandler(card, cardData._id));
  cardImage.addEventListener('click', () => openImagePopup(cardData));
  likeButton.addEventListener('click', () => likeCardHandler(likeButton, cardData._id, likeCounter));

  return card;
}

export function handleDeleteCard(card, cardId) {
  api.deleteCard(cardId)
    .then(() => {
      card.remove();
    })
    .catch((err) => console.log(err));
}

export function handleLikeCard(likeButton, cardId, likeCounter) {
  const isLiked = likeButton.classList.contains('card__like-button_is-active');
  const apiMethod = isLiked ? api.unlikeCard : api.likeCard;

  apiMethod(cardId)
    .then((updatedCard) => {
      likeButton.classList.toggle('card__like-button_is-active');
      likeCounter.textContent = updatedCard.likes.length;
    })
    .catch((err) => console.log(err));
}