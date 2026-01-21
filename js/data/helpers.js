// Funciones auxiliares

/**
 * Debounce function para optimizar eventos
 */
function debounce(func, wait = 300) {
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
 * Throttle function para limitar ejecuciones
 */
function throttle(func, limit = 100) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

/**
 * Detectar si un elemento está visible en el viewport
 */
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

/**
 * Scroll suave a un elemento
 */
function smoothScrollTo(element, offset = 0) {
    const targetPosition = element.getBoundingClientRect().top + window.pageYOffset - offset;
    
    window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
    });
}

/**
 * Agregar clase con animación
 */
function addClass(element, className, delay = 0) {
    setTimeout(() => {
        element.classList.add(className);
    }, delay);
}

/**
 * Remover clase con animación
 */
function removeClass(element, className, delay = 0) {
    setTimeout(() => {
        element.classList.remove(className);
    }, delay);
}

/**
 * Toggle clase
 */
function toggleClass(element, className) {
    element.classList.toggle(className);
}

/**
 * Crear elemento con clases y contenido
 */
function createElement(tag, classes = [], content = '') {
    const element = document.createElement(tag);
    
    if (classes.length > 0) {
        element.classList.add(...classes);
    }
    
    if (content) {
        element.innerHTML = content;
    }
    
    return element;
}

/**
 * Formatear fecha
 */
function formatDate(date) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString('es-ES', options);
}

/**
 * Lazy loading de imágenes
 */
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

/**
 * Validar email
 */
function isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

/**
 * Generar ID único
 */
function generateUniqueId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

/**
 * Copiar texto al clipboard
 */
async function copyToClipboard(text) {
    try {
        await navigator.clipboard.writeText(text);
        return true;
    } catch (err) {
        console.error('Error al copiar:', err);
        return false;
    }
}

// Exportar funciones
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        debounce,
        throttle,
        isInViewport,
        smoothScrollTo,
        addClass,
        removeClass,
        toggleClass,
        createElement,
        formatDate,
        lazyLoadImages,
        isValidEmail,
        generateUniqueId,
        copyToClipboard
    };
}