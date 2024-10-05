import { clearValidation } from './validation.js';

export function openModal(popup) {
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', handleEscClose);
}

export function closeModal(popup) {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', handleEscClose);
}

function handleEscClose(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_is-opened');
    if (openedPopup) {
      closeModal(openedPopup);
    }
  }
}

export function setEventListeners(popup) {
  popup.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup__close') || evt.target === popup) {
      closeModal(popup);
    }
  });
}