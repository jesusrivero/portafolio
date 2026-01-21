// Componente de Proyectos
function createElement(tag, classes = [], content = '') {
    const element = document.createElement(tag);
    classes.forEach(cls => element.classList.add(cls));
    if (content) element.innerHTML = content;
    return element;
}

class ProjectsManager {
    constructor(projects) {
        this.projects = projects;
        this.projectsGrid = document.getElementById('projects-grid');
        this.filterButtons = document.querySelectorAll('.filter-btn');
        this.currentFilter = 'all';
        this.currentImageIndex = 0;
        
        this.init();
    }
    
    init() {
        this.renderProjects(this.projects);
        this.setupFilters();
    }
    
    // Renderizar proyectos
    renderProjects(projects) {
        this.projectsGrid.innerHTML = '';
        
        projects.forEach((project, index) => {
            const projectCard = this.createProjectCard(project, index);
            this.projectsGrid.appendChild(projectCard);
        });
        
        this.animateProjectCards();
    }
    
    // Crear tarjeta de proyecto
    createProjectCard(project, index) {
        const card = createElement('article', ['project-card'], '');
        card.setAttribute('data-category', project.category);
        
        // Usar la primera imagen como principal
        const mainImage = Array.isArray(project.images) ? project.images[0] : (project.image || project.images);
        
        const imageContainer = createElement('div', ['project-card__image'], '');
        const image = document.createElement('img');
        image.src = mainImage;
        image.alt = project.title;
        image.onerror = () => {
            image.src = `https://via.placeholder.com/600x400/1e293b/3b82f6?text=${encodeURIComponent(project.title)}`;
        };
        imageContainer.appendChild(image);
        
        // Overlay con enlaces
        const overlay = createElement('div', ['project-card__overlay'], '');
        const links = createElement('div', ['project-card__links'], '');
        
        if (project.github) {
            links.innerHTML += `
                <a href="${project.github}" target="_blank" rel="noopener" class="project-card__link" aria-label="Ver código en GitHub">
                    <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                    </svg>
                </a>
            `;
        }
        
        if (project.demo) {
            links.innerHTML += `
                <a href="${project.demo}" target="_blank" rel="noopener" class="project-card__link" aria-label="Ver demo">
                    <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                        <path d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                    </svg>
                </a>
            `;
        }
        
        overlay.appendChild(links);
        imageContainer.appendChild(overlay);
        
        const content = createElement('div', ['project-card__content'], '');
        
        const tagsContainer = createElement('div', ['project-card__tags'], '');
        project.tags.forEach(tag => {
            tagsContainer.innerHTML += `<span class="project-card__tag">${tag}</span>`;
        });
        
        content.innerHTML = `
            <h3 class="project-card__title">${project.title}</h3>
            <p class="project-card__description">${project.description}</p>
        `;
        
        content.insertBefore(tagsContainer, content.firstChild);
        
        if (project.features && project.features.length > 0) {
            const featuresList = createElement('ul', ['project-card__features'], '');
            project.features.slice(0, 3).forEach(feature => {
                featuresList.innerHTML += `<li>${feature}</li>`;
            });
            content.appendChild(featuresList);
        }
        
        const viewMoreBtn = createElement('button', ['project-card__btn'], 'Ver detalles');
        viewMoreBtn.addEventListener('click', () => this.showProjectModal(project));
        content.appendChild(viewMoreBtn);
        
        card.appendChild(imageContainer);
        card.appendChild(content);
        
        return card;
    }
    
