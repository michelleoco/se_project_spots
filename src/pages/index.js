import "../pages/index.css";
import {
  enableValidation,
  validationConfig,
  disableButton,
  resetValidation,
} from "../scripts/validation.js";
import Api from "../utils/Api.js";
import { setButtonText } from "../utils/helpers.js";

const initialCards = [
  {
    name: "Elephant portrait",
    link: "https://bit.ly/4hi1BNz",
    alt: "Elephant portrait by Michelle OConnell",
  },
  {
    name: "Elephants in the Okavango",
    link: "https://bit.ly/4fkQWQg",
    alt: "Elephants in the Okavango by Michelle OConnell",
  },
  {
    name: "Giraffes at watering hole",
    link: "https://bit.ly/3UoKrDX",
    alt: "Giraffes at a watering hole by Michelle OConnell",
  },
  {
    name: "Oryx in Sossusvlei",
    link: "https://bit.ly/4hi1vWd",
    alt: "Oryx in Sossusvlei by Michelle OConnell",
  },
  {
    name: "Zebras in Etosha",
    link: "http://bit.ly/3Ae2ciy",
    alt: "Zebras in the Etosha Pan by Michelle OConnell",
  },
  {
    name: "Namib Sand Sea",
    link: "https://bit.ly/3UqD4fj",
    alt: "Namib Sand Sea by Michelle OConnell",
  },
];

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "c042d777-2976-4407-8a75-e0207037192c",
    "Content-Type": "application/json",
  },
});

function setUserData(name, about) {
  profileName.textContent = name;
  profileDescription.textContent = about;
}

function setAvatar(avatar) {
  profileAvatar.src = avatar;
}

api
  .getAppInfo()
  .then(([cards, userData]) => {
    setUserData(userData.name, userData.about);
    setAvatar(userData.avatar);
    cards.forEach((item) => {
      const cardElement = getCardElement(item);
      cardsList.append(cardElement);
    });
  })
  .catch(console.error);

/* ----------------------------------------------------------------------------- */
/*                               Elements                                        */
/* ----------------------------------------------------------------------------- */
//Profile elements
const profileEditBtn = document.querySelector(".profile__edit-btn");
const cardModalBtn = document.querySelector(".profile__add-btn");
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const profileAvatar = document.querySelector(".profile__avatar");
const avatarModalBtn = document.querySelector(".profile__avatar-btn");

//Edit form elements
const editModal = document.querySelector("#edit-modal");
const editFormElement = document.forms["profile-form"];
const editModalCloseBtn = editModal.querySelector(".modal__close-btn");
const editModalNameInput = editModal.querySelector("#profile-name-input");
const editModalDescriptionInput = editModal.querySelector(
  "#profile-description-input"
);

//Card form elements
const cardModal = document.querySelector("#add-card-modal");
const cardForm = document.forms["add-card-form"];
const cardSubmitBtn = cardModal.querySelector(".modal__submit");
const cardModalCloseBtn = cardModal.querySelector(".modal__close-btn");
const cardLinkInput = cardModal.querySelector("#image-link-input");
const cardCaptionInput = cardModal.querySelector("#caption-input");

//Card related elements
const cardTemplate = document.querySelector("#card-template");
const cardsList = document.querySelector(".cards__list");

//Avatar form elements
const avatarModal = document.querySelector("#avatar-modal");
const avatarForm = document.forms["edit-avatar-form"];
const avatarModalCloseBtn = avatarModal.querySelector(".modal__close-btn");
const avatarInput = avatarModal.querySelector("#profile-avatar-input");

//Delete form elements
const deleteModal = document.querySelector("#delete-modal");
const deleteForm = document.forms["delete-form"];
const deleteModalDeleteBtn = deleteModal.querySelector(".modal__delete");
const deleteModalCancelBtn = deleteModal.querySelector(".modal__cancel");
const deleteModalCloseBtn = deleteModal.querySelector(".modal__close-btn");

//Preview image popup elements
const previewModal = document.querySelector("#preview-modal");
const previewModalImageEl = previewModal.querySelector(".modal__image-preview");
const previewModalCaptionEl = previewModal.querySelector(".modal__caption");
const previewModalCloseBtn = previewModal.querySelector(
  ".modal__close-btn_type_preview"
);

// Declares variables to store the current selected
// card and its ID. Values will be assigned when a delete icon is clicked
let selectedCard, selectedCardId;

/* ----------------------------------------------------------------------------- */
/*                               Functions                                       */
/* ----------------------------------------------------------------------------- */

function openModal(modal) {
  modal.classList.add("modal_opened"); //This adds the class "modal_opened"
  document.addEventListener("mousedown", handleCloseOverlay); //This calls the handleCloseOverlay function written below. Must have add & remove
  document.addEventListener("keydown", handleEscKeyPress); //This calls the handleEscKeyPress function written below. Must have add & remove
}

function closeModal(modal) {
  modal.classList.remove("modal_opened"); //This removes the class "modal_opened"
  document.removeEventListener("mousedown", handleCloseOverlay);
  document.removeEventListener("keydown", handleEscKeyPress);
}

