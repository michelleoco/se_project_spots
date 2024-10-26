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

const profileEditButton = document.querySelector(".profile__edit-btn");
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");

const editModal = document.querySelector("#edit-modal");
const editFormElement = editModal.querySelector(".modal__form");
const editModalCloseBtn = editModal.querySelector(".modal__close-btn");
const editModalNameInput = editModal.querySelector("#profile-name-input");
const editModalDescriptionInput = editModal.querySelector(
  "#profile-description-input"
);

const cardTemplate = document.querySelector("#card-template");
const cardsList = document.querySelector(".cards__list");

function getCardElement(data) {
  const cardElement = cardTemplate.content
    .querySelector(".card")
    .cloneNode(true);

  const cardNameEl = cardElement.querySelector(".card__title");
  const cardImageEl = cardElement.querySelector(".card__image");
  // select the image element

  cardNameEl.textContent = data.name;
  cardImageEl.src = data.link;
  cardImageEl.alt = data.alt;
  // assign values to the image src and alt

  return cardElement;
}

function openModal() {
  editModalNameInput.value = profileName.textContent;
  editModalDescriptionInput.value = profileDescription.textContent;
  editModal.classList.add("modal_opened");
}

function closeModal() {
  editModal.classList.remove("modal_opened");
}

function handleEditFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = editModalNameInput.value;
  profileDescription.textContent = editModalDescriptionInput.value;
  closeModal();
}

profileEditButton.addEventListener("click", openModal);
editModalCloseBtn.addEventListener("click", closeModal);
editFormElement.addEventListener("submit", handleEditFormSubmit);

for (let i = 0; i < initialCards.length; i++) {
  const cardElement = getCardElement(initialCards[i]);
  cardsList.append(cardElement);
}
