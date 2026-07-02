// =====================================
// CLIMALAB - JavaScript Premium
// =====================================

document.addEventListener('DOMContentLoaded', function() {

    console.log('🚀 ClimaLab iniciado');

    // ===== 1. PRELOADER =====
    window.addEventListener('load', function() {
        const preloader = document.getElementById('preloader');
        if (preloader) {
            preloader.classList.add('oculto');
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 700);
        }
    });

    setTimeout(function() {
        const preloader = document.getElementById('preloader');
        if (preloader && !preloader.classList.contains('oculto')) {
            preloader.classList.add('oculto');
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 700);
        }
    }, 4000);

    // ===== 2. NAVBAR SCROLL =====
    const navbar = document.getElementById('navbar');
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 80) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // ===== 3. CONTADORES ANIMADOS =====
    function animarContadores() {
        const contadores = document.querySelectorAll('.contador');
        contadores.forEach(contador => {
            const target = parseInt(contador.getAttribute('data-target'));
            if (isNaN(target)) return;
            let current = 0;
            const incremento = Math.ceil(target / 60);
            const paso = 1500 / 60;
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const intervalo = setInterval(() => {
                            current += incremento;
                            if (current >= target) {
                                current = target;
                                clearInterval(intervalo);
                            }
                            contador.textContent = current;
                        }, paso);
                        observer.unobserve(contador);
                    }
                });
            }, { threshold: 0.5 });
            observer.observe(contador);
        });
    }

    setTimeout(animarContadores, 1000);

    // ===== 4. TIMELINE CARDS =====
    const timelineCards = document.querySelectorAll('.timeline-card, .timeline-h-item');
    if (timelineCards.length > 0) {
        const observerTimeline = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('show');
                }
            });
        }, { threshold: 0.3 });
        timelineCards.forEach(card => {
            observerTimeline.observe(card);
        });
    }

    // ===== 5. SCROLL SUAVE =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const navbarHeight = document.querySelector('#navbar')?.offsetHeight || 80;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ===== 6. PARALLAX EN HERO =====
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            if (scrolled < window.innerHeight) {
                hero.style.backgroundPositionY = scrolled * 0.5 + 'px';
            }
        });
    }

    // ===== 7. CIERRE DEL MENÚ MÓVIL =====
    const navLinks = document.querySelectorAll('.nav-link');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                const togglerBtn = document.querySelector('.navbar-toggler');
                if (togglerBtn) {
                    togglerBtn.click();
                }
            }
        });
    });

    console.log('✅ ClimaLab - Todo listo');
});

// ===== 8. AOS =====
if (typeof AOS !== 'undefined') {
    AOS.init({
        duration: 800,
        once: true,
        offset: 100,
        easing: 'ease-out-cubic'
    });
    console.log('✅ AOS inicializado');
}