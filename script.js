// Loader y mostrar contenido principal
window.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        document.getElementById('loader').style.display = 'none';
        document.getElementById('main-content').style.display = 'block';
    }, 2500);
});

// Navegación dinámica tipo Mario
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('.section');
navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        navLinks.forEach(l => l.classList.remove('active'));
        this.classList.add('active');
        const target = this.getAttribute('href').replace('#','');
        sections.forEach(sec => {
            if(sec.id === target) {
                sec.classList.add('active');
            } else {
                sec.classList.remove('active');
            }
        });
        // Cambia el fondo global solo en inicio
        if (target === 'inicio') {
            document.body.classList.add('inicio-activo');
        } else {
            document.body.classList.remove('inicio-activo');
        }
    });
});
// Al cargar la página, asegúrate de que el fondo esté correcto
window.addEventListener('DOMContentLoaded', () => {
    const activeSection = document.querySelector('.section.active');
    if (activeSection && activeSection.id === 'inicio') {
        document.body.classList.add('inicio-activo');
    } else {
        document.body.classList.remove('inicio-activo');
    }
});
// Animación Mario: al cambiar de sección, se reinicia la animación
const observer = new MutationObserver(() => {
    document.querySelectorAll('.section.active').forEach(sec => {
        sec.classList.remove('active');
        void sec.offsetWidth; // trigger reflow
        sec.classList.add('active');
    });
});
observer.observe(document.body, { subtree: true, childList: true });

// Animación al hacer scroll
const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, {
    threshold: 0.1
});

const elementsToAnimate = document.querySelectorAll('.anim-on-scroll');
elementsToAnimate.forEach(el => scrollObserver.observe(el));

// Piedra, Papel o Tijeras Modal
const abrirPptBtn = document.querySelector('.abrir-ppt-modal');
const pptModal = document.getElementById('ppt-modal');
const cerrarPptBtn = document.querySelector('.ppt-modal-cerrar');

abrirPptBtn.addEventListener('click', () => {
    pptModal.classList.add('abierto');
});
cerrarPptBtn.addEventListener('click', () => {
    pptModal.classList.remove('abierto');
});
pptModal.addEventListener('click', (e) => {
    if (e.target === pptModal) {
        pptModal.classList.remove('abierto');
    }
});

// Lógica del juego dentro del modal
const pptBtns = pptModal.querySelectorAll('.ppt-btn');
const pptResultado = pptModal.querySelector('.ppt-resultado');
const opciones = ['piedra', 'papel', 'tijeras'];
const emojis = { piedra: '🪨', papel: '📄', tijeras: '✂️' };

pptBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const eleccionUsuario = btn.dataset.eleccion;
        const eleccionMaquina = opciones[Math.floor(Math.random() * 3)];
        let resultado = '';
        if (eleccionUsuario === eleccionMaquina) {
            resultado = '¡Empate!';
        } else if (
            (eleccionUsuario === 'piedra' && eleccionMaquina === 'tijeras') ||
            (eleccionUsuario === 'papel' && eleccionMaquina === 'piedra') ||
            (eleccionUsuario === 'tijeras' && eleccionMaquina === 'papel')
        ) {
            resultado = '¡Ganaste!';
            // Animación de victoria
            mostrarAnimacionGanaste();
        } else {
            resultado = 'Perdiste :(';
        }
        pptResultado.innerHTML = `Tú: ${emojis[eleccionUsuario]}<br>Máquina: ${emojis[eleccionMaquina]}<br><strong>${resultado}</strong>`;
    });
});

function mostrarAnimacionGanaste() {
    let modalContent = document.querySelector('.ppt-modal-content');
    if (!modalContent) return;
    const anim = document.createElement('div');
    anim.className = 'ppt-ganaste';
    anim.textContent = '¡GANASTE!';
    modalContent.appendChild(anim);
    setTimeout(() => {
        anim.remove();
    }, 1200);
}

// Modal Meme Game
const abrirMemeBtn = document.querySelector('.abrir-meme-modal');
const memeModal = document.getElementById('meme-modal');
const cerrarMemeBtn = document.querySelector('.meme-modal-cerrar');
const empezarMemeJuegoBtn = document.querySelector('.empezar-meme-juego');
const memeJuegoContainer = document.querySelector('.meme-juego-container');
const memePersonajes = {
    doge: 'https://i.ibb.co/6bQ6w1d/doge.png',
    troll: 'https://i.ibb.co/6bQ6w1d/doge.png',
    cheems: 'https://i.ibb.co/6bQ6w1d/doge.png',
};

abrirMemeBtn.addEventListener('click', () => {
    memeModal.style.display = 'flex';
    memeJuegoContainer.style.display = 'none';
});
cerrarMemeBtn.addEventListener('click', () => {
    memeModal.style.display = 'none';
    memeJuegoContainer.innerHTML = '';
});
memeModal.addEventListener('click', (e) => {
    if (e.target === memeModal) {
        memeModal.style.display = 'none';
        memeJuegoContainer.innerHTML = '';
    }
});

