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
        if (target === 'inicio') {
            document.body.classList.add('inicio-activo');
        } else {
            document.body.classList.remove('inicio-activo');
        }
    });
});
window.addEventListener('DOMContentLoaded', () => {
    const activeSection = document.querySelector('.section.active');
    if (activeSection && activeSection.id === 'inicio') {
        document.body.classList.add('inicio-activo');
    } else {
        document.body.classList.remove('inicio-activo');
    }
});

// Animación al hacer scroll
const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });
const elementsToAnimate = document.querySelectorAll('.anim-on-scroll');
elementsToAnimate.forEach(el => scrollObserver.observe(el));

// Efectos visuales (partículas, onda, sonido)
let efectosContainer;
function inicializarEfectosContainer() {
    if (!efectosContainer) {
        efectosContainer = document.createElement('div');
        efectosContainer.id = 'efectos-container';
        efectosContainer.style.position = 'fixed';
        efectosContainer.style.top = '0';
        efectosContainer.style.left = '0';
        efectosContainer.style.width = '100%';
        efectosContainer.style.height = '100%';
        efectosContainer.style.pointerEvents = 'none';
        efectosContainer.style.zIndex = '9999';
        document.body.appendChild(efectosContainer);
    }
}
function crearEfectoParticulas(x, y) {
    inicializarEfectosContainer();
    const particulas = [];
    const numParticulas = 15;
    for (let i = 0; i < numParticulas; i++) {
        const particula = document.createElement('div');
        particula.style.position = 'absolute';
        particula.style.left = x + 'px';
        particula.style.top = y + 'px';
        particula.style.width = '8px';
        particula.style.height = '8px';
        particula.style.backgroundColor = `hsl(${Math.random() * 360}, 70%, 60%)`;
        particula.style.borderRadius = '50%';
        particula.style.pointerEvents = 'none';
        particula.style.transition = 'all 0.6s ease-out';
        efectosContainer.appendChild(particula);
        particulas.push(particula);
    }
    requestAnimationFrame(() => {
        particulas.forEach((particula, index) => {
            const angle = (index / numParticulas) * 2 * Math.PI;
            const distance = 50 + Math.random() * 100;
            const finalX = x + Math.cos(angle) * distance;
            const finalY = y + Math.sin(angle) * distance;
            particula.style.left = finalX + 'px';
            particula.style.top = finalY + 'px';
            particula.style.opacity = '0';
            particula.style.transform = 'scale(0)';
        });
    });
    setTimeout(() => {
        particulas.forEach(particula => {
            if (particula.parentNode) {
                particula.parentNode.removeChild(particula);
            }
        });
    }, 600);
}
function crearEfectoOnda(x, y) {
    inicializarEfectosContainer();
    const onda = document.createElement('div');
    onda.style.position = 'absolute';
    onda.style.left = (x - 25) + 'px';
    onda.style.top = (y - 25) + 'px';
    onda.style.width = '50px';
    onda.style.height = '50px';
    onda.style.border = '3px solid #0f0';
    onda.style.borderRadius = '50%';
    onda.style.pointerEvents = 'none';
    onda.style.animation = 'ondaEfecto 0.8s ease-out forwards';
    efectosContainer.appendChild(onda);
    setTimeout(() => {
        if (onda.parentNode) {
            onda.parentNode.removeChild(onda);
        }
    }, 800);
}
function reproducirSonido() {
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.1);
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.1);
    } catch (e) {}
}
function efectoClic(event) {
    const x = event.clientX;
    const y = event.clientY;
    crearEfectoParticulas(x, y);
    crearEfectoOnda(x, y);
    reproducirSonido();
}

document.addEventListener('DOMContentLoaded', function() {
    const seccionInicio = document.getElementById('inicio');
    if (seccionInicio) {
        seccionInicio.addEventListener('click', efectoClic);
    }

    // Spotify modal y playlists
    const searchIcon = document.querySelector('.search-icon');
    const musicModal = document.getElementById('music-modal');
    const cerrarMusicBtn = document.querySelector('.music-modal-cerrar');
    const playlistBtns = document.querySelectorAll('.playlist-btn');
    const spotifyIframe = document.getElementById('spotify-iframe');

    if (searchIcon && musicModal) {
        searchIcon.addEventListener('click', () => {
            musicModal.classList.add('abierto');
        });
    }
    if (cerrarMusicBtn && musicModal) {
        cerrarMusicBtn.addEventListener('click', () => {
            musicModal.classList.remove('abierto');
        });
    }
    if (musicModal) {
        musicModal.addEventListener('click', (e) => {
            if (e.target === musicModal) {
                musicModal.classList.remove('abierto');
            }
        });
    }
    if (playlistBtns && spotifyIframe) {
        playlistBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                playlistBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                const playlistId = btn.dataset.playlist;
                const newSrc = `https://open.spotify.com/embed/playlist/${playlistId}?utm_source=generator`;
                spotifyIframe.src = newSrc;
                spotifyIframe.style.opacity = '0.5';
                setTimeout(() => {
                    spotifyIframe.style.opacity = '1';
                }, 300);
            });
        });
    }
});

