// VARIABLES (const, let)

const LOGIN_KEY = 'climalab_admin_session';
// DOM (getElementById)

const loginForm = document.getElementById('loginForm');
const loginUser = document.getElementById('loginUser');
const loginPass = document.getElementById('loginPass');
const loginError = document.getElementById('loginError');

// LOCALSTORAGE
function verificarSesion() {
    const session = localStorage.getItem(LOGIN_KEY);
    if (session === 'true') {
        window.location.href = 'admin-panel.html';
    }
}


// EVENTOS (submit)

loginForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const usuario = loginUser.value.trim().toLowerCase();
    const contrasena = loginPass.value.trim();

    const USUARIO_VALIDO = 'admin';
    const CONTRASENA_VALIDA = '1234';

    if (usuario === USUARIO_VALIDO && contrasena === CONTRASENA_VALIDA) {
        localStorage.setItem(LOGIN_KEY, 'true');
        
        const btn = loginForm.querySelector('button[type="submit"]');
        btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin me-2"></i>Ingresando...';
        
        setTimeout(() => {
            window.location.href = 'admin-panel.html';
        }, 500);
    } else {
        loginError.style.display = 'block';
        loginPass.value = '';
        loginPass.focus();
        
        setTimeout(() => {
            loginError.style.display = 'none';
        }, 3000);
    }
});

verificarSesion();