function getCardElement(data) {
  //pass data here
  const cardElement = cardTemplate.content
    .querySelector(".card")
    .cloneNode(true); //Creates a clone for manipulation. Hard code stays in tact
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardNameEl = cardElement.querySelector(".card__title");
  const cardLikeBtn = cardElement.querySelector(".card__like-btn");
  const cardDeleteBtn = cardElement.querySelector(".card__delete-btn");

  //Defines what elements will be changed by what inputs
  cardNameEl.textContent = data.name;
  cardImageEl.src = data.link;
  cardImageEl.alt = data.name;

  cardLikeBtn.classList.remove("card__like-btn_liked");

  if (data.isLiked) {
    cardLikeBtn.classList.add("card__like-btn_liked");
  }

  cardLikeBtn.addEventListener("click", (evt) => handleLike(evt, data._id));
  console.log(cardLikeBtn);

  cardDeleteBtn.addEventListener("click", () => {
    handleDeleteCard(cardElement, data);
  });

  //When it hears a "click", it opens the previewModal with image, description text, and alt text
  cardImageEl.addEventListener("click", () => {
    openModal(previewModal);
    previewModalCaptionEl.textContent = data.name;
    previewModalImageEl.src = data.link;
    previewModalImageEl.alt = data.name;
  });

  return cardElement; //"Provides" the new card element
}

/*  --------------------------------- Handlers ------------------------------------- */

function handleLike(evt, id) {
  const isLiked = evt.target.classList.contains("card__like-btn_liked");
  api
    .changeLikeStatus(id, isLiked)
    .then(() => {
      evt.target.classList.toggle("card__like-btn_liked");
    })
    .catch(console.error);
}

//If there is a modal open (a target event that contains modal_open), close it.
function handleCloseOverlay(evt) {
  if (evt.target.classList.contains("modal_opened")) {
    closeModal(evt.target);
  }
}

function handleEscKeyPress(evt) {
  if (evt.key === "Escape") {
    const openedModal = document.querySelector(".modal_opened");
    if (openedModal) {
      closeModal(openedModal);
    }
  }
}

function handleEditFormSubmit(evt) {
  evt.preventDefault();

  const cardSubmitBtn = evt.submitter;
  setButtonText(cardSubmitBtn, true);

  api
    .editUserInfo({
      name: editModalNameInput.value,
      about: editModalDescriptionInput.value,
    })
    .then((data) => {
      setUserData(data.name, data.about);
      closeModal(editModal);
    })
    .catch(console.error)
    .finally(() => {
      setButtonText(cardSubmitBtn, false);
    });
}

function handleAvatarSubmit(evt) {
  evt.preventDefault();

  const avatarSubmitBtn = evt.submitter;
  setButtonText(avatarSubmitBtn, true);

  api
    .editAvatarInfo(avatarInput.value)
    .then((data) => {
      setAvatar(data.avatar);
      closeModal(avatarModal);
    })
    .catch(console.error)
    .finally(() => {
      setButtonText(cardSubmitBtn, false);
    });
}

function handleCardFormSubmit(evt) {
  evt.preventDefault();
  const inputValues = {
    name: cardCaptionInput.value,
    link: cardLinkInput.value,
  };

  const cardSubmitBtn = evt.submitter;
  setButtonText(cardSubmitBtn, true);

  api
    .createCard(inputValues)
    .then((data) => {
      const cardElement = getCardElement(data);
      cardsList.prepend(cardElement);
      evt.target.reset(); //there's a target element and calling a JS fuction on it .reset()// creating a template that will be defined when the function gets called
      disableButton(cardSubmitBtn, validationConfig); //updated with validationConfig
      closeModal(cardModal);
    })
    .catch(console.error)
    .finally(() => {
      setButtonText(cardSubmitBtn, false);
    });
}

function handleDeleteCard(cardElement, card) {
  selectedCard = cardElement;
  selectedCardId = card._id;
  openModal(deleteModal);
}

function handleDeleteFormSubmit(evt) {
  evt.preventDefault();

  const deleteModalDeleteBtn = evt.submitter;
  setButtonText(deleteModalDeleteBtn, true, "Delete", "Deleting...");

  api
    .deleteCard(selectedCardId)
    .then(() => {
      selectedCard.remove();
      closeModal(deleteModal);
    })
    .catch(console.error)
    .finally(() => {
      setButtonText(deleteModalDeleteBtn, false, "Delete", "Deleting...");
    });
}

/* ----------------------------------------------------------------------------- */
/*                               Event Listeners                                 */
/* ----------------------------------------------------------------------------- */

profileEditBtn.addEventListener("click", () => {
  editModalNameInput.value = profileName.textContent;
  editModalDescriptionInput.value = profileDescription.textContent;

  resetValidation(
    editFormElement,
    [editModalNameInput, editModalDescriptionInput],
    validationConfig
  );
  openModal(editModal);
});

editModalCloseBtn.addEventListener("click", () => {
  closeModal(editModal);
});

cardModalBtn.addEventListener("click", () => {
  openModal(cardModal);
});

cardModalCloseBtn.addEventListener("click", () => {
  closeModal(cardModal);
});

previewModalCloseBtn.addEventListener("click", () => {
  closeModal(previewModal);
});

avatarModalBtn.addEventListener("click", () => {
  openModal(avatarModal);
});

avatarModalCloseBtn.addEventListener("click", () => {
  closeModal(avatarModal);
});

deleteModalCancelBtn.addEventListener("click", () => {
  closeModal(deleteModal);
});

deleteModalCloseBtn.addEventListener("click", () => {
  closeModal(deleteModal);
});

avatarForm.addEventListener("submit", handleAvatarSubmit);

editFormElement.addEventListener("submit", handleEditFormSubmit);

cardForm.addEventListener("submit", handleCardFormSubmit);

deleteForm.addEventListener("submit", handleDeleteFormSubmit);

enableValidation(validationConfig);