// ===== FUNCIONALIDAD DE IDIOMAS =====
const translations = {
    es: {
        inicio: "¡Hey, qué pasa cracks!",
        descripcion: "Soy Oliver, y este es mi portafolio. ¡Prepárate para una experiencia llena de flow!",
        sobremi: "Sobre mí",
        proyectos: "Mis Proyectos",
        contacto: "Contacto",
        ppt: "Piedra, Papel o Tijeras",
        meme: "App de Memes",
        fernanfloo: "Web de Fernanfloo",
        fernanflooDesc: "Un rediseño conceptual de la web del ídolo, con animaciones y sorpresas ocultas. ¡Un tributo al rey!",
        jugar: "Jugar",
        hablemos: "¡Hablemos!",
        redes: "Sígueme en mis redes sociales:",
        hechoPor: "Portafolio inspirado en Fernanfloo - Hecho por Oliver",
        elegirJugada: "¡Elige tu jugada!",
        elegirPersonaje: "Elige tu Meme-Personaje",
        aleatorio: "Aleatorio",
        empezar: "¡Empezar!",
        miMusica: "🎵 Mi Música",
        consejos: "💡 Consejos:",
        consejo1: "Haz clic en las canciones para reproducir",
        consejo2: "Cambia de playlist con los botones de arriba",
        consejo3: "Usa los controles del reproductor para navegar",
        disfruta: "🎧 ¡Disfruta de mi música favorita mientras exploras mi portafolio!",
        nota: "💭 Nota: Algunas funciones requieren cuenta de Spotify",
        hastaLuego: "¡Hasta luego!",
        gracias: "Gracias por visitar mi portafolio. ¡Que tengas un excelente día!",
        continuar: "Continuar",
        buenasNoches: "¡Buenas noches! Que descanses.",
        buenosDias: "¡Buenos días! Que tengas un día increíble.",
        buenasTardes: "¡Buenas tardes! Que tengas una tarde genial."
    },
    en: {
        inicio: "Hey, what's up!",
        descripcion: "I'm Oliver, and this is my portfolio. Get ready for an epic experience!",
        sobremi: "About Me",
        proyectos: "My Projects",
        contacto: "Contact",
        ppt: "Rock, Paper, Scissors",
        meme: "Meme App",
        fernanfloo: "Fernanfloo Website",
        fernanflooDesc: "A conceptual redesign of the idol's website, with animations and hidden surprises. A tribute to the king!",
        jugar: "Play",
        hablemos: "Let's talk!",
        redes: "Follow me on social media:",
        hechoPor: "Portfolio inspired by Fernanfloo - Made by Oliver",
        elegirJugada: "Choose your move!",
        elegirPersonaje: "Choose your Meme-Character",
        aleatorio: "Random",
        empezar: "Start!",
        miMusica: "🎵 My Music",
        consejos: "💡 Tips:",
        consejo1: "Click on songs to play them",
        consejo2: "Change playlist with the buttons above",
        consejo3: "Use the player controls to navigate",
        disfruta: "🎧 Enjoy my favorite music while exploring my portfolio!",
        nota: "💭 Note: Some features require a Spotify account",
        hastaLuego: "See you later!",
        gracias: "Thanks for visiting my portfolio. Have an amazing day!",
        continuar: "Continue",
        buenasNoches: "Good night! Rest well.",
        buenosDias: "Good morning! Have an incredible day.",
        buenasTardes: "Good afternoon! Have a great afternoon."
    }
};

let currentLang = 'es';

