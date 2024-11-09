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
const profileEditBtn = document.querySelector(".profile__edit-btn");
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const cardModalBtn = document.querySelector(".profile__add-btn");
const editModal = document.querySelector("#edit-modal");
const editFormElement = editModal.querySelector(".modal__form");
const editModalCloseBtn = editModal.querySelector(".modal__close-btn");
const editModalNameInput = editModal.querySelector("#profile-name-input");
const editModalDescriptionInput = editModal.querySelector(
  "#profile-description-input"
);
const cardModal = document.querySelector("#add-card-modal");
const cardForm = cardModal.querySelector(".modal__form");
const cardModalClosebtn = cardModal.querySelector(".modal__close-btn");
const cardLinkInput = cardModal.querySelector("#image-link-input");
const cardCaptionInput = cardModal.querySelector("#caption-input");
const cardTemplate = document.querySelector("#card-template");
const cardsList = document.querySelector(".cards__list");

/* ----------------------------------------------------------------------------- */
/*                               Functions                                       */
/* ----------------------------------------------------------------------------- */
function openModal(modal) {
  modal.classList.add("modal__opened");
}

function closeModal(modal) {
  modal.classList.remove("modal__opened");
}

function getCardElement(data) {
  const cardElement = cardTemplate.content
    .querySelector(".card")
    .cloneNode(true);
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardNameEl = cardElement.querySelector(".card__title");
  const cardLikeBtn = cardElement.querySelector(".card__like-btn");
  const cardDeleteBtn = cardElement.querySelector(".card__delete-btn");

  cardImageEl.addEventListener("click", () => {
    modalImagePreview.src = cardData.link;
    modalImagePreview.alt = cardData.name;
    modalImageCaption.textContent = cardData.name;

    openModal(imageModal);
  });

  cardNameEl.textContent = data.name;
  cardImageEl.src = data.link;
  cardImageEl.alt = data.name;

  cardLikeBtn.addEventListener("click", () => {
    cardLikeBtn.classList.toggle("card__like-btn_liked");
  });

  cardDeleteBtn.addEventListener("click", () => {
    cardElement.remove();
  });
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
  closeModal(cardModal);
}

/* ----------------------------------------------------------------------------- */
/*                               Event Listeners                                 */
/* ----------------------------------------------------------------------------- */
profileEditBtn.addEventListener("click", () => {
  editModalNameInput.value = profileName.textContent;
  editModalDescriptionInput.value = profileDescription.textContent;
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

//Initial array of cards
initialCards.forEach((item) => {
  const cardElement = getCardElement(item);
  cardsList.append(cardElement);
});
