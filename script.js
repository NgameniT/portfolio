// DOM Elements
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('.page');

// Initialisation accessibilité
if (menuToggle && navMenu) {
    menuToggle.setAttribute('aria-expanded', 'false');
    navMenu.setAttribute('aria-hidden', 'true');

    // Menu hamburger toggle
    menuToggle.addEventListener('click', () => {
        const isActive = menuToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        // Accessibilité
        menuToggle.setAttribute('aria-expanded', isActive);
        navMenu.setAttribute('aria-hidden', !isActive);
    });
}

// Fermer le menu au clic sur un lien
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Fermer le menu au clic en dehors
document.addEventListener('click', (e) => {
    if (menuToggle && navMenu && !menuToggle.contains(e.target) && !navMenu.contains(e.target)) {
        menuToggle.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// Animation au scroll (Intersection Observer)
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -10% 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

sections.forEach(section => {
    observer.observe(section);
});

// Navigation active au scroll
window.addEventListener('scroll', () => {
    let current = '';
    const scrollPos = window.scrollY + 100;

    sections.forEach(section => {
        if (scrollPos >= section.offsetTop) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Fonction pour les onglets
function openTab(evt, tabName) {
    const parent = evt.currentTarget.closest('.experience-item');
    const tabContents = parent.querySelectorAll('.tab-content');
    const tabButtons = parent.querySelectorAll('.tab-btn');

    tabContents.forEach(content => content.classList.remove('active'));
    tabButtons.forEach(button => button.classList.remove('active'));

    document.getElementById(tabName).classList.add('active');
    evt.currentTarget.classList.add('active');
}

// Fonction pour le carrousel
let currentIndices = {};

function showImage(carouselId, index) {
    const carousel = document.getElementById(carouselId);
    const images = carousel.querySelectorAll('.carousel-image');
    images.forEach((img, i) => {
        img.classList.toggle('active', i === index);
    });
}

function nextImage(carouselId) {
    const carousel = document.getElementById(carouselId);
    const images = carousel.querySelectorAll('.carousel-image');
    currentIndices[carouselId] = (currentIndices[carouselId] || 0) + 1;
    if (currentIndices[carouselId] >= images.length) {
        currentIndices[carouselId] = 0;
    }
    showImage(carouselId, currentIndices[carouselId]);
}

function prevImage(carouselId) {
    const carousel = document.getElementById(carouselId);
    const images = carousel.querySelectorAll('.carousel-image');
    currentIndices[carouselId] = (currentIndices[carouselId] || 0) - 1;
    if (currentIndices[carouselId] < 0) {
        currentIndices[carouselId] = images.length - 1;
    }
    showImage(carouselId, currentIndices[carouselId]);
}

// Initialiser les carrousels et onglets au chargement
document.addEventListener('DOMContentLoaded', () => {
    const carousels = document.querySelectorAll('.carousel');
    carousels.forEach(carousel => {
        const carouselId = carousel.closest('.tab-content').id;
        const images = carousel.querySelectorAll('.carousel-image');
        if (images.length > 0) {
            images[0].classList.add('active');
            currentIndices[carouselId] = 0;
        }
    });
});

// Smooth scroll pour les liens de navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            const navbarHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = targetElement.offsetTop - navbarHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Animation des cartes au hover
document.querySelectorAll('.experience-item, .service-card, .tech-card, .value-item').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.02)';
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});