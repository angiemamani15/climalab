// ============================================================
// 1. VARIABLES (const, let)
// ============================================================
const STORAGE_KEY = 'climalab_candidatos';

let candidatos = [];

// ============================================================
// 2. DOM (getElementById)
// ============================================================
const servicio = document.getElementById('servicio');
const empleados = document.getElementById('empleados');
const btnCotizar = document.getElementById('btnCotizar');
const resultadoCotizacion = document.getElementById('resultadoCotizacion');

const puestoSalario = document.getElementById('puestoSalario');
const aniosExperiencia = document.getElementById('aniosExperiencia');
const btnEstimar = document.getElementById('btnEstimarSalario');
const resultadoSalario = document.getElementById('resultadoSalario');

const formCV = document.getElementById('formCV');
const nombre = document.getElementById('nombre');
const email = document.getElementById('email');
const puesto = document.getElementById('puesto');
const archivo = document.getElementById('archivo');
const resultadoCV = document.getElementById('resultadoCV');

const notificacion = document.getElementById('notificacion');

// ============================================================
// 12. LOCALSTORAGE + 13. JSON (stringify, parse)
// ============================================================
function cargarDatos() {
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
function generarId() {
    return candidatos.length > 0 ? Math.max(...candidatos.map(c => c.id)) + 1 : 1;
}

function obtenerFechaActual() {
    return new Date().toISOString().split('T')[0];
}

function mostrarNotificacion(mensaje, tipo = 'success') {
    notificacion.textContent = mensaje;
    notificacion.className = tipo;
    notificacion.classList.add('mostrar');
    
    // 16. TEMPORIZADORES (setTimeout)
    setTimeout(() => {
        notificacion.classList.remove('mostrar');
    }, 3000);
}

// ============================================================
// 3. EVENTOS (click, submit)
// ============================================================

// 3.1 Cotizador - CLICK
btnCotizar.addEventListener('click', function() {
    // 10. CONVERSIÓN DE DATOS (parseInt)
    const valorServicio = parseInt(servicio.value);
    const cantEmpleados = parseInt(empleados.value);

    // 14. OPERADORES (||, !)
    if (!valorServicio || !cantEmpleados || cantEmpleados < 1) {
        resultadoCotizacion.className = 'resultado error mostrar';
        resultadoCotizacion.textContent = '⚠️ Seleccioná un servicio y una cantidad válida de empleados.';
        return;
    }

    const total = valorServicio * cantEmpleados;
    const descuento = cantEmpleados > 10 ? total * 0.1 : 0;
    const final = total - descuento;

    // 15. TEMPLATE LITERALS (${})
    resultadoCotizacion.className = 'resultado mostrar';
    resultadoCotizacion.innerHTML = `
        <div>
            <strong>💰 Cotización:</strong><br>
            Base: $${total.toLocaleString()}<br>
            ${descuento > 0 ? `Descuento 10%: -$${descuento.toLocaleString()}<br>` : ''}
            <strong>Total: $${final.toLocaleString()}</strong>
        </div>
    `;

    mostrarNotificacion('✅ Cotización realizada con éxito');
});

// 3.2 Estimador de Salario - CLICK
btnEstimar.addEventListener('click', function() {
    const puesto = puestoSalario.value;
    // 10. CONVERSIÓN DE DATOS (parseInt)
    const experiencia = parseInt(aniosExperiencia.value) || 0;

    // 5. OBJETOS - base de datos de salarios
    const salariosBase = {
        'desarrollador': 1200000,
        'analista': 1100000,
        'disenador': 1000000,
        'project': 1300000,
        'marketing': 950000
    };

    const base = salariosBase[puesto] || 0;

    // 14. OPERADORES (||, !)
    if (!puesto) {
        resultadoSalario.className = 'resultado error mostrar';
        resultadoSalario.textContent = '⚠️ Seleccioná un puesto.';
        return;
    }

    // Cálculo: +5% por año de experiencia
    const incremento = experiencia * 0.05;
    const salarioEstimado = Math.round(base * (1 + incremento));

    resultadoSalario.className = 'resultado mostrar';
    resultadoSalario.innerHTML = `
        <div>
            <strong>📊 Salario Estimado:</strong><br>
            Puesto: ${puestoSalario.options[puestoSalario.selectedIndex].text}<br>
            Experiencia: ${experiencia} años<br>
            <strong>$${salarioEstimado.toLocaleString()} ARS</strong>
        </div>
    `;

    mostrarNotificacion('📊 Salario estimado calculado');
});

// 3.3 Formulario CV - SUBMIT
formCV.addEventListener('submit', function(e) {
    // 9. FORMULARIOS (preventDefault, value, reset)
    e.preventDefault();

    const nombreVal = nombre.value.trim();
    const emailVal = email.value.trim();
    const puestoVal = puesto.value.trim();
    const archivoVal = archivo.value;

    // 11. STRINGS (toLowerCase, includes)
    if (nombreVal.length < 3) {
        resultadoCV.className = 'resultado error mostrar';
        resultadoCV.textContent = '⚠️ El nombre debe tener al menos 3 caracteres.';
        return;
    }

    if (!emailVal.includes('@') || !emailVal.includes('.')) {
        resultadoCV.className = 'resultado error mostrar';
        resultadoCV.textContent = '⚠️ Ingresá un email válido.';
        return;
    }

    // 5. OBJETOS - nuevo candidato
    const nuevoCandidato = {
        id: generarId(),
        nombre: nombreVal,
        email: emailVal,
        puesto: puestoVal,
        fecha: obtenerFechaActual(),
        archivo: archivoVal.split('\\').pop() // nombre del archivo
    };

    // 6. ARRAYS + 7. MÉTODOS (push)
    candidatos.push(nuevoCandidato);
    guardarDatos();

    // 9. FORMULARIOS (reset)
    formCV.reset();
    resultadoCV.className = 'resultado mostrar';
    resultadoCV.innerHTML = `✅ ¡CV de <strong>${nombreVal}</strong> registrado con éxito!`;

    mostrarNotificacion(`✅ CV de ${nombreVal} registrado`);
});

// ============================================================
// 16. TEMPORIZADORES (setTimeout) - Mensaje de bienvenida
// ============================================================
setTimeout(() => {
    console.log('🚀 Herramientas HR de ClimaLab cargadas');
    console.log(`📊 ${candidatos.length} candidatos registrados`);
}, 1000);

// ============================================================
// INICIALIZACIÓN
// ============================================================
cargarDatos();