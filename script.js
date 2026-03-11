/* =================================
MENU MOBILE
================================= */

const menuBtn = document.getElementById("menuBtn")
const mobileMenu = document.getElementById("mobileMenu")
const closeMenu = document.getElementById("closeMenu")
const menuLinks = document.querySelectorAll(".mobile-menu a")

menuBtn.addEventListener("click", () => {

mobileMenu.classList.toggle("active")
menuBtn.classList.toggle("active")

})

closeMenu.addEventListener("click", () => {

mobileMenu.classList.remove("active")
menuBtn.classList.remove("active")

})

menuLinks.forEach(link => {

link.addEventListener("click", () => {

setTimeout(()=>{

mobileMenu.classList.remove("active")
menuBtn.classList.remove("active")

},400)

})

})


/* =================================
WHATSAPP
================================= */

function abrirWpp(){

window.open(
"https://wa.me/5521998761020?text=Olá,%20vim%20pelo%20site%20e%20quero%20um%20orçamento.",
"_blank"
)

}


/* =================================
SCROLL PARA AVALIAÇÕES
================================= */

function irParaAvaliacoes(){

document.getElementById("avaliacoes").scrollIntoView({

behavior:"smooth"

})

}



/* =================================
CARROSSEL HERO
================================= */

const heroSlides = document.querySelectorAll(".slidee")
const heroDots = document.querySelectorAll(".dott")

let heroIndex = 0
let heroIntervalTime = 4000
let heroInterval = setInterval(nextHeroSlide, heroIntervalTime)


function showHeroSlide(index){

heroSlides.forEach(slide => slide.classList.remove("activee"))
heroDots.forEach(dot => dot.classList.remove("activee"))

heroSlides[index].classList.add("activee")
heroDots[index].classList.add("activee")

heroIndex = index

}


function nextHeroSlide(){

heroIndex++

if(heroIndex >= heroSlides.length){
heroIndex = 0
}

showHeroSlide(heroIndex)

}


function prevHeroSlide(){

heroIndex--

if(heroIndex < 0){
heroIndex = heroSlides.length - 1
}

showHeroSlide(heroIndex)

}


heroDots.forEach(dot => {

dot.addEventListener("click", e => {

const index = Number(e.target.dataset.index)

showHeroSlide(index)

resetHeroInterval()

})

})


heroSlides.forEach(slide => {

slide.addEventListener("click", e => {

const width = slide.clientWidth
const clickX = e.offsetX

if(clickX < width / 2){
prevHeroSlide()
}else{
nextHeroSlide()
}

resetHeroInterval()

})

})


function resetHeroInterval(){

clearInterval(heroInterval)

heroInterval = setInterval(nextHeroSlide, heroIntervalTime)

}



/* =================================
CARROSSEL QUEM SOMOS
================================= */

const aboutImages = [

"images/foto1.jpg",
"images/foto2.jpg",
"images/foto3.jpg",
"images/foto4.jpg",
"images/foto5.jpg"

]

const aboutImage = document.getElementById("carousel-image")
const aboutDots = document.querySelectorAll(".dot")
const aboutContainer = document.querySelector(".carousel-container")

let aboutIndex = 0


function updateAboutSlide(){

aboutImage.src = aboutImages[aboutIndex]

aboutDots.forEach(dot => dot.classList.remove("active"))

aboutDots[aboutIndex].classList.add("active")

}


function nextAboutSlide(){

aboutIndex = (aboutIndex + 1) % aboutImages.length

updateAboutSlide()

}


function prevAboutSlide(){

aboutIndex = (aboutIndex - 1 + aboutImages.length) % aboutImages.length

updateAboutSlide()

}


let aboutAutoPlay = setInterval(nextAboutSlide,3000)


aboutContainer.addEventListener("touchstart", e => {

clearInterval(aboutAutoPlay)

const largura = aboutContainer.offsetWidth

const toqueX = e.touches[0].clientX - aboutContainer.getBoundingClientRect().left

if(toqueX < largura / 2){
prevAboutSlide()
}else{
nextAboutSlide()
}

})


aboutDots.forEach((dot,index)=>{

dot.addEventListener("click",()=>{

aboutIndex=index

updateAboutSlide()

})

})



/* =================================
CARROSSEL AVALIAÇÕES
================================= */

const reviewTrack = document.querySelector(".nx2-carousel-track")
const reviewSlides = document.querySelectorAll(".nx2-slide")
const reviewDotsContainer = document.querySelector(".nx2-dots")

let reviewIndex = 0
let startX = 0
let currentTranslate = 0
let prevTranslate = 0
let dragging = false
let animationID
let autoSlide


/* criar dots automaticamente */

reviewSlides.forEach((_,index)=>{

const dot = document.createElement("span")

if(index === 0){
dot.classList.add("active")
}

dot.addEventListener("click",()=>{

reviewIndex = index

updateReviewSlide()

resetAutoSlide()

})

reviewDotsContainer.appendChild(dot)

})

const reviewDots = document.querySelectorAll(".nx2-dots span")


function updateReviewSlide(){

reviewTrack.style.transition="transform 0.4s ease"

reviewTrack.style.transform=`translateX(-${reviewIndex * 100}%)`

reviewDots.forEach(dot=>dot.classList.remove("active"))

reviewDots[reviewIndex].classList.add("active")

const slideWidth = reviewSlides[0].offsetWidth

prevTranslate = -reviewIndex * slideWidth

}


function nextReviewSlide(){

reviewIndex++

if(reviewIndex >= reviewSlides.length){
reviewIndex = 0
}

updateReviewSlide()

}


function prevReviewSlide(){

reviewIndex--

if(reviewIndex < 0){
reviewIndex = reviewSlides.length - 1
}

updateReviewSlide()

}



/* autoplay */

function startAutoSlide(){

autoSlide = setInterval(nextReviewSlide,4000)

}

function resetAutoSlide(){

clearInterval(autoSlide)

startAutoSlide()

}

startAutoSlide()



/* touch drag */

reviewTrack.addEventListener("touchstart", e => {

clearInterval(autoSlide)

dragging = true

startX = e.touches[0].clientX

animationID = requestAnimationFrame(animation)

})

reviewTrack.addEventListener("touchmove", e => {

if(!dragging) return

const currentPosition = e.touches[0].clientX

currentTranslate = prevTranslate + currentPosition - startX

})

reviewTrack.addEventListener("touchend", () => {

cancelAnimationFrame(animationID)

dragging = false

const movedBy = currentTranslate - prevTranslate

if(movedBy < -100){
nextReviewSlide()
}
else if(movedBy > 100){
prevReviewSlide()
}
else{
updateReviewSlide()
}

resetAutoSlide()

})


function animation(){

reviewTrack.style.transition="none"

reviewTrack.style.transform=`translateX(${currentTranslate}px)`

if(dragging){
requestAnimationFrame(animation)
}

}


/* =================================
ANIMAÇÃO SCROLL
================================= */

const reveals = document.querySelectorAll(".reveal-left, .reveal-right")

const observer = new IntersectionObserver(entries => {

entries.forEach(entry => {

if(entry.isIntersecting){

entry.target.classList.add("reveal-show")

}

})

})

reveals.forEach(el => observer.observe(el))
