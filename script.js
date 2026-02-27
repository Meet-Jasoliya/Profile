// Custom Cursor Logic
const cursor = document.querySelector('.cursor');
const follower = document.querySelector('.cursor-follower');
const interactiveElements = document.querySelectorAll('a, .menu-btn, .logo');

let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;
let followerX = window.innerWidth / 2;
let followerY = window.innerHeight / 2;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    // Move the tiny dot instantly
    gsap.to(cursor, {
        x: mouseX,
        y: mouseY,
        duration: 0.1,
        ease: "power2.out"
    });
});

// Smoothly animate the follower ring
gsap.ticker.add(() => {
    // Math for smooth interpolation
    followerX += (mouseX - followerX) * 0.12;
    followerY += (mouseY - followerY) * 0.12;
    
    gsap.set(follower, {
        x: followerX,
        y: followerY
    });
});

// Cursor Hover effects
interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        follower.classList.add('cursor-hover');
        cursor.style.opacity = '0'; // Hide the tiny dot on hover
    });
    el.addEventListener('mouseleave', () => {
        follower.classList.remove('cursor-hover');
        cursor.style.opacity = '1';
    });
});

// --- GSAP Entrance Animations ---
const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

// 1. Animate Navbar
tl.from('.logo-icon', { y: -100, duration: 0.8 })
  .from('.logo-text', { opacity: 0, x: -20, duration: 0.5 }, "-=0.4")
  .from('.nav-links li', { y: -20, opacity: 0, duration: 0.5, stagger: 0.1 }, "-=0.5")
  .from('.menu-btn', { x: 100, duration: 0.8 }, "-=0.8");

// 2. Animate Hero Text
tl.from('.hero-title', { 
    y: 60, 
    opacity: 0, 
    duration: 1, 
    skewY: 5 
}, "-=0.4")
  .from('.hero-desc', { 
    y: 30, 
    opacity: 0, 
    duration: 0.8 
}, "-=0.6")
  .from('.hero-actions .btn', { 
    y: 20, 
    opacity: 0, 
    duration: 0.6, 
    stagger: 0.2 
}, "-=0.6");

// 3. Animate Hexagon & Image
tl.from('.hexagon-container', { 
    scale: 0.8, 
    opacity: 0, 
    rotation: 10,
    duration: 1.5, 
    ease: "elastic.out(1, 0.7)" 
}, "-=1.2");

// Animate the SVG border lines drawing in
tl.from('.hex-path', {
    strokeDasharray: 300,
    strokeDashoffset: 300,
    duration: 1.5,
    stagger: 0.2,
    ease: "power2.out"
}, "-=1.5");


// --- 3D Parallax Tilt Effect on the Portrait ---
const heroImageWrapper = document.querySelector('.hero-image-wrapper');
const hexContainer = document.querySelector('.hexagon-container');

heroImageWrapper.addEventListener('mousemove', (e) => {
    const rect = heroImageWrapper.getBoundingClientRect();
    
    // Get mouse position relative to the center of the element
    const x = e.clientX - rect.left; 
    const y = e.clientY - rect.top;  
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Calculate rotation (-15 to +15 degrees max)
    const rotateX = ((y - centerY) / centerY) * -15; 
    const rotateY = ((x - centerX) / centerX) * 15;
    
    gsap.to(hexContainer, {
        rotateX: rotateX,
        rotateY: rotateY,
        duration: 0.5,
        ease: "power2.out",
        transformPerspective: 1000 // Creates the 3D depth
    });
});

// Reset tilt when mouse leaves
heroImageWrapper.addEventListener('mouseleave', () => {
    gsap.to(hexContainer, {
        rotateX: 0,
        rotateY: 0,
        duration: 1,
        ease: "elastic.out(1, 0.4)"
    });
});

// --- Mobile Menu Toggle ---
const menuBtn = document.getElementById('mobile-menu-btn');
const navLinksContainer = document.getElementById('nav-links');

if(menuBtn && navLinksContainer) {
    menuBtn.addEventListener('click', () => {
        navLinksContainer.classList.toggle('active-menu');
        
        // If menu just opened, animate links in
        if(navLinksContainer.classList.contains('active-menu')) {
            gsap.fromTo('.nav-links li', 
                { opacity: 0, x: 30 },
                { opacity: 1, x: 0, duration: 0.4, stagger: 0.1, ease: "power2.out" }
            );
        }
    });
}