// --- Wireframe Toggles ---
const btnWire1 = document.getElementById('wireframe1-toggle');
const btnWire2 = document.getElementById('wireframe2-toggle');

btnWire1.addEventListener('click', () => {
  document.body.classList.toggle('wireframe1');
  document.body.classList.remove('wireframe2');
});

btnWire2.addEventListener('click', () => {
  document.body.classList.toggle('wireframe2');
  document.body.classList.remove('wireframe1');
});

// --- Carousel ---
const carouselSlide = document.querySelector('.carousel-slide');
const carouselImages = document.querySelectorAll('.carousel-slide img');

let counter = 0;
let size = carouselImages[0]?.clientWidth || 0;

function moveCarousel() {
  if(!carouselSlide) return;
  counter++;
  if(counter >= carouselImages.length){
    counter = 0;
  }
  carouselSlide.style.transform = `translateX(${-size * counter}px)`;
}

// Auto-play carousel toutes les 3 secondes
setInterval(moveCarousel, 3000);

// Ajustement responsive
window.addEventListener('resize', () => {
  if(carouselImages.length){
    size = carouselImages[0].clientWidth;
    carouselSlide.style.transform = `translateX(${-size * counter}px)`;
  }
});
const carouselSlide = document.querySelector('.carousel-slide');
const carouselImages = Array.from(document.querySelectorAll('.carousel-slide img'));

// Clone images pour un effet infini
carouselImages.forEach(img => {
  const clone = img.cloneNode(true);
  carouselSlide.appendChild(clone);
});

let counter = 0;
const total = carouselSlide.children.length;
const speed = 2; // vitesse en pixels par frame

function animateCarousel() {
  counter += speed;
  if(counter >= carouselSlide.scrollWidth / 2){
    counter = 0; // reset pour effet infini
  }
  carouselSlide.style.transform = `translateX(${-counter}px)`;
  requestAnimationFrame(animateCarousel);
}

animateCarousel();


