const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");
const closemenu = document.getElementById("closeMenu");
const menuLinks = document.querySelectorAll(".mobile-menu a");

menuBtn.addEventListener("click", () => {
  mobileMenu.style.display =
    mobileMenu.classList.toggle("active");
    menuBtn.classList.toggle("active");
});

closemenu.addEventListener("click", ()=>{
  mobileMenu.classList.remove("active");
})

menuLinks.forEach(function(link) {
    link.addEventListener("click", function() {
        
        setTimeout(function() {
            mobileMenu.classList.remove("active");
            menuBtn.classList.remove("active");
        }, 500); // 500 milissegundos = 0.5s

    });
});


// funcao abrir no wpp com mensagem automatica
function abrirWpp() {
  window.open("https://wa.me/5521998761020?text=Olá,%20vim%20pelo%20site%20e%20quero%20um%20orçamento.", "_blank");
};
// ir para parte de avaliações

function irParaAvaliacoes() {
  document.getElementById("avaliacoes").scrollIntoView({
    behavior: "smooth"
  });
}
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

currentIndex = (currentIndex + 1) % images.length;
updateImage();
}
//SLIDE ANTERIOR
function prevSlide() {

currentIndex = (currentIndex - 1 + images.length) % images.length;

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

const nx2Track = document.querySelector(".nx2-carousel-track");
const nx2Slides = document.querySelectorAll(".nx2-slide");
const nx2DotsContainer = document.querySelector(".nx2-dots");

let nx2Index = 0;
let nx2StartX = 0;
let nx2CurrentTranslate = 0;
let nx2PrevTranslate = 0;
let nx2Dragging = false;
let nx2AnimationID;
let nx2AutoSlide;

/* ===== CRIAR DOTS ===== */

nx2Slides.forEach((_, index) => {
  const dot = document.createElement("span");
  if (index === 0) dot.classList.add("active");

  dot.addEventListener("click", () => {
    nx2Index = index;
    updateNx2Slide();
    resetNx2Auto();
  });

  nx2DotsContainer.appendChild(dot);
});

const nx2Dots = document.querySelectorAll(".nx2-dots span");

/* ===== FUNÇÃO ATUALIZAR ===== */

function updateNx2Slide() {
  nx2Track.style.transition = "transform 0.4s ease";
  nx2Track.style.transform = `translateX(-${nx2Index * 100}%)`;

  nx2Slides.forEach(slide => slide.classList.remove("active"));
  nx2Slides[nx2Index].classList.add("active");

  nx2Dots.forEach(dot => dot.classList.remove("active"));
  nx2Dots[nx2Index].classList.add("active");

  nx2PrevTranslate = -nx2Index * nx2Track.offsetWidth;
}

/* ===== LOOP INFINITO ===== */

function nextNx2Slide() {
  nx2Index++;
  if (nx2Index >= nx2Slides.length) nx2Index = 0;
  updateNx2Slide();
}

function prevNx2Slide() {
  nx2Index--;
  if (nx2Index < 0) nx2Index = nx2Slides.length - 1;
  updateNx2Slide();
}

/* ===== AUTOPLAY ===== */

function startNx2Auto() {
  nx2AutoSlide = setInterval(nextNx2Slide, 4000);
}

function resetNx2Auto() {
  clearInterval(nx2AutoSlide);
  startNx2Auto();
}

startNx2Auto();

/* ===== TOUCH SINCRONIZADO ===== */

nx2Track.addEventListener("touchstart", (e) => {
  clearInterval(nx2AutoSlide);
  nx2Dragging = true;
  nx2StartX = e.touches[0].clientX;
  nx2AnimationID = requestAnimationFrame(nx2Animation);
});

nx2Track.addEventListener("touchmove", (e) => {
  if (!nx2Dragging) return;
  const currentPosition = e.touches[0].clientX;
  nx2CurrentTranslate = nx2PrevTranslate + currentPosition - nx2StartX;
});

nx2Track.addEventListener("touchend", () => {
  cancelAnimationFrame(nx2AnimationID);
  nx2Dragging = false;

  const movedBy = nx2CurrentTranslate - nx2PrevTranslate;

  if (movedBy < -100) nextNx2Slide();
  else if (movedBy > 100) prevNx2Slide();
  else updateNx2Slide();

  resetNx2Auto();
});

function nx2Animation() {
  nx2Track.style.transition = "none";
  nx2Track.style.transform = `translateX(${nx2CurrentTranslate}px)`;
  if (nx2Dragging) requestAnimationFrame(nx2Animation);
}

/* ===== INICIAR PRIMEIRO ATIVO ===== */

nx2Slides[0].classList.add("active");


