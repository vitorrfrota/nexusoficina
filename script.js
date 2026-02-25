const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");

menuBtn.addEventListener("click", () => {
  mobileMenu.style.display =
    mobileMenu.style.display === "flex" ? "none" : "flex";
});
// ===== CAROUSEL QUEM SOMOS =====

//IMAGENS DO ARRAY
const images = [
  "images/foto1.jpg",
  "images/foto2.jpg",
  "images/foto3.jpg",
  "images/foto4.jpg",
  "images/foto5.jpg"
];

//ESTADO
let autoPlayActive = true;
let currentIndex = 0;

//ELEMENTOS
const dots = document.querySelectorAll(".dot");
const imageElement = document.getElementById("carousel-image");
const container = document.querySelector(".container");

//FUNÇÃO PARA ATUALIZAR IMAGEM + DOT
function updateImage(){
  imageElement.src =images[currentIndex];
  dots.forEach(dot=> dot.classList.remove("active"));
  dots[currentIndex].classList.add("active");
}

//PRÓXIMO SLIDE
function nextSlide() {
currentIndex++;
if (currentIndex>=imageElement.length){
  currentIndex= 0;
}
updateImage();
}
//SLIDE ANTERIOR
function prevSlide() {
currentIndex--;
if (currentIndex < 0){
  currentIndex = imageElement.length - 1;
}
updateImage();
}


// função que atualiza a imagem a cada 3 segundos
let autoPlay = setInterval(nextSlide, 3000);

//TOUCH AUTOPLAY (ESQUERDA/DIREITA)
container.addEventListener("touchstart", function(event){
  //desativa autoplay no primeiro toque
  if (autoPlayActive) {
    clearInterval(autoPlay);
    autoPlayActive = false;
  }

const largura= container.offsetWidth;
const toqueX= event.touches[0].clientX - container.getBoundingClientRect().left;

if (toqueX < largura / 2) {
  prevSlide();
  } else {
    nextSlide();
  }
  

});



//CARROSSEL AVALIAÇÕES

document.addEventListener("DOMContentLoaded", () => {

  const track = document.querySelector(".carousel-track");
  const slides = document.querySelectorAll(".review-slide");

  let currentIndex = 0;
  let interval;

  function updateCarousel() {
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
  }

  function nextSlide() {
    currentIndex++;
    if (currentIndex >= slides.length) {
      currentIndex = 0;
    }
    updateCarousel();
  }

  function startCarousel() {
    interval = setInterval(nextSlide, 4000);
  }

  function stopCarousel() {
    clearInterval(interval);
  }

  // Pausa ao passar o mouse (desktop)
  track.addEventListener("mouseenter", stopCarousel);
  track.addEventListener("mouseleave", startCarousel);

  // Pausa ao tocar (mobile)
  track.addEventListener("touchstart", stopCarousel);
  track.addEventListener("touchend", startCarousel);

  startCarousel();

});