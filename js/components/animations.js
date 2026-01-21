// Animaciones y efectos

class AnimationsManager {
    constructor() {
        this.init();
    }
    
    init() {
        this.setupScrollReveal();
        this.setupTypingEffect();
        this.setupCursorBlink();
        this.setupSkillBars();
        this.setupParallax();
    }
    
    // Reveal on scroll
    setupScrollReveal() {
        const revealElements = document.querySelectorAll('.hero__content, .about__content, .skills__category, .contact__content');
        
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('reveal-active');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.15,
            rootMargin: '0px 0px -50px 0px'
        });
        
        revealElements.forEach(el => {
            el.classList.add('reveal');
            revealObserver.observe(el);
        });
    }
    
    // Efecto de escritura para el título
    setupTypingEffect() {
        const roleElement = document.querySelector('.hero__role');
        if (!roleElement) return;
        
        const roles = [
            'Android Developer',
            'Kotlin Developer',
    
        ];
        
        let roleIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingSpeed = 150;
        
        const type = () => {
            const currentRole = roles[roleIndex];
            
            if (isDeleting) {
                roleElement.textContent = currentRole.substring(0, charIndex - 1);
                charIndex--;
                typingSpeed = 50;
            } else {
                roleElement.textContent = currentRole.substring(0, charIndex + 1);
                charIndex++;
                typingSpeed = 150;
            }
            
            if (!isDeleting && charIndex === currentRole.length) {
                typingSpeed = 2000; // Pausa al terminar
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
                typingSpeed = 500; // Pausa antes de escribir nuevo rol
            }
            
            setTimeout(type, typingSpeed);
        };
        
        // Iniciar efecto después de un delay
        setTimeout(type, 1000);
    }
    
    // Cursor parpadeante
    setupCursorBlink() {
        const cursor = document.querySelector('.hero__cursor');
        if (!cursor) return;
        
        setInterval(() => {
            cursor.style.opacity = cursor.style.opacity === '0' ? '1' : '0';
        }, 500);
    }
    
    // Animar barras de skills
    setupSkillBars() {
        const skillBars = document.querySelectorAll('.skill-card__progress');
        
        const skillObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const bar = entry.target;
                    const width = bar.style.width;
                    bar.style.width = '0';
                    
                    setTimeout(() => {
                        bar.style.transition = 'width 1.5s ease-out';
                        bar.style.width = width;
                    }, 100);
                    
                    skillObserver.unobserve(bar);
                }
            });
        }, {
            threshold: 0.5
        });
        
        skillBars.forEach(bar => skillObserver.observe(bar));
    }
    
    // Efecto parallax sutil
    setupParallax() {
        const heroContent = document.querySelector('.hero__content');
        const heroImage = document.querySelector('.hero__image');
        
        if (!heroContent || !heroImage) return;
        
        const handleParallax = throttle(() => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * 0.5;
            
            if (scrolled < window.innerHeight) {
                heroContent.style.transform = `translateY(${rate * 0.3}px)`;
                heroImage.style.transform = `translateY(${rate * 0.5}px)`;
            }
        }, 10);
        
        window.addEventListener('scroll', handleParallax);
    }
    
    // Animación de contadores
    animateCounter(element, target, duration = 2000) {
        const start = 0;
        const increment = target / (duration / 16);
        let current = start;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                element.textContent = Math.floor(current) + '+';
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target + '+';
            }
        };
        
        updateCounter();
    }
    
    // Animar estadísticas
    setupStatsAnimation() {
        const stats = document.querySelectorAll('.about__stat-number');
        
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const statElement = entry.target;
                    const targetValue = parseInt(statElement.textContent);
                    this.animateCounter(statElement, targetValue);
                    statsObserver.unobserve(statElement);
                }
            });
        }, {
            threshold: 0.5
        });
        
        stats.forEach(stat => statsObserver.observe(stat));
    }
}

// Clases CSS para las animaciones
const animationStyles = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes fadeOut {
        from {
            opacity: 1;
            transform: scale(1);
        }
        to {
            opacity: 0;
            transform: scale(0.9);
        }
    }
    
    .reveal {
        opacity: 0;
        transform: translateY(50px);
        transition: all 0.8s ease-out;
    }
    
    .reveal-active {
        opacity: 1;
        transform: translateY(0);
    }
    
    .animate-in {
        animation: fadeInUp 0.6s ease-out forwards;
    }
`;

// Agregar estilos de animación al documento
const styleSheet = document.createElement('style');
styleSheet.textContent = animationStyles;
document.head.appendChild(styleSheet);

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    const animations = new AnimationsManager();
    animations.setupStatsAnimation();
});