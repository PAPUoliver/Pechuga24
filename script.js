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
    });
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
