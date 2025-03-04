// Custom Cursor
class CustomCursor {
    constructor() {
        this.cursor = document.querySelector('.cursor');
        this.follower = document.querySelector('.cursor-follower');
        this.links = document.querySelectorAll('a, button');
        
        this.posX = 0;
        this.posY = 0;
        this.mouseX = 0;
        this.mouseY = 0;

        this.init();
    }

    init() {
        document.addEventListener('mousemove', (e) => {
            this.mouseX = e.pageX;
            this.mouseY = e.pageY;
        });

        this.links.forEach(link => {
            link.addEventListener('mouseenter', () => {
                this.cursor.style.transform = 'scale(1.5)';
                this.follower.style.transform = 'scale(1.5)';
            });
            
            link.addEventListener('mouseleave', () => {
                this.cursor.style.transform = 'scale(1)';
                this.follower.style.transform = 'scale(1)';
            });
        });

        this.animate();
    }

    animate() {
        this.posX += (this.mouseX - this.posX) * 0.1;
        this.posY += (this.mouseY - this.posY) * 0.1;

        this.cursor.style.left = this.mouseX + 'px';
        this.cursor.style.top = this.mouseY + 'px';
        this.follower.style.left = this.posX + 'px';
        this.follower.style.top = this.posY + 'px';

        requestAnimationFrame(() => this.animate());
    }
}

// Typing Animation
class TypingAnimation {
    constructor() {
        this.typed = new Typed('.typed', {
            strings: [
                'Penetration Tester',
                'Security Researcher',
                'Bug Hunter',
                'CTF Player'
            ],
            typeSpeed: 50,
            backSpeed: 30,
            backDelay: 2000,
            loop: true,
            showCursor: true,
            cursorChar: '|',
            autoInsertCss: true
        });
    }
}

// Scroll Animation
class ScrollAnimation {
    constructor() {
        this.sections = document.querySelectorAll('section');
        this.windowHeight = window.innerHeight;
        this.init();
    }

    init() {
        window.addEventListener('scroll', () => this.checkSections());
        window.addEventListener('resize', () => {
            this.windowHeight = window.innerHeight;
        });
        this.checkSections();
    }

    checkSections() {
        this.sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            if (sectionTop < this.windowHeight * 0.75) {
                section.classList.add('visible');
            }
        });
    }
}

// Navbar Animation
class NavbarAnimation {
    constructor() {
        this.navbar = document.querySelector('.navbar');
        this.lastScroll = 0;
        this.init();
    }

    init() {
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;

            // Navbar background opacity
            if (currentScroll > 50) {
                this.navbar.style.background = 'rgba(10, 10, 10, 0.95)';
            } else {
                this.navbar.style.background = 'rgba(10, 10, 10, 0.9)';
            }

            // Hide/Show navbar on scroll
            if (currentScroll <= 0) {
                this.navbar.classList.remove('scroll-up');
                return;
            }

            if (currentScroll > this.lastScroll && !this.navbar.classList.contains('scroll-down')) {
                this.navbar.classList.remove('scroll-up');
                this.navbar.classList.add('scroll-down');
            } else if (currentScroll < this.lastScroll && this.navbar.classList.contains('scroll-down')) {
                this.navbar.classList.remove('scroll-down');
                this.navbar.classList.add('scroll-up');
            }

            this.lastScroll = currentScroll;
        });
    }
}

// Smooth Scroll
class SmoothScroll {
    constructor() {
        this.links = document.querySelectorAll('a[href^="#"]');
        this.init();
    }

    init() {
        this.links.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(link.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
}

// Form Handling
class ContactForm {
    constructor() {
        this.form = document.getElementById('contact-form');
        if (this.form) {
            this.init();
        }
    }

    init() {
        this.form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            try {
                const formData = new FormData(this.form);
                const data = Object.fromEntries(formData);
                
                // Form submission animation
                const button = this.form.querySelector('button[type="submit"]');
                button.disabled = true;
                button.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i> Sending...';

                // Send form data
                const response = await fetch(this.form.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    this.showSuccess();
                    this.form.reset();
                } else {
                    throw new Error('Form submission failed');
                }
            } catch (error) {
                console.error('Form submission error:', error);
                this.showError();
            }
        });
    }

    showSuccess() {
        const button = this.form.querySelector('button[type="submit"]');
        button.innerHTML = '<i class="fas fa-check"></i> Sent!';
        button.classList.add('success');
        
        setTimeout(() => {
            button.disabled = false;
            button.innerHTML = 'Send Message';
            button.classList.remove('success');
        }, 3000);
    }

    showError() {
        const button = this.form.querySelector('button[type="submit"]');
        button.innerHTML = '<i class="fas fa-times"></i> Error!';
        button.classList.add('error');
        
        setTimeout(() => {
            button.disabled = false;
            button.innerHTML = 'Send Message';
            button.classList.remove('error');
        }, 3000);
    }
}

// Space Background Animation
class SpaceBackground {
    constructor() {
        this.starsContainer = document.querySelector('.stars');
        this.spaceBackground = document.querySelector('.space-background');
        this.starCount = {
            small: 200,
            medium: 100,
            large: 50
        };
        this.init();
    }

    init() {
        // Add nebula effect
        const nebula = document.createElement('div');
        nebula.className = 'nebula';
        this.spaceBackground.appendChild(nebula);

        // Create stars of different sizes
        Object.entries(this.starCount).forEach(([size, count]) => {
            for (let i = 0; i < count; i++) {
                const star = document.createElement('div');
                star.className = `star ${size}`;
                
                // Random position
                star.style.left = `${Math.random() * 100}%`;
                star.style.top = `${Math.random() * 100}%`;
                
                // Random animation delay
                star.style.animationDelay = `${Math.random() * 3}s`;
                star.style.animationDuration = `${2 + Math.random() * 2}s`;
                
                this.starsContainer.appendChild(star);
            }
        });

        // Add parallax effect with different intensities for different sized stars
        window.addEventListener('mousemove', (e) => {
            const moveX = (e.clientX - window.innerWidth / 2);
            const moveY = (e.clientY - window.innerHeight / 2);
            
            // Move small stars slowly
            const smallStars = document.querySelectorAll('.star.small');
            smallStars.forEach(star => {
                star.style.transform = `translate(${moveX * 0.005}px, ${moveY * 0.005}px)`;
            });
            
            // Move medium stars a bit faster
            const mediumStars = document.querySelectorAll('.star.medium');
            mediumStars.forEach(star => {
                star.style.transform = `translate(${moveX * 0.01}px, ${moveY * 0.01}px)`;
            });
            
            // Move large stars the fastest
            const largeStars = document.querySelectorAll('.star.large');
            largeStars.forEach(star => {
                star.style.transform = `translate(${moveX * 0.02}px, ${moveY * 0.02}px)`;
            });
            
            // Move nebula very slowly
            nebula.style.transform = `translate(${moveX * 0.002}px, ${moveY * 0.002}px)`;
        });
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new CustomCursor();
    new TypingAnimation();
    new ScrollAnimation();
    new NavbarAnimation();
    new SmoothScroll();
    new ContactForm();
    new SpaceBackground();
}); 