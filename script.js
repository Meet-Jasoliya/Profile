// --- Theme Toggle (Light/Dark Mode) ---
const themeToggle = document.querySelector('#theme-toggle');
const themeIcon = themeToggle.querySelector('i');
const body = document.body;

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
    body.classList.add('light-mode');
    themeIcon.classList.replace('ph-moon', 'ph-sun');
}

themeToggle.addEventListener('click', () => {
    body.classList.toggle('light-mode');
    
    if (body.classList.contains('light-mode')) {
        themeIcon.classList.replace('ph-moon', 'ph-sun');
        localStorage.setItem('theme', 'light');
    } else {
        themeIcon.classList.replace('ph-sun', 'ph-moon');
        localStorage.setItem('theme', 'dark');
    }
});

// --- Custom Cursor ---
const cursor = document.querySelector('.cursor');
const follower = document.querySelector('.cursor-follower');

document.addEventListener('mousemove', (e) => {
    gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0.1 });
    gsap.to(follower, { x: e.clientX, y: e.clientY, duration: 0.3 });
});

// Cursor hover effect
const links = document.querySelectorAll('a, .btn, button, #menu-icon');
links.forEach(link => {
    link.addEventListener('mouseenter', () => {
        follower.style.width = '50px';
        follower.style.height = '50px';
        follower.style.backgroundColor = 'rgba(0, 171, 240, 0.1)';
        follower.style.opacity = '1';
    });
    link.addEventListener('mouseleave', () => {
        follower.style.width = '35px';
        follower.style.height = '35px';
        follower.style.backgroundColor = 'transparent';
        follower.style.opacity = '0.5';
    });
});

// --- Mobile Menu ---
const menuIcon = document.querySelector('#menu-icon');
const navbar = document.querySelector('.navbar');

if(menuIcon && navbar) {
    menuIcon.onclick = () => {
        menuIcon.classList.toggle('ph-x');
        menuIcon.classList.toggle('ph-list');
        navbar.classList.toggle('active');
    };
}

// --- Sticky Header & Active Links ---
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if(top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove('active');
                const targetLink = document.querySelector('header nav a[href*=' + id + ']');
                if(targetLink) targetLink.classList.add('active');
            });
        }
    });

    let header = document.querySelector('header');
    if(header) header.classList.toggle('sticky', window.scrollY > 100);

    // Close menu when scrolling
    if(menuIcon) menuIcon.classList.remove('ph-x');
    if(navbar) navbar.classList.remove('active');
};

// --- GSAP Scroll Animations ---
gsap.registerPlugin(ScrollTrigger);

// Reveal sections on scroll
const revealElements = [
    '.about-img', '.about-content', 
    '.journey-column', '.skills-column',
    '.contact form'
];

revealElements.forEach(el => {
    gsap.from(el, {
        scrollTrigger: {
            trigger: el,
            start: "top 80%",
            toggleActions: "play none none none"
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power2.out"
    });
});

// Animate Skill Bars
gsap.utils.toArray('.bar span').forEach(span => {
    gsap.from(span, {
        scrollTrigger: {
            trigger: span,
            start: "top 90%"
        },
        width: 0,
        duration: 1.5,
        ease: "power2.out"
    });
});