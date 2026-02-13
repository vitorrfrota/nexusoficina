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