// card.js
export function createCard(cardData, deleteCardHandler, openImagePopup) {
    const cardTemplate = document.querySelector('#card-template');
    const card = cardTemplate.content.cloneNode(true).querySelector('.card');
    const cardImage = card.querySelector('.card__image');
    const cardTitle = card.querySelector('.card__title');
    const likeButton = card.querySelector('.card__like-button');
  
    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;
    cardTitle.textContent = cardData.name;
  
    card.querySelector('.card__delete-button').addEventListener('click', () => deleteCardHandler(card));
    
    cardImage.addEventListener('click', () => openImagePopup(cardData));
    
    likeButton.addEventListener('click', () => {
      likeButton.classList.toggle('card__like-button_is-active');
    });
  
    return card;
  }
  
  export function handleDeleteCard(card) {
    card.remove();
  }