// ========================================
// MENU MOBILE
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menuToggle');
    const mobileNav = document.getElementById('mobileNav');
    const navLinks = document.querySelectorAll('.nav-link-mobile');

    // Toggle menu
    menuToggle.addEventListener('click', function() {
        menuToggle.classList.toggle('active');
        mobileNav.classList.toggle('active');
    });

    // Fechar menu ao clicar em um link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            menuToggle.classList.remove('active');
            mobileNav.classList.remove('active');
        });
    });

    // Fechar menu ao clicar fora
    document.addEventListener('click', function(event) {
        const isClickInsideMenu = mobileNav.contains(event.target);
        const isClickInsideToggle = menuToggle.contains(event.target);

        if (!isClickInsideMenu && !isClickInsideToggle && mobileNav.classList.contains('active')) {
            menuToggle.classList.remove('active');
            mobileNav.classList.remove('active');
        }
    });
});

// ========================================
// SCROLL SUAVE
// ========================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ========================================
// HEADER STICKY
// ========================================

window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 50) {
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.3)';
    } else {
        header.style.boxShadow = 'none';
    }
});

// ========================================
// LAZY LOADING DE IMAGENS
// ========================================

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                observer.unobserve(img);
            }
        });
    }, {
        rootMargin: '50px'
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ========================================
// ANIMAÇÕES AO SCROLL
// ========================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observar elementos para animação
document.querySelectorAll('.service-card, .gallery-item, .product-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ========================================
// ANALYTICS E TRACKING
// ========================================

// Rastrear cliques em botões WhatsApp
document.querySelectorAll('a[href*="wa.me"]').forEach(link => {
    link.addEventListener('click', function() {
        console.log('WhatsApp link clicked');
        // Aqui você pode adicionar código de analytics
    });
});

// ========================================
// VALIDAÇÃO DE PERFORMANCE
// ========================================

// Medir Core Web Vitals
if ('PerformanceObserver' in window) {
    try {
        // Largest Contentful Paint
        const lcpObserver = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            const lastEntry = entries[entries.length - 1];
            console.log('LCP:', lastEntry.renderTime || lastEntry.loadTime);
        });
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

        // First Input Delay
        const fidObserver = new PerformanceObserver((list) => {
            const entries = list.getEntries();
            entries.forEach((entry) => {
                console.log('FID:', entry.processingDuration);
            });
        });
        fidObserver.observe({ entryTypes: ['first-input'] });

        // Cumulative Layout Shift
        let clsValue = 0;
        const clsObserver = new PerformanceObserver((list) => {
            list.getEntries().forEach((entry) => {
                if (!entry.hadRecentInput) {
                    clsValue += entry.value;
                    console.log('CLS:', clsValue);
                }
            });
        });
        clsObserver.observe({ entryTypes: ['layout-shift'] });
    } catch (e) {
        console.log('Performance Observer not supported');
    }
}

// ========================================
// MODO ESCURO/CLARO (OPCIONAL)
// ========================================

function initTheme() {
    // Detectar preferência do sistema
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = localStorage.getItem('theme') || (prefersDark ? 'dark' : 'light');
    
    // Aplicar tema padrão (escuro)
    document.documentElement.setAttribute('data-theme', 'dark');
}

initTheme();

// ========================================
// PRELOAD DE RECURSOS CRÍTICOS
// ========================================

function preloadCriticalResources() {
    // Preload de fontes
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'font';
    link.href = 'https://fonts.gstatic.com/s/playfairdisplay/v30/nuFvD-vgj4_155wkEsqf7pHrpYuAoUsQpCnM.woff2';
    link.crossOrigin = 'anonymous';
    document.head.appendChild(link);
}

// Executar após o carregamento da página
window.addEventListener('load', preloadCriticalResources);

// ========================================
// DETECÇÃO DE CONEXÃO LENTA
// ========================================

function detectSlowConnection() {
    if ('connection' in navigator) {
        const connection = navigator.connection;
        const effectiveType = connection.effectiveType;

        if (effectiveType === '4g') {
            console.log('Fast connection detected');
        } else if (effectiveType === '3g') {
            console.log('3G connection detected - reducing image quality');
            // Aqui você pode reduzir a qualidade das imagens
        } else if (effectiveType === '2g') {
            console.log('Slow connection detected - using low quality images');
            // Usar imagens de baixa qualidade
        }
    }
}

detectSlowConnection();

// ========================================
// SCROLL PARA TOPO
// ========================================

function createScrollToTopButton() {
    const button = document.createElement('button');
    button.id = 'scrollToTop';
    button.innerHTML = '↑';
    button.style.cssText = `
        position: fixed;
        bottom: 100px;
        right: 24px;
        width: 48px;
        height: 48px;
        background-color: #D4AF37;
        color: #0A0A0A;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        display: none;
        align-items: center;
        justify-content: center;
        font-size: 24px;
        font-weight: bold;
        transition: all 0.3s ease;
        z-index: 39;
        box-shadow: 0 4px 12px rgba(212, 175, 55, 0.3);
    `;

    document.body.appendChild(button);

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            button.style.display = 'flex';
        } else {
            button.style.display = 'none';
        }
    });

    button.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    button.addEventListener('mouseenter', () => {
        button.style.backgroundColor = '#B8860B';
        button.style.transform = 'scale(1.1)';
    });

    button.addEventListener('mouseleave', () => {
        button.style.backgroundColor = '#D4AF37';
        button.style.transform = 'scale(1)';
    });
}

// Criar botão de scroll para topo
createScrollToTopButton();

// ========================================
// INICIALIZAÇÃO
// ========================================

console.log('Marcos Paulo Barbearia - Site carregado com sucesso!');
