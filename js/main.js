// JavaScript Principal - Punto de entrada

document.addEventListener('DOMContentLoaded', () => {
    // Inicialización general
    initApp();
});

/**
 * Inicializar aplicación
 */
function initApp() {
    // Configuraciones iniciales
    setupTheme();
    setupBackToTop();
    setupExternalLinks();
    setupImageLazyLoading();
    
    console.log('Portfolio cargado correctamente ✅');
}

/**
 * Loader de página
 */
function showPageLoader() {
    const loader = document.createElement('div');
    loader.id = 'page-loader';
    loader.innerHTML = `
        <div class="loader-spinner"></div>
    `;
    document.body.appendChild(loader);
    
    // Agregar estilos del loader
    const loaderStyles = `
        #page-loader {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: var(--bg-primary);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 9999;
            transition: opacity 0.5s ease, visibility 0.5s ease;
        }
        
        #page-loader.hidden {
            opacity: 0;
            visibility: hidden;
        }
        
        .loader-spinner {
            width: 50px;
            height: 50px;
            border: 3px solid rgba(59, 130, 246, 0.3);
            border-top-color: var(--primary-color);
            border-radius: 50%;
            animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
            to { transform: rotate(360deg); }
        }
    `;
    
    const styleSheet = document.createElement('style');
    styleSheet.textContent = loaderStyles;
    document.head.appendChild(styleSheet);
}

function hidePageLoader() {
    const loader = document.getElementById('page-loader');
    if (loader) {
        setTimeout(() => {
            loader.classList.add('hidden');
            setTimeout(() => loader.remove(), 500);
        }, 300);
    }
}

/**
 * Tema (para futuras implementaciones de dark/light mode)
 */
function setupTheme() {
    const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
}

/**
 * Botón volver arriba
 */
function setupBackToTop() {
    const backToTopBtn = document.createElement('button');
    backToTopBtn.id = 'back-to-top';
    backToTopBtn.innerHTML = `
        <svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path d="M5 10l7-7m0 0l7 7m-7-7v18"/>
        </svg>
    `;
    backToTopBtn.setAttribute('aria-label', 'Volver arriba');
    document.body.appendChild(backToTopBtn);
    
    // Mostrar/ocultar botón según scroll
    const toggleBackToTop = throttle(() => {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    }, 100);
    
    window.addEventListener('scroll', toggleBackToTop);
    
    // Click event
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Estilos del botón
    const btnStyles = `
        #back-to-top {
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 50px;
            height: 50px;
            background: linear-gradient(135deg, var(--primary-color), var(--accent-color));
            border: none;
            border-radius: 50%;
            color: white;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
            opacity: 0;
            visibility: hidden;
            transform: translateY(20px);
            transition: all 0.3s ease;
            z-index: 1000;
        }
        
        #back-to-top.show {
            opacity: 1;
            visibility: visible;
            transform: translateY(0);
        }
        
        #back-to-top:hover {
            transform: translateY(-5px);
            box-shadow: 0 6px 20px rgba(37, 99, 235, 0.4);
        }
        
        @media (max-width: 768px) {
            #back-to-top {
                bottom: 20px;
                right: 20px;
                width: 45px;
                height: 45px;
            }
        }
    `;
    
    const styleSheet = document.createElement('style');
    styleSheet.textContent = btnStyles;
    document.head.appendChild(styleSheet);
}

/**
 * Enlaces externos con seguridad
 */
function setupExternalLinks() {
    const externalLinks = document.querySelectorAll('a[target="_blank"]');
    
    externalLinks.forEach(link => {
        // Agregar rel="noopener noreferrer" por seguridad
        if (!link.getAttribute('rel')) {
            link.setAttribute('rel', 'noopener noreferrer');
        }
    });
}

/**
 * Lazy loading de imágenes
 */
function setupImageLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    } else {
        // Fallback para navegadores antiguos
        images.forEach(img => {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
        });
    }
}

/**
 * Detectar scroll para animaciones adicionales
 */
window.addEventListener('scroll', throttle(() => {
    const scrolled = window.pageYOffset;
    
    // Aquí puedes agregar más efectos basados en scroll
    if (scrolled > 100) {
        document.body.classList.add('scrolled');
    } else {
        document.body.classList.remove('scrolled');
    }
}, 100));

/**
 * Prevenir errores de consola en producción
 */
if (window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
    console.log = () => {};
    console.warn = () => {};
    console.error = () => {};
}

/**
 * Mensaje de bienvenida en consola
 */
console.log('%c¡Hola Developer! 👋', 'font-size: 20px; font-weight: bold; color: #3b82f6;');
console.log('%c¿Curioseando el código? Me gusta tu estilo 😎', 'font-size: 14px; color: #cbd5e1;');
console.log('%cPortafolio creado con ❤️ usando HTML, CSS y JavaScript', 'font-size: 12px; color: #94a3b8;');