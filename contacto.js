// =====================================
// CLIMALAB - CONTACTO
// =====================================

document.addEventListener('DOMContentLoaded', function() {

    console.log('📩 ClimaLab - Página de Contacto');

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

    // Fallback
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

    // ===== 3. AOS =====
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            once: true,
            offset: 100,
            easing: 'ease-out-cubic'
        });
        console.log('✅ AOS inicializado');
    }

    // ===== 4. FORMULARIO =====
const form = document.getElementById('formContacto');
const btnEnviar = document.getElementById('btnEnviar');
const btnTexto = btnEnviar.querySelector('.btn-texto');
const btnLoading = btnEnviar.querySelector('.btn-loading');
const mensajeExito = document.getElementById('mensajeEnviado');

// Asegurar que el mensaje de éxito esté oculto al cargar
mensajeExito.classList.remove('show');
mensajeExito.style.display = 'none';

form.addEventListener('submit', function(e) {
    e.preventDefault();

    // === VALIDACIÓN ===
    const nombre = document.getElementById('nombre').value.trim();
    const email = document.getElementById('email').value.trim();
    const asunto = document.getElementById('asunto').value;
    const mensaje = document.getElementById('mensaje').value.trim();

    // Remover errores anteriores
    const errorAnterior = form.querySelector('.mensaje-error');
    if (errorAnterior) errorAnterior.remove();

    // Ocultar mensaje de éxito anterior
    mensajeExito.classList.remove('show');
    mensajeExito.style.display = 'none';

    // Validar campos
    if (!nombre || !email || !asunto || !mensaje) {
        mostrarError('Por favor, completá todos los campos obligatorios (*).');
        return;
    }

    if (!validarEmail(email)) {
        mostrarError('Por favor, ingresá un correo electrónico válido.');
        return;
    }

    // === SIMULAR ENVÍO ===
    // Mostrar loading
    btnTexto.style.display = 'none';
    btnLoading.style.display = 'inline-block';
    btnEnviar.classList.add('cargando');
    btnEnviar.disabled = true;

    // Simular tiempo de envío (2 segundos)
    setTimeout(() => {
        // Ocultar loading
        btnTexto.style.display = 'inline-block';
        btnLoading.style.display = 'none';
        btnEnviar.classList.remove('cargando');
        btnEnviar.disabled = false;

        // === MOSTRAR MENSAJE DE ÉXITO ===
        mensajeExito.style.display = 'flex';
        mensajeExito.classList.add('show');
        mensajeExito.innerHTML = `
            <i class="fas fa-check-circle"></i>
            <span>¡Mensaje enviado con éxito! Te contactaremos a la brevedad.</span>
        `;

        // Resetear formulario
        form.reset();

        // Ocultar mensaje después de 5 segundos
        setTimeout(() => {
            mensajeExito.classList.remove('show');
            mensajeExito.style.display = 'none';
        }, 5000);

    }, 2000);
});

    // ===== 5. FUNCIONES DE VALIDACIÓN =====
    function validarEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    function mostrarError(mensaje) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'mensaje-error';
        errorDiv.style.cssText = `
            display: flex;
            align-items: center;
            gap: 10px;
            padding: 12px 16px;
            border-radius: 12px;
            background: rgba(220, 38, 38, 0.08);
            border: 1px solid rgba(220, 38, 38, 0.15);
            color: #dc2626;
            font-weight: 500;
            margin-top: 10px;
            animation: fadeInUp 0.4s ease;
        `;
        errorDiv.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${mensaje}`;
        
        // Insertar después del botón
        btnEnviar.parentNode.insertBefore(errorDiv, btnEnviar.nextSibling);
        
        // Auto-remover después de 4 segundos
        setTimeout(() => {
            if (errorDiv.parentNode) {
                errorDiv.style.opacity = '0';
                errorDiv.style.transition = 'opacity 0.4s ease';
                setTimeout(() => errorDiv.remove(), 400);
            }
        }, 4000);
    }

    // ===== 6. SCROLL SUAVE =====
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

    console.log('✅ ClimaLab - Contacto listo');
});