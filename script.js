// Initialisation accessibilité
menuToggle.setAttribute('aria-expanded', 'false');
navMenu.setAttribute('aria-hidden', 'true');

// Menu hamburger toggle
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

menuToggle.addEventListener('click', () => {
    const isActive = menuToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
    // Accessibilité
    menuToggle.setAttribute('aria-expanded', isActive);
    navMenu.setAttribute('aria-hidden', !isActive);
});

// Fermer le menu au clic sur un lien
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        // Fermer immédiatement le menu
        menuToggle.classList.remove('active');
        navMenu.classList.remove('active');
        // Petit délai pour permettre au menu de se fermer avant la navigation
        setTimeout(() => {
            // La navigation se fait naturellement
        }, 100);
    });
});

// Fermer le menu au clic en dehors
document.addEventListener('click', (e) => {
    const navbar = document.querySelector('.navbar');
    if (!navbar.contains(e.target)) {
        menuToggle.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// Animation au scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observer toutes les pages
document.querySelectorAll('.page').forEach(page => {
    observer.observe(page);
});

// Navigation active au scroll
const sections = document.querySelectorAll('.page');
const navItems = document.querySelectorAll('.nav-link');

// Fonction pour les onglets
function openTab(evt, tabName) {
    const tabContent = document.querySelectorAll('.tab-content');
    tabContent.forEach(content => {
        content.classList.remove('active');
    });

    const tabButtons = document.querySelectorAll('.tab-btn');
    tabButtons.forEach(button => {
        button.classList.remove('active');
    });

    document.getElementById(tabName).classList.add('active');
    evt.currentTarget.classList.add('active');
}

// Fonction pour le carrousel
let currentIndices = {};

function showImage(carouselId, index) {
    const images = document.querySelectorAll(`#${carouselId} .carousel-image`);
    images.forEach((img, i) => {
        img.classList.toggle('active', i === index);
    });
}

function nextImage(carouselId) {
    const images = document.querySelectorAll(`#${carouselId} .carousel-image`);
    currentIndices[carouselId] = (currentIndices[carouselId] || 0) + 1;
    if (currentIndices[carouselId] >= images.length) {
        currentIndices[carouselId] = 0;
    }
    showImage(carouselId, currentIndices[carouselId]);
}

function prevImage(carouselId) {
    const images = document.querySelectorAll(`#${carouselId} .carousel-image`);
    currentIndices[carouselId] = (currentIndices[carouselId] || 0) - 1;
    if (currentIndices[carouselId] < 0) {
        currentIndices[carouselId] = images.length - 1;
    }
    showImage(carouselId, currentIndices[carouselId]);
}

// Initialiser les carrousels
document.addEventListener('DOMContentLoaded', () => {
    const carousels = document.querySelectorAll('.carousel');
    carousels.forEach(carousel => {
        const carouselId = carousel.parentElement.id;
        const images = carousel.querySelectorAll('.carousel-image');
        if (images.length > 0) {
            images[0].classList.add('active');
            currentIndices[carouselId] = 0;
        }
    });
});

window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - sectionHeight / 3) {
            current = section.getAttribute('id');
        }
    });

    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href').slice(1) === current) {
            item.classList.add('active');
        }
    });
});

// Smooth scroll pour les liens de navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Animation des cartes au hover
document.querySelectorAll('.skill-card, .project-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.02)';
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});
