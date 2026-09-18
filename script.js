// ====== Cursor de corazón ======
const cursorHeart = document.createElement('div');
cursorHeart.className = 'cursor-heart';
cursorHeart.textContent = '❤️';
document.body.appendChild(cursorHeart);

document.addEventListener('mousemove', (e) => {
    cursorHeart.style.left = e.clientX + 'px';
    cursorHeart.style.top = e.clientY + 'px';
});

// ====== Contador de visitas ======
let visits = localStorage.getItem('visits') || 0;
visits++;
localStorage.setItem('visits', visits);
document.getElementById('visit-counter').textContent = '💖 Visitas: ' + visits;

// ====== Las cosas que amo de él ======
const moments = [
    { icon: '😊', title: 'Su sonrisa', text: 'La sonrisa que ilumina mi día entero.' },
    { icon: '👀', title: 'Su mirada', text: 'Esos ojos que me hacen perder el tiempo.' },
    { icon: '🤗', title: 'Sus abrazos', text: 'El lugar más seguro del mundo.' },
    { icon: '🎵', title: 'Su voz', text: 'La melodía que quiero escuchar siempre.' },
    { icon: '💬', title: 'Sus mensajes', text: 'Cada "buenos días" me hace feliz.' },
    { icon: '🌟', title: 'Su forma de ser', text: 'Único, auténtico, irrepetible.' },
    { icon: '💪', title: 'Su apoyo', text: 'Siempre está cuando lo necesito.' },
    { icon: '😴', title: 'Nuestras noches', text: 'Hablar hasta quedarnos dormidos.' }
];

const momentsContainer = document.getElementById('moments');

// ====== Efecto de tinta/pluma ======
moments.forEach((m, index) => {
    const card = document.createElement('div');
    card.className = 'moment-card';
    card.innerHTML = `
        <div class="icon">${m.icon}</div>
        <h3>${m.title}</h3>
        <p class="type-text"></p>
    `;
    momentsContainer.appendChild(card);

    setTimeout(() => {
        typeText(card.querySelector('.type-text'), m.text);
    }, 500 + (index * 800));
});

function typeText(element, text) {
    let i = 0;
    element.textContent = '';
    const interval = setInterval(() => {
        element.textContent += text.charAt(i);
        i++;
        if (i >= text.length) clearInterval(interval);
    }, 40);
}

// ====== Firma ======
const btnSign = document.getElementById('btn-sign');
const signatureInput = document.getElementById('signature-input');
const signaturesDiv = document.getElementById('signatures');

let signatures = JSON.parse(localStorage.getItem('signatures') || '[]');
signatures.forEach(s => addSignature(s));

btnSign.addEventListener('click', () => {
    const text = signatureInput.value.trim();
    if (text) {
        signatures.push(text);
        localStorage.setItem('signatures', JSON.stringify(signatures));
        addSignature(text);
        signatureInput.value = '';
        spawnHearts(10);
    }
});

function addSignature(text) {
    const item = document.createElement('div');
    item.className = 'signature-item';
    signaturesDiv.appendChild(item);
    typeText(item, '💗 ' + text);
}

// ====== Música ======
const music = document.getElementById('bg-music');
const btnMusic = document.getElementById('btn-music');
let musicOn = false;

btnMusic.addEventListener('click', () => {
    musicOn = !musicOn;
    if (musicOn) {
        music.play();
        btnMusic.textContent = '🎵 Música: ON';
    } else {
        music.pause();
        btnMusic.textContent = '🎵 Música';
    }
});

// ====== Entrar al viaje ======
document.getElementById('btn-enter').addEventListener('click', () => {
    const heartScreen = document.getElementById('screen-heart');
    const tripScreen = document.getElementById('screen-trip');

    heartScreen.style.transition = 'transform 2s ease-in';
    heartScreen.style.transform = 'scale(8)';
    heartScreen.style.opacity = '0';

    setTimeout(() => {
        heartScreen.classList.remove('active');
        heartScreen.style.transform = 'scale(1)';
        heartScreen.style.opacity = '1';
        tripScreen.classList.add('active');
        spawnHearts(20);
    }, 2000);
});

// ====== Corazones al hacer clic ======
document.addEventListener('click', (e) => {
    spawnHearts(3, e.clientX, e.clientY);
});

function spawnHearts(count, x, y) {
    for (let i = 0; i < count; i++) {
        const heart = document.createElement('div');
        heart.textContent = '💗';
        heart.style.position = 'fixed';
        heart.style.fontSize = (Math.random() * 20 + 15) + 'px';
        heart.style.left = (x || Math.random() * window.innerWidth) + 'px';
        heart.style.top = (y || Math.random() * window.innerHeight) + 'px';
        heart.style.pointerEvents = 'none';
        heart.style.zIndex = '999';
        heart.style.animation = 'float-up 2s ease-out forwards';
        document.body.appendChild(heart);
        setTimeout(() => heart.remove(), 2000);
    }
}

const style = document.createElement('style');
style.textContent = `
    @keyframes float-up {
        0% { transform: translateY(0) scale(1); opacity: 1; }
        100% { transform: translateY(-100px) scale(1.5); opacity: 0; }
    }
`;
document.head.appendChild(style);