    setupFilters() {
        this.filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                this.filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                const filter = button.getAttribute('data-filter');
                this.filterProjects(filter);
            });
        });
    }
    
    filterProjects(filter) {
        this.currentFilter = filter;
        const projectCards = document.querySelectorAll('.project-card');
        
        projectCards.forEach((card, index) => {
            const category = card.getAttribute('data-category');
            card.style.animation = 'fadeOut 0.3s ease forwards';
            
            setTimeout(() => {
                if (filter === 'all' || category === filter) {
                    card.style.display = 'flex';
                    setTimeout(() => {
                        card.style.animation = 'fadeInUp 0.5s ease forwards';
                    }, index * 50);
                } else {
                    card.style.display = 'none';
                }
            }, 300);
        });
    }
    
    animateProjectCards() {
        const cards = document.querySelectorAll('.project-card');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('animate-in');
                    }, index * 100);
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1
        });
        
        cards.forEach(card => observer.observe(card));
    }
    
    // Mostrar modal con galería
    showProjectModal(project) {
        this.currentImageIndex = 0;
        
        let modal = document.getElementById('project-modal');
        if (!modal) {
            modal = this.createModal();
            document.body.appendChild(modal);
        }
        
        this.fillModalContent(modal, project);
        
        setTimeout(() => {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }, 10);
        
        const closeBtn = modal.querySelector('.modal__close');
        const overlay = modal.querySelector('.modal__overlay');
        
        const closeModal = () => {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        };
        
        closeBtn.onclick = closeModal;
        overlay.onclick = closeModal;
        
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('active')) {
                closeModal();
            }
        });
    }
    
    createModal() {
        const modal = createElement('div', ['project-modal'], '');
        modal.id = 'project-modal';
        
        modal.innerHTML = `
            <div class="modal__overlay"></div>
            <div class="modal__content">
                <button class="modal__close" aria-label="Cerrar modal">
                    <svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>
                <div class="modal__body">
                    <!-- Contenido dinámico -->
                </div>
            </div>
        `;
        
        return modal;
    }
    
    fillModalContent(modal, project) {
        const modalBody = modal.querySelector('.modal__body');
        const images = Array.isArray(project.images) ? project.images : [project.image || project.images];
        
        modalBody.innerHTML = `
            <div class="modal__image-section">
                <div class="modal__gallery">
                    <img src="${images[0]}" alt="${project.title}" class="modal__main-image" id="modal-main-image"
                         onerror="this.src='https://via.placeholder.com/800x500/1e293b/3b82f6?text=${encodeURIComponent(project.title)}'">
                    
                    ${images.length > 1 ? `
                        <button class="modal__nav-btn modal__nav-btn--prev" id="modal-prev-btn" aria-label="Imagen anterior">
                            <svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                                <polyline points="15 18 9 12 15 6"></polyline>
                            </svg>
                        </button>
                        <button class="modal__nav-btn modal__nav-btn--next" id="modal-next-btn" aria-label="Imagen siguiente">
                            <svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                                <polyline points="9 18 15 12 9 6"></polyline>
                            </svg>
                        </button>
                        <div class="modal__image-counter">
                            <span id="modal-current-image">1</span> / <span>${images.length}</span>
                        </div>
                    ` : ''}
                </div>
                
                ${images.length > 1 ? `
                    <div class="modal__thumbnails" id="modal-thumbnails">
                        ${images.map((img, idx) => `
                            <img src="${img}" alt="${project.title} - Imagen ${idx + 1}" 
                                 class="modal__thumbnail ${idx === 0 ? 'active' : ''}" 
                                 data-index="${idx}"
                                 onerror="this.src='https://via.placeholder.com/150x100/1e293b/3b82f6?text=Img${idx + 1}'">
                        `).join('')}
                    </div>
                ` : ''}
                
                <div class="modal__tags">
                    ${project.tags.map(tag => `<span class="modal__tag">${tag}</span>`).join('')}
                </div>
            </div>
            
            <div class="modal__info">
                <h2 class="modal__title">${project.title}</h2>
                <p class="modal__description">${project.description}</p>
                
                <div class="modal__section">
                    <h3 class="modal__section-title">✨ Características Principales</h3>
                    <ul class="modal__features">
                        ${project.features.map(feature => `<li>${feature}</li>`).join('')}
                    </ul>
                </div>
                
                <div class="modal__section">
                    <h3 class="modal__section-title">🛠️ Tecnologías Utilizadas</h3>
                    <div class="modal__tech-stack">
                        ${project.tags.map(tech => `
                            <div class="modal__tech-item">
                                <span class="modal__tech-icon">▹</span>
                                <span>${tech}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
                
                <div class="modal__actions">
                    ${project.github ? `
                        <a href="${project.github}" target="_blank" rel="noopener" class="modal__btn modal__btn--primary">
                            <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                            </svg>
                            Ver Código
                        </a>
                    ` : ''}
                    ${project.demo ? `
                        <a href="${project.demo}" target="_blank" rel="noopener" class="modal__btn modal__btn--secondary">
                            <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                                <path d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                            </svg>
                            Ver Demo
                        </a>
                    ` : ''}
                </div>
            </div>
        `;
        
        // Setup galería si hay múltiples imágenes
        if (images.length > 1) {
            this.setupGallery(images);
        }
    }
    
    setupGallery(images) {
        const mainImage = document.getElementById('modal-main-image');
        const prevBtn = document.getElementById('modal-prev-btn');
        const nextBtn = document.getElementById('modal-next-btn');
        const counter = document.getElementById('modal-current-image');
        const thumbnails = document.querySelectorAll('.modal__thumbnail');
        
        const updateImage = (index) => {
            this.currentImageIndex = index;
            mainImage.src = images[index];
            counter.textContent = index + 1;
            
            thumbnails.forEach((thumb, idx) => {
                thumb.classList.toggle('active', idx === index);
            });
        };
        
        prevBtn.addEventListener('click', () => {
            const newIndex = (this.currentImageIndex - 1 + images.length) % images.length;
            updateImage(newIndex);
        });
        
        nextBtn.addEventListener('click', () => {
            const newIndex = (this.currentImageIndex + 1) % images.length;
            updateImage(newIndex);
        });
        
        thumbnails.forEach((thumb, idx) => {
            thumb.addEventListener('click', () => {
                updateImage(idx);
            });
        });
        
        // Navegación con teclado
        document.addEventListener('keydown', (e) => {
            const modal = document.getElementById('project-modal');
            if (modal && modal.classList.contains('active')) {
                if (e.key === 'ArrowLeft') {
                    prevBtn.click();
                } else if (e.key === 'ArrowRight') {
                    nextBtn.click();
                }
            }
        });
    }
}

// Inicializar
document.addEventListener('DOMContentLoaded', () => {
    if (typeof projectsData !== 'undefined') {
        new ProjectsManager(projectsData);
    }
});