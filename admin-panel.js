// ============================================================
// 1. VARIABLES (const, let)
// ============================================================
const STORAGE_KEY = 'climalab_candidatos';
const LOGIN_KEY = 'climalab_admin_session';

let candidatos = [];

// ============================================================
// 2. DOM (getElementById)
// ============================================================
const tablaCandidatos = document.getElementById('tablaCandidatosAdmin');
const totalCandidatos = document.getElementById('totalCandidatos');
const cvsConArchivo = document.getElementById('cvsConArchivo');
const puestosUnicos = document.getElementById('puestosUnicos');
const totalCandidatosBadge = document.getElementById('totalCandidatosBadge');
const mensajeVacio = document.getElementById('mensajeVacioAdmin');
const buscador = document.getElementById('buscadorAdmin');
const filtroPuesto = document.getElementById('filtroPuestoAdmin');
const btnEliminarTodos = document.getElementById('btnEliminarTodosAdmin');
const btnCerrarSesion = document.getElementById('btnCerrarSesion');
const notificacion = document.getElementById('notificacionAdmin');

// ============================================================
// 12. LOCALSTORAGE + 13. JSON
// ============================================================
function cargarDatos() {
    // Verificar sesión
    const session = localStorage.getItem(LOGIN_KEY);
    if (session !== 'true') {
        window.location.href = 'admin-login.html';
        return;
    }

    const data = localStorage.getItem(STORAGE_KEY);
    if (data) {
        candidatos = JSON.parse(data);
    } else {
        candidatos = [];
        guardarDatos();
    }
}

function guardarDatos() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(candidatos));
}

// ============================================================
// 4. FUNCIONES
// ============================================================
function mostrarNotificacion(mensaje, tipo = 'success') {
    notificacion.textContent = mensaje;
    notificacion.className = tipo;
    notificacion.classList.add('mostrar');
    
    setTimeout(() => {
        notificacion.classList.remove('mostrar');
    }, 3000);
}

function obtenerPuestosUnicos() {
    const puestos = candidatos.map(c => c.puesto).filter(p => p);
    return new Set(puestos).size;
}

function actualizarFiltroPuestos() {
    // Obtener puestos únicos de los candidatos actuales
    const puestosActuales = [...new Set(candidatos.map(c => c.puesto).filter(p => p))];
    
    // Guardar el valor seleccionado actualmente
    const valorActual = filtroPuesto.value;
    
    // Limpiar opciones (mantener solo "Todos")
    filtroPuesto.innerHTML = '<option value="todos">Todos los puestos</option>';
    
    // Agregar cada puesto como opción
    puestosActuales.forEach(p => {
        const opt = document.createElement('option');
        opt.value = p;
        opt.textContent = p;
        filtroPuesto.appendChild(opt);
    });
    
    // Restaurar el valor seleccionado si existe
    if (valorActual !== 'todos' && puestosActuales.includes(valorActual)) {
        filtroPuesto.value = valorActual;
    }
}

// ============================================================
// 8. MANIPULACIÓN DEL HTML (innerHTML, textContent)
// ============================================================
function renderizarCandidatos() {
    // 11. STRINGS (toLowerCase, includes)
    const busqueda = buscador.value.toLowerCase().trim();
    const puestoFiltro = filtroPuesto.value;

    // 6. ARRAYS + 7. MÉTODOS (filter)
    let filtrados = candidatos.filter(c => {
        const coincideNombre = c.nombre.toLowerCase().includes(busqueda) || 
                               c.email.toLowerCase().includes(busqueda) ||
                               c.puesto.toLowerCase().includes(busqueda);
        const coincidePuesto = puestoFiltro === 'todos' || c.puesto === puestoFiltro;
        return coincideNombre && coincidePuesto;
    });

    // Actualizar estadísticas
    totalCandidatos.textContent = candidatos.length;
    cvsConArchivo.textContent = candidatos.filter(c => c.archivo).length;
    puestosUnicos.textContent = obtenerPuestosUnicos();
    totalCandidatosBadge.textContent = `${candidatos.length} candidatos`;

    // Actualizar el filtro de puestos
    actualizarFiltroPuestos();

    if (filtrados.length === 0) {
        mensajeVacio.classList.remove('d-none');
        tablaCandidatos.innerHTML = '';
        return;
    }

    mensajeVacio.classList.add('d-none');

    // 15. TEMPLATE LITERALS (${})
    tablaCandidatos.innerHTML = filtrados.map((c, index) => `
        <tr>
            <td>${index + 1}</td>
            <td><strong>${c.nombre}</strong></td>
            <td>${c.email}</td>
            <td><span class="badge bg-info">${c.puesto}</span></td>
            <td>${c.fecha}</td>
            <td>
                ${c.archivo ? `<i class="fa-regular fa-file-pdf text-danger me-1"></i>${c.archivo}` : 
                             `<span class="text-muted"><i class="fa-regular fa-file me-1"></i>Sin archivo</span>`}
            </td>
            <td>
                <button class="btn btn-sm btn-outline-danger" onclick="eliminarCandidato(${c.id})">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </td>
        </tr>
    `).join('');
}

// ============================================================
// 3. EVENTOS (click, submit, keyup)
// ============================================================

// 3.1 Buscador - KEYUP
buscador.addEventListener('keyup', function() {
    renderizarCandidatos();
});

// 3.2 Filtro - CHANGE
filtroPuesto.addEventListener('change', function() {
    renderizarCandidatos();
});

// 3.3 Eliminar todos - CLICK
btnEliminarTodos.addEventListener('click', function() {
    if (candidatos.length === 0) {
        mostrarNotificacion('⚠️ No hay candidatos para eliminar', 'warning');
        return;
    }
    
    if (!confirm('⚠️ ¿Eliminar TODOS los candidatos?')) return;
    
    candidatos.splice(0, candidatos.length);
    guardarDatos();
    renderizarCandidatos();
    mostrarNotificacion('🗑️ Todos los candidatos eliminados', 'warning');
});

// 3.4 Cerrar sesión - CLICK (¡ARREGLADO!)
btnCerrarSesion.addEventListener('click', function(e) {
    e.preventDefault();
    
    // 14. OPERADORES (!)
    if (!confirm('¿Seguro que querés cerrar sesión?')) return;
    
    // Eliminar la sesión del localStorage
    localStorage.removeItem(LOGIN_KEY);
    
    // Mostrar notificación antes de redirigir
    mostrarNotificacion('👋 Sesión cerrada correctamente');
    
    // Redirigir al login después de un momento
    setTimeout(() => {
        window.location.href = 'admin-login.html';
    }, 500);
});

// ============================================================
// 3. FUNCIONES GLOBALES (para onclick)
// ============================================================
function eliminarCandidato(id) {
    if (!confirm('¿Eliminar este candidato?')) return;

    const index = candidatos.findIndex(c => c.id === id);
    if (index !== -1) {
        candidatos.splice(index, 1);
        guardarDatos();
        renderizarCandidatos();
        mostrarNotificacion('🗑️ Candidato eliminado', 'warning');
    }
}

// ============================================================
// 16. TEMPORIZADORES (setTimeout)
// ============================================================
setTimeout(() => {
    console.log('🔐 Panel de administración cargado');
    console.log(`📊 ${candidatos.length} candidatos gestionados`);
}, 1000);

cargarDatos();
renderizarCandidatos();