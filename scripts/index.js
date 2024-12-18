const initialCards = [
  {
    name: "Elephant portrait",
    link: "http://127.0.0.1:5500/images/1-elephant-portrait-photo-by-michelle-oconnell.jpg",
    alt: "Elephant portrait by Michelle OConnell",
  },
  {
    name: "Elephants in the Okavango Delta",
    link: "http://127.0.0.1:5500/images/2-elephants-okavango-photo-by-michelle-oconnell.jpg",
    alt: "Elephants in the Okavango Delta by Michelle OConnell",
  },
  {
    name: "Giraffes at a watering hole",
    link: "http://127.0.0.1:5500/images/3-giraffes-waterhole-photo-by-michelle-oconnell.jpg",
    alt: "Giraffes at a watering hole by Michelle OConnell",
  },
  {
    name: "Oryx in Sossusvlei",
    link: "http://127.0.0.1:5500/images/4-oryx-photo-by-michelle-oconnell.jpg",
    alt: "Oryx in Sossusvlei by Michelle OConnell",
  },
  {
    name: "Zebras in the Etosha Pan",
    link: "http://127.0.0.1:5500/images/5-zebra-photo-by-michelle-oconnell.jpg",
    alt: "Zebras in the Etosha Pan by Michelle OConnell",
  },
  {
    name: "Waterhole",
    link: "http://127.0.0.1:5500/images/6-waterhole-photo-by-michelle-oconnell.jpg",
    alt: "Waterhole by Michelle OConnell",
  },
];

/* ----------------------------------------------------------------------------- */
/*                               Elements                                        */
/* ----------------------------------------------------------------------------- */
// Constants:
const profileEditBtn = document.querySelector(".profile__edit-btn");
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const editModal = document.querySelector("#edit-modal");
const editFormElement = document.forms["profile-form"]; //Why brackets?
const editModalCloseBtn = editModal.querySelector(".modal__close-btn");
const editModalNameInput = editModal.querySelector("#profile-name-input");
const editModalDescriptionInput = editModal.querySelector(
  "#profile-description-input"
);
const cardModalBtn = document.querySelector(".profile__add-btn");
const cardModal = document.querySelector("#add-card-modal");
const cardForm = document.forms["add-card-form"]; //Why brackets?
const cardSubmitBtn = cardModal.querySelector(".modal__submit");
const cardModalClosebtn = cardModal.querySelector(".modal__close-btn");
const cardLinkInput = cardModal.querySelector("#image-link-input");
const cardCaptionInput = cardModal.querySelector("#caption-input");
const cardTemplate = document.querySelector("#card-template");
const cardsList = document.querySelector(".cards__list");

const previewModal = document.querySelector("#preview-modal");
const previewModalImageEl = previewModal.querySelector(".modal__image-preview");
const previewModalCaptionEl = previewModal.querySelector(".modal__caption");
const previewModalClosebtn = previewModal.querySelector(
  ".modal__close-btn_type_preview"
);

/* ----------------------------------------------------------------------------- */
/*                               Functions                                       */
/* ----------------------------------------------------------------------------- */

function openModal(modal) {
  modal.classList.add("modal_opened"); //This adds the class "modal_opened". ??
  document.addEventListener("mousedown", handleCloseOverlay); //This calls the handleCloseOverlay function written below. Must have add & remove.
  document.addEventListener("keydown", handleEscKeyPress); //This calls the handleEscKeyPress function written below. Must have add & remove.
}

function closeModal(modal) {
  modal.classList.remove("modal_opened"); //This removes the class "modal_opened". ??
  document.removeEventListener("mosedown", handleCloseOverlay);
  document.removeEventListener("keydown", handleEscKeyPress);
}

//Creates the function handleCloseOverlay. It says, if there is a modal open (a target event that contains modal_open), close it. ??
function handleCloseOverlay(evt) {
  if (evt.target.classList.contains("modal_opened")) {
    closeModal(evt.target);
  }
}

//Creates the function handleEscKeyPress. It says, if the key event is ESC, look for the open modal, and if the modal is open, close it.
function handleEscKeyPress(evt) {
  if (evt.key === "Escape") {
    const openedModal = document.querySelector(".modal_opened"); //Tells only close the opened modal.
    if (openedModal) {
      closeModal(openedModal);
    }
  }
}

//Creates the function getCardElement. It says... ??
function getCardElement(data) {
  const cardElement = cardTemplate.content
    .querySelector(".card")
    .cloneNode(true); //Creates a copy (clone) for manipulation. Hard code stays in tact.
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardNameEl = cardElement.querySelector(".card__title");
  const cardLikeBtn = cardElement.querySelector(".card__like-btn");
  const cardDeleteBtn = cardElement.querySelector(".card__delete-btn");

  //Defines what elements will be changed by what inputs.
  cardNameEl.textContent = data.name;
  cardImageEl.src = data.link;
  cardImageEl.alt = data.name;

  cardLikeBtn.classList.remove("card__like-btn_liked"); //What is this doing ??

  //Listens for a "click" on the cardLikeBtn. When it hears a "click", it toggles the button on and off.
  cardLikeBtn.addEventListener("click", () => {
    cardLikeBtn.classList.toggle("card__like-btn_liked");
  });

  //Listens for a "click" on the cardDeleteBtn. When it hears a "click", it removes the card.
  cardDeleteBtn.addEventListener("click", () => {
    cardElement.remove();
  });

  //Listens for a "click" on the cardImageEl. When it hears a "click", it opens the previewModal with image, description text, and alt text.
  cardImageEl.addEventListener("click", () => {
    openModal(previewModal);
    previewModalCaptionEl.textContent = data.name;
    previewModalImageEl.src = data.link;
    previewModalImageEl.alt = data.name;
  });

  return cardElement; //Why do we need to return? Revisit!
}

/* ----------------------------------------------------------------------------- */
/*                                  Handlers                                     */
/* ----------------------------------------------------------------------------- */

function handleEditFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = editModalNameInput.value;
  profileDescription.textContent = editModalDescriptionInput.value;
  closeModal(editModal);
}

//Add new card
function handleCardFormSubmit(evt) {
  evt.preventDefault();
  const inputValues = {
    name: cardCaptionInput.value,
    link: cardLinkInput.value,
  };
  const cardElement = getCardElement(inputValues);
  cardsList.prepend(cardElement);
  evt.target.reset();
  disableButton(cardSubmitBtn, settings);
  closeModal(cardModal);
}

/* ----------------------------------------------------------------------------- */
/*                               Event Listeners                                 */
/* ----------------------------------------------------------------------------- */
profileEditBtn.addEventListener("click", () => {
  editModalNameInput.value = profileName.textContent;
  editModalDescriptionInput.value = profileDescription.textContent;

  //Optional
  resetValidation(
    editFormElement,
    [editModalNameInput, editModalDescriptionInput],
    settings
  );

  openModal(editModal);
});

editModalCloseBtn.addEventListener("click", () => {
  closeModal(editModal);
});

cardModalBtn.addEventListener("click", () => {
  openModal(cardModal);
});

cardModalClosebtn.addEventListener("click", () => {
  closeModal(cardModal);
});

editFormElement.addEventListener("submit", handleEditFormSubmit);

cardForm.addEventListener("submit", handleCardFormSubmit);

previewModalClosebtn.addEventListener("click", () => {
  closeModal(previewModal);
});

//Initial array of cards
initialCards.forEach((item) => {
  const cardElement = getCardElement(item); //This is where getCardElement is called
  cardsList.append(cardElement);
});