empezarMemeJuegoBtn.addEventListener('click', () => {
    // Elegir personaje
    const elegido = document.querySelector('input[name="meme-personaje"]:checked').value;
    let personaje = elegido;
    if (elegido === 'aleatorio') {
        const keys = Object.keys(memePersonajes);
        personaje = keys[Math.floor(Math.random() * keys.length)];
    }
    memeJuegoContainer.style.display = 'block';
    memeJuegoContainer.innerHTML = `
        <div class="meme-juego-nivel">
            <div class="meme-juego-personaje" style="background-image:url('${memePersonajes[personaje]}')"></div>
            <div class="meme-juego-meta"></div>
            <div class="meme-juego-trampa"></div>
        </div>
        <div class="meme-juego-mensaje"></div>
    `;
    iniciarMiniJuegoMeme();
});

function iniciarMiniJuegoMeme() {
    const nivel = memeJuegoContainer.querySelector('.meme-juego-nivel');
    // Agrega el suelo visual
    if (!nivel.querySelector('.meme-juego-suelo')) {
        const suelo = document.createElement('div');
        suelo.className = 'meme-juego-suelo';
        nivel.appendChild(suelo);
    }
    const personaje = nivel.querySelector('.meme-juego-personaje');
    const meta = nivel.querySelector('.meme-juego-meta');
    const trampa = nivel.querySelector('.meme-juego-trampa');
    const mensaje = memeJuegoContainer.querySelector('.meme-juego-mensaje');
    let posX = 10;
    let posY = 0;
    let velY = 0;
    let enSuelo = true;
    let jugando = true;
    personaje.style.left = posX + 'px';
    personaje.style.bottom = (posY + 28) + 'px';
    function loop() {
        if (!jugando) return;
        // Gravedad
        if (!enSuelo) {
            velY -= 1.2;
            posY += velY;
            if (posY <= 0) {
                posY = 0;
                enSuelo = true;
                velY = 0;
                personaje.classList.remove('salta');
            }
        }
        // Colisión con meta
        if (posX >= 280) {
            mensaje.textContent = '¡GANASTE! ... pero era una trampa 😈';
            jugando = false;
            setTimeout(() => {
                mensaje.textContent = '¡Sorpresa! No hay premio, solo memes 🎭';
            }, 2000);
            return;
        }
        // Colisión con trampa
        if (posX >= 150 && posX <= 170 && posY <= 30) {
            mensaje.textContent = '¡TRAMPA ACTIVADA! 😱';
            jugando = false;
            setTimeout(() => {
                mensaje.textContent = '¡Te trolleé! 🤪';
            }, 1500);
            return;
        }
        requestAnimationFrame(loop);
    }
    loop();
    // Controles
    document.addEventListener('keydown', function(e) {
        if (!jugando) return;
        if (e.code === 'ArrowRight' && posX < 280) {
            posX += 3;
            personaje.style.transform = 'scaleX(1)';
        }
        if (e.code === 'ArrowLeft' && posX > 10) {
            posX -= 3;
            personaje.style.transform = 'scaleX(-1)';
        }
        if (e.code === 'Space' && enSuelo) {
            velY = 15;
            enSuelo = false;
            personaje.classList.add('salta');
        }
    });
}

// Modal de Música Spotify
const searchIcon = document.querySelector('.search-icon');
const musicModal = document.getElementById('music-modal');
const cerrarMusicBtn = document.querySelector('.music-modal-cerrar');

// Agregar evento de clic al ícono de Spotify
searchIcon.addEventListener('click', () => {
    musicModal.classList.add('abierto');
});

// Cerrar modal de música
cerrarMusicBtn.addEventListener('click', () => {
    musicModal.classList.remove('abierto');
});

// Cerrar modal al hacer clic fuera
musicModal.addEventListener('click', (e) => {
    if (e.target === musicModal) {
        musicModal.classList.remove('abierto');
    }
});

// Funcionalidad para cambiar playlists
const playlistBtns = document.querySelectorAll('.playlist-btn');
const spotifyIframe = document.getElementById('spotify-iframe');

const playlists = {
    '37i9dQZF1DXcBWIGoYBM5M': 'Today\'s Top Hits',
    '37i9dQZF1DX5Vy6DFOcx00': 'Rock Classics', 
    '37i9dQZF1DX4sWSpwq3LiO': 'Peaceful Piano',
    '37i9dQZF1DX4sWSpwq3LiO': 'Hip Hop'
};

playlistBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remover clase active de todos los botones
        playlistBtns.forEach(b => b.classList.remove('active'));
        
        // Agregar clase active al botón clickeado
        btn.classList.add('active');
        
        // Obtener el ID de la playlist
        const playlistId = btn.dataset.playlist;
        
        // Actualizar el iframe con la nueva playlist
        const newSrc = `https://open.spotify.com/embed/playlist/${playlistId}?utm_source=generator`;
        spotifyIframe.src = newSrc;
        
        // Efecto visual de cambio
        spotifyIframe.style.opacity = '0.5';
        setTimeout(() => {
            spotifyIframe.style.opacity = '1';
        }, 300);
    });
});
