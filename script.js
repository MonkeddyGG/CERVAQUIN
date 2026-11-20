/**
 * CERVAQUIN Soluciones en Ingeniería S.A. de C.V.
 * Lógica Vanilla JS (ES6+) desacoplada y escalable
 */

const COMPANY_WHATSAPP = '5218110662566';

document.addEventListener('DOMContentLoaded', () => {
    initMobileNav();
    initStickyHeader();
    initGalleryFilter();
    initLightbox();
    initQuoteForm();
    initFooterYear();
});

/**
 * 1. Menú responsivo en dispositivos móviles
 */
function initMobileNav() {
    const navToggle = document.getElementById('navToggle');
    const primaryNav = document.getElementById('primaryNav');
    const navLinks = primaryNav.querySelectorAll('a');

    if (!navToggle || !primaryNav) return;

    navToggle.addEventListener('click', () => {
        const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
        navToggle.setAttribute('aria-expanded', String(!isExpanded));
        primaryNav.classList.toggle('open');
    });

    navLinks.forEach((link) => {
        link.addEventListener('click', () => {
            primaryNav.classList.remove('open');
            navToggle.setAttribute('aria-expanded', 'false');
        });
    });
}

/**
 * 2. Sombra dinámica en el Header al hacer scroll
 */
function initStickyHeader() {
    const header = document.getElementById('header');
    if (!header) return;

    window.addEventListener('scroll', () => {
        header.classList.toggle('scrolled', window.scrollY > 30);
    }, { passive: true });
}

/**
 * 3. Filtrado interactivo de galería por especialidad
 */
function initGalleryFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    if (!filterButtons.length) return;

    filterButtons.forEach((btn) => {
        btn.addEventListener('click', () => {
            filterButtons.forEach((b) => {
                b.classList.remove('active');
                b.setAttribute('aria-selected', 'false');
            });

            btn.classList.add('active');
            btn.setAttribute('aria-selected', 'true');

            const category = btn.dataset.filter;

            galleryItems.forEach((item) => {
                const matches = category === 'all' || item.dataset.category === category;
                item.classList.toggle('hidden', !matches);
            });
        });
    });
}

/**
 * 4. Lightbox modal para ampliar fotografías de proyectos
 */
function initLightbox() {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxCaption = document.getElementById('lightboxCaption');
    const lightboxClose = document.getElementById('lightboxClose');
    const galleryItems = document.querySelectorAll('.gallery-item');

    if (!lightbox) return;

    galleryItems.forEach((item) => {
        item.addEventListener('click', () => {
            const img = item.querySelector('img');
            const caption = item.querySelector('figcaption strong')?.textContent || '';

            lightboxImg.src = img.src;
            lightboxImg.alt = img.alt;
            lightboxCaption.textContent = caption;
            lightbox.classList.add('open');
            lightbox.setAttribute('aria-hidden', 'false');
        });
    });

    const closeModal = () => {
        lightbox.classList.remove('open');
        lightbox.setAttribute('aria-hidden', 'true');
        lightboxImg.src = '';
    };

    lightboxClose.addEventListener('click', closeModal);
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeModal();
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('open')) closeModal();
    });
}

/**
 * 5. Validación de formulario y generación de cotización directa a WhatsApp
 */
function initQuoteForm() {
    const form = document.getElementById('quoteForm');
    const feedback = document.getElementById('formFeedback');

    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const data = {
            name: form.clientName.value.trim(),
            phone: form.clientPhone.value.trim(),
            email: form.clientEmail.value.trim(),
            state: form.projectState.value,
            service: form.serviceType.value,
            details: form.projectDetails.value.trim(),
        };

        if (!data.name || !data.phone || !data.email || !data.state || !data.service || !data.details) {
            feedback.style.color = '#D93025';
            feedback.textContent = 'Por favor completa todos los campos obligatorios marcados con *.';
            return;
        }

        const message = [
            `*SOLICITUD DE COTIZACIÓN - WEB CERVAQUIN*`,
            `*Cliente / Empresa:* ${data.name}`,
            `*Teléfono:* ${data.phone}`,
            `*Correo:* ${data.email}`,
            `*Ubicación de Obra:* ${data.state}`,
            `*Servicio:* ${data.service}`,
            `*Especificaciones:* ${data.details}`
        ].join('\n');

        const whatsappUrl = `https://wa.me/${COMPANY_WHATSAPP}?text=${encodeURIComponent(message)}`;

        feedback.style.color = '#188038';
        feedback.textContent = 'Redirigiendo a WhatsApp corporativo de CERVAQUIN con tu solicitud...';

        window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
        form.reset();
    });
}

/**
 * 6. Año dinámico en el Footer
 */
function initFooterYear() {
    const yearEl = document.getElementById('currentYear');
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }
}