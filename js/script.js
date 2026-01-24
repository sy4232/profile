/**
 * ========================================
 * Sohei Yamada - Personal Website
 * JavaScript for Animations & Interactions
 * ========================================
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all modules
    initNavigation();
    initScrollReveal();
    initSmoothScroll();
    initParallax();
    initHeroAnimation();
});

/**
 * Navigation - Scroll effects and active states
 */
function initNavigation() {
    const nav = document.getElementById('nav');
    const navLinks = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('section[id]');
    
    // Scroll effect for navigation
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        // Add/remove scrolled class
        if (currentScroll > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });
    
    // Active link highlighting
    const observerOptions = {
        root: null,
        rootMargin: '-20% 0px -80% 0px',
        threshold: 0
    };
    
    const observerCallback = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    };
    
    const observer = new IntersectionObserver(observerCallback, observerOptions);
    sections.forEach(section => observer.observe(section));
}

/**
 * Scroll Reveal - Animate elements on scroll
 */
function initScrollReveal() {
    const reveals = document.querySelectorAll('.reveal');
    
    const revealOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: unobserve after reveal for performance
                // observer.unobserve(entry.target);
            }
        });
    };
    
    const revealObserver = new IntersectionObserver(revealCallback, revealOptions);
    reveals.forEach(reveal => revealObserver.observe(reveal));
}

/**
 * Smooth Scroll - Enhanced smooth scrolling for anchor links
 */
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const navHeight = document.getElementById('nav').offsetHeight;
                const targetPosition = targetElement.offsetTop - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Parallax Effects - Subtle movement on scroll
 */
function initParallax() {
    const orbs = document.querySelectorAll('.gradient-orb');
    
    let ticking = false;
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const scrolled = window.pageYOffset;
                
                orbs.forEach((orb, index) => {
                    const speed = 0.1 + (index * 0.05);
                    const yPos = scrolled * speed;
                    orb.style.transform = `translate(0, ${yPos}px)`;
                });
                
                ticking = false;
            });
            
            ticking = true;
        }
    });
}

/**
 * Hero Animation - Initial load animation
 */
function initHeroAnimation() {
    // Trigger hero animations after a short delay
    setTimeout(() => {
        const heroReveals = document.querySelectorAll('.hero-content .reveal');
        heroReveals.forEach((element, index) => {
            setTimeout(() => {
                element.classList.add('visible');
            }, index * 150);
        });
    }, 300);
}

/**
 * Typing Effect - Optional typing animation for hero text
 */
function initTypingEffect(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

/**
 * Mouse Follower - Optional custom cursor effect
 */
function initMouseFollower() {
    const follower = document.createElement('div');
    follower.className = 'mouse-follower';
    document.body.appendChild(follower);
    
    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    function animate() {
        followerX += (mouseX - followerX) * 0.1;
        followerY += (mouseY - followerY) * 0.1;
        
        follower.style.transform = `translate(${followerX}px, ${followerY}px)`;
        requestAnimationFrame(animate);
    }
    
    animate();
}

/**
 * Card Tilt Effect - 3D hover effect for cards
 */
function initCardTilt() {
    const cards = document.querySelectorAll('.research-card, .skill-category, .activity-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });
}

/**
 * Counter Animation - Animate numbers on scroll
 */
function initCounterAnimation() {
    const counters = document.querySelectorAll('.stat-number');
    
    const counterOptions = {
        root: null,
        threshold: 0.5
    };
    
    const animateCounter = (element, target, duration = 2000) => {
        const start = 0;
        const startTime = performance.now();
        
        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const current = start + (target - start) * easeOutQuart;
            
            element.textContent = Math.round(current * 10) / 10;
            
            if (progress < 1) {
                requestAnimationFrame(update);
            }
        }
        
        requestAnimationFrame(update);
    };
    
    const counterCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseFloat(entry.target.textContent);
                animateCounter(entry.target, target);
                observer.unobserve(entry.target);
            }
        });
    };
    
    const counterObserver = new IntersectionObserver(counterCallback, counterOptions);
    counters.forEach(counter => counterObserver.observe(counter));
}

/**
 * Image Lazy Loading - Performance optimization
 */
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageOptions = {
        root: null,
        rootMargin: '50px',
        threshold: 0
    };
    
    const imageCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    };
    
    const imageObserver = new IntersectionObserver(imageCallback, imageOptions);
    images.forEach(img => imageObserver.observe(img));
}

/**
 * Magnetic Button Effect - Subtle attraction effect
 */
function initMagneticButtons() {
    const buttons = document.querySelectorAll('.btn-primary, .nav-cta');
    
    buttons.forEach(button => {
        button.addEventListener('mousemove', (e) => {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            button.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translate(0, 0)';
        });
    });
}

/**
 * Scroll Progress Indicator
 */
function initScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    progressBar.innerHTML = '<div class="scroll-progress-bar"></div>';
    document.body.appendChild(progressBar);
    
    const bar = progressBar.querySelector('.scroll-progress-bar');
    
    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        
        bar.style.width = scrolled + '%';
    });
}

/**
 * Dark/Light Mode Toggle - Optional theme switcher
 */
function initThemeToggle() {
    const toggle = document.querySelector('.theme-toggle');
    if (!toggle) return;
    
    const currentTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', currentTheme);
    
    toggle.addEventListener('click', () => {
        const newTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });
}

/**
 * Performance: Debounce utility
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Performance: Throttle utility
 */
function throttle(func, limit) {
    let inThrottle;
    return function executedFunction(...args) {
        if (!inThrottle) {
            func(...args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Log initialization
console.log('🌡️ Sohei Yamada Portfolio - Initialized');
