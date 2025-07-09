// Backend simulado - Base de datos de usuarios
const users = [
    { username: 'admin', password: 'admin' },
    { username: 'usuario', password: 'usuario123' },
    { username: 'gerente', password: 'gerente123' },
    { username: 'empleado', password: 'empleado123' }
];

// Función para simular delay de red
function simulateNetworkDelay() {
    return new Promise(resolve => setTimeout(resolve, 1000));
}

// Función para autenticar usuario
async function authenticateUser(username, password) {
    // Simular delay de red
    await simulateNetworkDelay();
    
    // Buscar usuario en la "base de datos"
    const user = users.find(u => u.username === username && u.password === password);
    
    if (user) {
        return { success: true, user: user };
    } else {
        return { success: false, message: 'Credenciales inválidas' };
    }
}

// Función para mostrar el modal
function showModal() {
    const modal = document.getElementById('errorModal');
    modal.style.display = 'block';
}

// Función para cerrar el modal
function closeModal() {
    const modal = document.getElementById('errorModal');
    modal.style.display = 'none';
    
    // Limpiar campos y remover clases de error
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    
    emailInput.classList.remove('error');
    passwordInput.classList.remove('error');
    
    // Enfocar el campo de usuario
    emailInput.focus();
}

// Función para mostrar loading en el botón
function showLoading(show) {
    const button = document.getElementById('loginBtn');
    const icon = button.querySelector('i');
    
    if (show) {
        button.disabled = true;
        icon.className = 'loading';
        button.innerHTML = '<span class="loading"></span> Verificando...';
    } else {
        button.disabled = false;
        button.innerHTML = '<i class="fa-solid fa-arrow-right-from-bracket"></i> Iniciar Sesión';
    }
}

// Función para cerrar sesión (CORREGIDA)
function cerrarSesion() {
    // 1. Eliminar los datos de sesión
    sessionStorage.removeItem('currentUser');
    sessionStorage.removeItem('loginTime');
    
    // 2. Agregar flag temporal para evitar redirecciones automáticas
    sessionStorage.setItem('logoutInProgress', 'true');
    
    // 3. Redirigir al login después de un pequeño delay
    setTimeout(() => {
        window.location.replace('index.html'); // Usar replace en lugar de href
    }, 100);
    
    return false;
}

// Manejar el envío del formulario
document.getElementById('loginForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const username = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    
    // Validar que los campos no estén vacíos
    if (!username || !password) {
        showModal();
        return;
    }
    
    // Mostrar loading
    showLoading(true);
    
    try {
        // Intentar autenticar
        const result = await authenticateUser(username, password);
        
        if (result.success) {
            // Login exitoso - guardar sesión simulada
            sessionStorage.setItem('currentUser', JSON.stringify(result.user));
            sessionStorage.setItem('loginTime', new Date().toISOString());
            
            // Mostrar mensaje de éxito brevemente
            const button = document.getElementById('loginBtn');
            button.innerHTML = '<i class="fa-solid fa-check"></i> ¡Bienvenido!';
            button.style.background = '#28a745';
            
            // Redirigir después de un breve delay
            setTimeout(() => {
                window.location.href = 'home.html';
            }, 1500);
            
        } else {
            // Login fallido
            showLoading(false);
            
            // Agregar clase de error a los campos
            document.getElementById('email').classList.add('error');
            document.getElementById('password').classList.add('error');
            
            // Mostrar modal de error
            showModal();
        }
        
    } catch (error) {
        console.error('Error en la autenticación:', error);
        showLoading(false);
        showModal();
    }
});

// Cerrar modal al hacer clic fuera de él
window.onclick = function(event) {
    const modal = document.getElementById('errorModal');
    if (event.target === modal) {
        closeModal();
    }
}

// Cerrar modal con la tecla Escape
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeModal();
    }
});

// Remover clase de error al comenzar a escribir
document.getElementById('email').addEventListener('input', function() {
    this.classList.remove('error');
});

document.getElementById('password').addEventListener('input', function() {
    this.classList.remove('error');
});

// Control de sesión mejorado (CORREGIDO)
window.addEventListener('load', function() {
    const currentUser = sessionStorage.getItem('currentUser');
    const logoutInProgress = sessionStorage.getItem('logoutInProgress');
    const isLoginPage = window.location.pathname.includes('index.html') || 
                       window.location.pathname.endsWith('/') || 
                       window.location.pathname === '';
    
    // Si hay un logout en progreso, limpiar el flag y permitir la carga
    if (logoutInProgress) {
        sessionStorage.removeItem('logoutInProgress');
        return; // No hacer redirecciones automáticas
    }
    
    // Solo aplicar redirecciones automáticas si no hay logout en progreso
    if (currentUser && isLoginPage) {
        // Si hay sesión y estamos en la página de login, redirigir a home
        window.location.replace('home.html');
    } else if (!currentUser && !isLoginPage) {
        // Si no hay sesión y no estamos en login, redirigir a index
        window.location.replace('index.html');
    }
});

// Verificar sesión en páginas protegidas (opcional)
function verificarSesion() {
    const currentUser = sessionStorage.getItem('currentUser');
    const isLoginPage = window.location.pathname.includes('index.html') || 
                       window.location.pathname.endsWith('/') || 
                       window.location.pathname === '';
    
    if (!currentUser && !isLoginPage) {
        window.location.replace('index.html');
        return false;
    }
    return true;
}