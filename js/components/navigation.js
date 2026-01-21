// Componente de Navegación

class Navigation {
    constructor() {
        this.header = document.getElementById('header');
        this.navToggle = document.getElementById('nav-toggle');
        this.navMenu = document.getElementById('nav-menu');
        this.navLinks = document.querySelectorAll('.nav__link');
        
        this.init();
    }
    
    init() {
        this.setupToggleMenu();
        this.setupActiveLink();
        this.setupScrollHeader();
        this.setupSmoothScroll();
    }
    
    // Toggle menu móvil
    setupToggleMenu() {
        if (this.navToggle) {
            this.navToggle.addEventListener('click', () => {
                this.navMenu.classList.toggle('show-menu');
                this.navToggle.classList.toggle('active');
            });
        }
    }
    
    // Cerrar menú al hacer click en un link
    setupActiveLink() {
        this.navLinks.forEach(link => {
            link.addEventListener('click', () => {
                // Cerrar menú móvil
                this.navMenu.classList.remove('show-menu');
                this.navToggle.classList.remove('active');
                
                // Remover clase active de todos los links
                this.navLinks.forEach(l => l.classList.remove('active'));
                
                // Agregar clase active al link clickeado
                link.classList.add('active');
            });
        });
    }
    
    // Cambiar estilo del header al hacer scroll
    setupScrollHeader() {
        const scrollHeader = () => {
            if (window.scrollY >= 80) {
                this.header.classList.add('scroll-header');
            } else {
                this.header.classList.remove('scroll-header');
            }
        };
        
        window.addEventListener('scroll', throttle(scrollHeader, 100));
    }
    
    // Smooth scroll para los links de navegación
    setupSmoothScroll() {
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                
                const targetId = link.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    const headerHeight = this.header.offsetHeight;
                    smoothScrollTo(targetSection, headerHeight);
                }
            });
        });
    }
    
    // Actualizar link activo basado en scroll
    updateActiveOnScroll() {
        const sections = document.querySelectorAll('section[id]');
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            const correspondingLink = document.querySelector(`.nav__link[href="#${sectionId}"]`);
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                this.navLinks.forEach(l => l.classList.remove('active'));
                if (correspondingLink) {
                    correspondingLink.classList.add('active');
                }
            }
        });
    }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    const navigation = new Navigation();
    
    // Actualizar link activo al hacer scroll
    window.addEventListener('scroll', throttle(() => {
        navigation.updateActiveOnScroll();
    }, 100));
});