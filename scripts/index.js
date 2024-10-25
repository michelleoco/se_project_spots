const initialCards = [
  {
    name: "Elephant portrait",
    link: "http://127.0.0.1:5500/images/1-elephant-portrait-photo-by-michelle-oconnell.jpg",
  },
  {
    name: "Elephants in the Okavango Delta",
    link: "http://127.0.0.1:5500/images/2-elephants-okavango-photo-by-michelle-oconnell.jpg",
  },
  {
    name: "Giraffes at a watering hole",
    link: "http://127.0.0.1:5500/images/3-giraffes-waterhole-photo-by-michelle-oconnell.jpg",
  },
  {
    name: "Oryx in Sossusvlei",
    link: "http://127.0.0.1:5500/images/4-oryx-photo-by-michelle-oconnell.jpg",
  },
  {
    name: "Zebras in the Etosha Pan",
    link: "http://127.0.0.1:5500/images/5-zebra-photo-by-michelle-oconnell.jpg",
  },
  {
    name: "Waterhole",
    link: "http://127.0.0.1:5500/images/6-waterhole-photo-by-michelle-oconnell.jpg",
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
