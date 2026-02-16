const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");

menuBtn.addEventListener("click", () => {
  mobileMenu.style.display =
    mobileMenu.style.display === "flex" ? "none" : "flex";
});
// ===== CAROUSEL QUEM SOMOS =====

const images = [
  "images/foto1.jpg",
  "images/foto2.jpg",
  "images/foto3.jpg",
  "images/foto4.jpg",
  "images/foto5.jpg"
];

let currentIndex = 0;
const dots = document.querySelectorAll(".dot");
const imageElement = document.getElementById("carousel-image");

function updateImage(){
  imageElement.src =images[currentIndex];
  dots.forEach(dot=> dot.classList.remove("active"));
  dots[currentIndex].classList.add("active");
}

// função que atualiza a imagem a cada 3 segundos
setInterval(()=>{
    currentIndex++;

    if(currentIndex>= images.length){
        currentIndex= 0;
    }

updateImage();


}, 3000);

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