(()=>{"use strict";var e=document.querySelector("#card-template");function t(e){e.remove()}function n(e){e.classList.toggle("card__like-button_is-active")}function r(e){e.classList.add("popup_is-opened"),document.addEventListener("keydown",c)}function o(e){e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",c)}function c(e){if("Escape"===e.key){var t=document.querySelector(".popup_is-opened");t&&o(t)}}var a=document.querySelector(".places__list"),d=document.querySelector(".popup_type_edit"),i=document.querySelector(".popup_type_new-card"),u=document.querySelector(".popup_type_image"),p=document.querySelector(".profile__edit-button"),s=document.querySelector(".profile__add-button"),l=document.querySelector(".profile__title"),m=document.querySelector(".profile__description"),_=document.querySelectorAll(".popup"),f=document.forms["edit-profile"],v=document.forms["new-place"],y=u.querySelector(".popup__image"),k=u.querySelector(".popup__caption");function q(r){var o=function(t,n,r,o){var c=e.content.cloneNode(!0).querySelector(".card"),a=c.querySelector(".card__image"),d=c.querySelector(".card__title"),i=c.querySelector(".card__like-button");return a.src=t.link,a.alt=t.name,d.textContent=t.name,c.querySelector(".card__delete-button").addEventListener("click",(function(){return n(c)})),a.addEventListener("click",(function(){return r(t)})),i.addEventListener("click",(function(){return o(i)})),c}(r,t,S,n);a.prepend(o)}function S(e){y.src=e.link,y.alt=e.name,k.textContent=e.name,r(u)}[{name:"Архыз",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg"},{name:"Челябинская область",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg"},{name:"Иваново",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg"},{name:"Камчатка",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg"},{name:"Холмогорский район",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg"},{name:"Байкал",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg"}].forEach(q),p.addEventListener("click",(function(){f.name.value=l.textContent,f.description.value=m.textContent,r(d)})),s.addEventListener("click",(function(){r(i)})),_.forEach((function(e){e.addEventListener("click",(function(t){(t.target.classList.contains("popup__close")||t.target===e)&&o(e)}))})),f.addEventListener("submit",(function(e){e.preventDefault(),l.textContent=f.name.value,m.textContent=f.description.value,o(d)})),v.addEventListener("submit",(function(e){e.preventDefault(),q({name:v["place-name"].value,link:v.link.value}),o(i),v.reset()}))})();