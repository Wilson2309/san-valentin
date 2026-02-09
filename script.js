const btnNo = document.getElementById('btn-no');
const btnSi = document.getElementById('btn-si');
const modal = document.getElementById('modal');
const heartsContainer = document.getElementById('hearts-container');

let siSize = 1;
let noSize = 1;
let isFinalState = false;

// Estela mágica
function createTrail(x, y) {
    if (Math.random() > 0.4) return;
    const trail = document.createElement('div');
    trail.className = 'trail-item';
    trail.innerHTML = Math.random() > 0.5 ? '✨' : '💖';
    trail.style.left = x + 'px';
    trail.style.top = y + 'px';
    document.body.appendChild(trail);
    setTimeout(() => trail.remove(), 800);
}

window.addEventListener('mousemove', (e) => createTrail(e.clientX, e.clientY));
window.addEventListener('touchmove', (e) => {
    const touch = e.touches[0];
    createTrail(touch.clientX, touch.clientY);
}, { passive: true });

// Elementos de fondo
function createElement(className, content) {
    const el = document.createElement('div');
    el.classList.add(className);
    el.innerHTML = content;
    el.style.left = Math.random() * 95 + 'vw';
    
    const duration = Math.random() * 2 + 2.5;
    el.style.animationDuration = duration + 's';
    
    heartsContainer.appendChild(el);
    setTimeout(() => el.remove(), duration * 1000);
    return el;
}

function createPinkHeart() {
    const size = isFinalState ? (Math.random() * 40 + 20) : (Math.random() * 15 + 12);
    const heart = createElement('floating-heart', '💗');
    heart.style.fontSize = size + 'px';
}

function createSparkle() {
    const sparkle = createElement('sparkle', '');
    const size = Math.random() * 5 + 2;
    sparkle.style.width = size + 'px';
    sparkle.style.height = size + 'px';
    sparkle.style.top = Math.random() * 100 + 'vh';
    sparkle.style.backgroundColor = ['#fff', '#ffd700', '#ff8fab'][Math.floor(Math.random() * 3)];
}

let heartInterval = setInterval(createPinkHeart, 500);
let sparkleInterval = setInterval(createSparkle, 300);

// Función movimiento del botón
function moveNoButton() {
    const padding = 20;
    const maxX = window.innerWidth - btnNo.offsetWidth - padding;
    const maxY = window.innerHeight - btnNo.offsetHeight - padding;
    
    const randomX = Math.max(padding, Math.random() * maxX);
    const randomY = Math.max(padding, Math.random() * maxY);
    
    btnNo.style.left = `${randomX}px`;
    btnNo.style.top = `${randomY}px`;
    btnNo.style.transform = `scale(${noSize}) translateX(0)`; 

    siSize += 0.25;
    btnSi.style.transform = `scale(${siSize})`;
    
    if (noSize > 0.4) {
        noSize -= 0.08;
        btnNo.style.transform = `scale(${noSize})`;
    }

    const frases = ["Error ❌", "Infiel", "Intenta de nuevo", "Bien que quieres", "Piénsalo bien", "Te equivocaste", "Yo se que quieres", "No te hagas la difícil oe"];
    btnNo.innerText = frases[Math.floor(Math.random() * frases.length)];
}

btnNo.addEventListener('mouseover', moveNoButton);
btnNo.addEventListener('touchstart', (e) => {
    e.preventDefault();
    moveNoButton();
});

btnSi.addEventListener('click', () => {
    isFinalState = true;
    clearInterval(heartInterval);
    clearInterval(sparkleInterval);
    
    modal.style.display = 'flex';
    document.getElementById('main-content').style.display = 'none';
    
    setInterval(createPinkHeart, 80);
    setInterval(createSparkle, 120);
});

// Posición inicial
btnNo.style.left = '50%';
btnNo.style.top = '75%';
btnNo.style.transform = 'translateX(-50%)';