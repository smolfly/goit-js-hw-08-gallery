// Разбей задание на несколько подзадач:

// Создание и рендер разметки по массиву данных и предоставленному шаблону.
// Реализация делегирования на галерее ul.js-gallery и получение url большого изображения.
// Открытие модального окна по клику на элементе галереи.
// Подмена значения атрибута src элемента img.lightbox__image.
// Закрытие модального окна по клику на кнопку button[data-action="close-lightbox"].
// Очистка значения атрибута src элемента img.lightbox__image. 
// Это необходимо для того, чтобы при следующем открытии модального окна, пока грузится изображение, мы не видели предыдущее.

// Ссылка на оригинальное изображение должна храниться в data - атрибуте source на элементе img,
// и указываться в href ссылки(это необходимо для доступности).

// <li class="gallery__item">
//   <a
//     class="gallery__link"
//     href="https://cdn.pixabay.com/photo/2010/12/13/10/13/tulips-2546_1280.jpg"
//   >
//     <img
//       class="gallery__image"
//       src="https://cdn.pixabay.com/photo/2010/12/13/10/13/tulips-2546__340.jpg"
//       data-source="https://cdn.pixabay.com/photo/2010/12/13/10/13/tulips-2546_1280.jpg"
//       alt="Tulips"
//     />
//   </a>
// </li>

import images from "./gallery-items.js";

const gallerylistElements = document.querySelector(".gallery");


const array = [];
images.forEach(image => {
    const itemElement = document.createElement('li');
    itemElement.classList.add("gallery__item");

    itemElement.insertAdjacentHTML(
        "beforeend",
        `<a
    class="gallery__link"
    href='${image.original}'>
    <img
      class="gallery__image"
      src='${image.preview}'
      data-source='${image.original}'
      alt='${image.description}'
    />
    </a>`
    );
    array.push(itemElement);
});

gallerylistElements.append(...array)

const lightBoxEl = document.querySelector(".lightbox");
const lightBoxImage = document.querySelector(".lightbox__image");
const lightBoxButton = document.querySelector(".lightbox__button");
const overlayEl = document.querySelector(".lightbox__overlay");

function clickImages(event) {
  event.preventDefault();
  const imageRef = event.target;

  if (imageRef.nodeName !== "IMG") {
    return;
  }
  openModal(imageRef);
  lightBoxImage.src = imageRef.dataset.source;
}
function openModal() {
  lightBoxEl.classList.add("is-open");
}

function closeModal() {
  lightBoxEl.classList.remove("is-open");
  lightBoxImage.src = " ";
}

overlayEl.addEventListener("click", overlayClicking);
function overlayClicking(event) {
  if (event.target.nodeName !== "IMG") {
    closeModal();
  }
}

function closeImages(event) {
  if (event.code === "Escape") {
    closeModal();
  }
}

gallerylistElements.addEventListener("click", clickImages);
lightBoxButton.addEventListener("click", closeModal);
gallerylistElements.addEventListener("keydown", closeImages);