function changeLanguage(lang) {
    currentLang = lang;
    const t = translations[lang];
    
    // Actualizar textos principales
    document.querySelector('#inicio h2').textContent = t.inicio;
    document.querySelector('#inicio p').textContent = t.descripcion;
    document.querySelector('#sobremi h2').textContent = t.sobremi;
    document.querySelector('#proyectos h2').textContent = t.proyectos;
    document.querySelector('#contacto h2').textContent = t.contacto;
    document.querySelector('#contacto p').textContent = t.hablemos + ' oliver@email.com';
    
    // Actualizar proyectos
    document.querySelector('.ppt-card h3').textContent = t.ppt;
    document.querySelector('.ppt-card .abrir-ppt-modal').textContent = t.jugar;
    document.querySelector('.meme-card h3').textContent = t.meme;
    document.querySelector('.meme-card .abrir-meme-modal').textContent = t.jugar;
    document.querySelector('.project-card:last-child h3').textContent = t.fernanfloo;
    document.querySelector('.project-card:last-child p').textContent = t.fernanflooDesc;
    
    // Actualizar footer
    document.querySelector('footer p').textContent = t.redes;
    document.querySelector('footer span').textContent = t.hechoPor;
    
    // Actualizar modales
    document.querySelector('.ppt-modal h3').textContent = t.ppt;
    document.querySelector('.ppt-resultado p').textContent = t.elegirJugada;
    document.querySelector('.meme-modal h3').textContent = t.elegirPersonaje;
    document.querySelector('.aleatorio-label').textContent = t.aleatorio;
    document.querySelector('.empezar-meme-juego').textContent = t.empezar;
    document.querySelector('.music-modal h3').textContent = t.miMusica;
    
    // Actualizar consejos de música
    const consejos = document.querySelectorAll('.control-info li');
    consejos[0].textContent = t.consejo1;
    consejos[1].textContent = t.consejo2;
    consejos[2].textContent = t.consejo3;
    document.querySelector('.control-info p strong').textContent = t.consejos;
    document.querySelector('.music-info p').textContent = t.disfruta;
    document.querySelector('.music-note').textContent = '💭 ' + t.nota;
    
    // Actualizar modal de despedida
    document.querySelector('.goodbye-title').textContent = t.hastaLuego;
    document.querySelector('.goodbye-message').textContent = t.gracias;
    document.querySelector('.goodbye-close').textContent = t.continuar;
    
    // Actualizar botones de idioma
    document.querySelectorAll('.lang-nav-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[data-lang="${lang}"]`).classList.add('active');
    
    // Guardar preferencia
    localStorage.setItem('portfolio-lang', lang);
}

// ===== FUNCIONALIDAD DE MODO NOCTURNO =====
let isDarkMode = false;

function toggleTheme() {
    isDarkMode = !isDarkMode;
    const body = document.body;
    const themeIcon = document.querySelector('.theme-icon');
    
    if (isDarkMode) {
        body.classList.add('modo-nocturno');
        themeIcon.textContent = '☀️';
        themeIcon.style.transform = 'rotate(180deg)';
    } else {
        body.classList.remove('modo-nocturno');
        themeIcon.textContent = '🌙';
        themeIcon.style.transform = 'rotate(0deg)';
    }
    
    // Guardar preferencia
    localStorage.setItem('portfolio-theme', isDarkMode ? 'dark' : 'light');
}

// ===== FUNCIONALIDAD DE DESPEDIDA =====
function showGoodbyeMessage() {
    const modal = document.getElementById('goodbye-modal');
    const title = document.querySelector('.goodbye-title');
    const message = document.querySelector('.goodbye-message');
    const timeDiv = document.querySelector('.goodbye-time');
    
    const now = new Date();
    const hour = now.getHours();
    const t = translations[currentLang];
    
    // Determinar saludo según la hora
    let greeting;
    if (hour >= 5 && hour < 12) {
        greeting = t.buenosDias;
    } else if (hour >= 12 && hour < 18) {
        greeting = t.buenasTardes;
    } else {
        greeting = t.buenasNoches;
    }
    
    // Actualizar mensaje
    message.textContent = greeting + ' ' + t.gracias;
    timeDiv.textContent = now.toLocaleTimeString();
    
    // Mostrar modal
    modal.classList.add('abierto');
    
    // Prevenir que se cierre automáticamente
    return false;
}

function closeGoodbyeModal() {
    const modal = document.getElementById('goodbye-modal');
    modal.classList.remove('abierto');
}

// ===== INICIALIZACIÓN =====
document.addEventListener('DOMContentLoaded', function() {
    // Cargar preferencias guardadas
    const savedLang = localStorage.getItem('portfolio-lang') || 'es';
    const savedTheme = localStorage.getItem('portfolio-theme') || 'light';
    
    // Aplicar idioma guardado
    changeLanguage(savedLang);
    
    // Aplicar tema guardado
    if (savedTheme === 'dark') {
        isDarkMode = true;
        document.body.classList.add('modo-nocturno');
        document.querySelector('.theme-icon').textContent = '☀️';
    }
    
    // Event listeners para controles
    document.querySelectorAll('.lang-nav-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            changeLanguage(btn.dataset.lang);
        });
    });
    
    document.getElementById('theme-toggle').addEventListener('click', toggleTheme);
    
    // Event listener para cerrar modal de despedida
    document.querySelector('.goodbye-close').addEventListener('click', closeGoodbyeModal);
    
    // Event listener para salir de la página (solo cuando realmente quiera salir)
    window.addEventListener('beforeunload', showGoodbyeMessage);
});
