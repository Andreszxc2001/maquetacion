// Toggle sidebar - FUNCIÓN CORREGIDA
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('collapsed');
    
    // Si está en mobile y se abre el sidebar, agregar overlay
    if (window.innerWidth <= 768 && !sidebar.classList.contains('collapsed')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = 'auto';
    }
}

// Toggle dropdown menu
function toggleDropdown() {
    const dropdown = document.getElementById('dropdownMenu');
    dropdown.classList.toggle('show');
}

// Close dropdown when clicking outside
window.onclick = function(event) {
    if (!event.target.matches('.user-menu') && !event.target.closest('.user-menu')) {
        const dropdowns = document.getElementsByClassName("dropdown-menu");
        for (let i = 0; i < dropdowns.length; i++) {
            const openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}

// Cerrar sidebar cuando se hace click fuera (solo en mobile)
document.addEventListener('click', function(e) {
    if (window.innerWidth <= 768) {
        const sidebar = document.getElementById('sidebar');
        if (!sidebar.contains(e.target) && !e.target.closest('.toggle-btn')) {
            sidebar.classList.add('collapsed');
            document.body.style.overflow = 'auto';
        }
    }
});

// Auto-collapse sidebar on mobile
window.addEventListener('resize', function() {
    if (window.innerWidth <= 768) {
        document.getElementById('sidebar').classList.add('collapsed');
    }
});

// Initialize mobile view
if (window.innerWidth <= 768) {
    document.getElementById('sidebar').classList.add('collapsed');
}

        // Modal functions
        function openModal(modalId) {
            document.getElementById(modalId).classList.add('show');
        }

        function closeModal(modalId) {
            document.getElementById(modalId).classList.remove('show');
        }

        // Cerrar sesión
        function cerrarSesion() {
            alert("Sesión cerrada correctamente");
            // Aquí iría la lógica para cerrar sesión
            // window.location.href = "login.html";
        }

        // Navigation function
        function navigateTo(section) {
            // Remove active class from all nav links
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
            });
            
            // Add active class to clicked link
            event.target.closest('.nav-link').classList.add('active');
            
            // Update page title
            const pageTitle = document.getElementById('pageTitle');
            const contentArea = document.getElementById('contentArea');
            
            // Close dropdown if open
            const dropdown = document.getElementById('dropdownMenu');
            if (dropdown.classList.contains('show')) {
                dropdown.classList.remove('show');
            }
            
            switch(section) {
                case 'dashboard':
                    pageTitle.textContent = 'Inicio';
                    contentArea.innerHTML = `
                        <div class="welcome-section">
                            <h2 class="welcome-title">¡Bienvenido a Surtidorados!</h2>
                            <p class="welcome-subtitle">El mejor pollo doradito - Broaster</p>
                        </div>
                        <div class="dashboard-grid">
                            <div class="dashboard-card">
                                <div class="card-header">
                                    <h3 class="card-title">Ventas Hoy</h3>
                                    <div class="card-icon"><i class="fa-solid fa-dollar-sign"></i></div>
                                </div>
                                <div class="card-value">$2,450,000</div>
                                <div class="card-description">+15% vs ayer</div>
                            </div>
                            <div class="dashboard-card">
                                <div class="card-header">
                                    <h3 class="card-title">Ventas Activas</h3>
                                    <div class="card-icon"><i class="fa-solid fa-clock"></i></div>
                                </div>
                                <div class="card-value">23</div>
                                <div class="card-description">En preparación</div>
                            </div>
                            <div class="dashboard-card">
                                <div class="card-header">
                                    <h3 class="card-title">Ingredientes</h3>
                                    <div class="card-icon"><i class="fa-solid fa-utensils"></i></div>
                                </div>
                                <div class="card-value">15</div>
                                <div class="card-description">En inventario</div>
                            </div>
                            <div class="dashboard-card">
                                <div class="card-header">
                                    <h3 class="card-title">Usuarios</h3>
                                    <div class="card-icon"><i class="fa-solid fa-users"></i></div>
                                </div>
                                <div class="card-value">5</div>
                                <div class="card-description">Registrados</div>
                            </div>
                        </div>
                    `;
                    break;
                case 'ventas':
                    pageTitle.textContent = 'Registrar ventas';
                    contentArea.innerHTML = `
                        <div class="dashboard-card">
                            <h3 class="card-title">Registro de Ventas</h3>
                            <p>Aquí puedes registrar nuevas ventas:</p>
                            <div style="margin-top: 20px;">
                                <button style="background: #ff0000; color: white; border: none; padding: 10px 20px; border-radius: 8px; cursor: pointer;" onclick="openModal('ventaModal')">
                                    <i class="fa-solid fa-plus" style="margin-right: 8px;"></i>Nueva Venta
                                </button>
                            </div>
                        </div>
                    `;
                    break;
                case 'productos':
                    pageTitle.textContent = 'Registrar productos';
                    contentArea.innerHTML = `
                        <div class="dashboard-card">
                            <h3 class="card-title">Registro de Productos</h3>
                            <p>Aquí puedes registrar nuevos productos:</p>
                            <div style="margin-top: 20px;">
                                <button style="background: #ff0000; color: white; border: none; padding: 10px 20px; border-radius: 8px; cursor: pointer;" onclick="openModal('productoModal')">
                                    <i class="fa-solid fa-plus" style="margin-right: 8px;"></i>Nuevo Producto
                                </button>
                            </div>
                        </div>
                    `;
                    break;
                case 'inventario':
                    pageTitle.textContent = 'Inventario';
                    contentArea.innerHTML = `
                        <div class="dashboard-card">
                            <h3 class="card-title">Control de Inventario</h3>
                            <p>Stock actual de ingredientes:</p>
                            <div style="margin-top: 20px;">
                                <div style="display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #eee;">
                                    <span>🍗 Pollo (kg)</span>
                                    <span><strong>45 kg</strong></span>
                                </div>
                                <div style="display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #eee;">
                                    <span>🍟 Papas (kg)</span>
                                    <span><strong>15 kg</strong></span>
                                </div>
                                <div style="display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #eee;">
                                    <span>🧂 Especias</span>
                                    <span><strong>8 unidades</strong></span>
                                </div>
                                <div style="display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #eee;">
                                    <span>🥤 Bebidas</span>
                                    <span><strong>120 unidades</strong></span>
                                </div>
                            </div>
                        </div>
                    `;
                    break;
                case 'usuarios':
                    pageTitle.textContent = 'Crear usuario';
                    contentArea.innerHTML = `
                        <div class="dashboard-card">
                            <h3 class="card-title">Crear Nuevo Usuario</h3>
                            <p>Formulario para registrar nuevos usuarios:</p>
                            <div style="margin-top: 20px;">
                                <form>
                                    <div style="margin-bottom: 15px;">
                                        <label style="display: block; margin-bottom: 5px;">Nombre</label>
                                        <input type="text" style="width: 100%; padding: 10px; border-radius: 8px; border: 1px solid #ddd;">
                                    </div>
                                    <div style="margin-bottom: 15px;">
                                        <label style="display: block; margin-bottom: 5px;">Usuario</label>
                                        <input type="text" style="width: 100%; padding: 10px; border-radius: 8px; border: 1px solid #ddd;">
                                    </div>
                                    <div style="margin-bottom: 15px;">
                                        <label style="display: block; margin-bottom: 5px;">Contraseña</label>
                                        <input type="password" style="width: 100%; padding: 10px; border-radius: 8px; border: 1px solid #ddd;">
                                    </div>
                                    <button type="submit" style="background: #ff0000; color: white; border: none; padding: 10px 20px; border-radius: 8px; cursor: pointer;">
                                        <i class="fa-solid fa-user-plus" style="margin-right: 8px;"></i>Crear Usuario
                                    </button>
                                </form>
                            </div>
                        </div>
                    `;
                    break;
                case 'perfil':
                    pageTitle.textContent = 'Perfil del usuario';
                    contentArea.innerHTML = `
                        <div class="dashboard-card">
                            <h3 class="card-title">Perfil de Usuario</h3>
                            <div style="display: flex; gap: 30px; margin-top: 20px;">
                                <div style="flex: 1;">
                                    <div style="background: #f8f9fa; padding: 20px; border-radius: 10px; text-align: center;">
                                        <div style="width: 100px; height: 100px; background: #ff0000; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 15px; color: white; font-size: 2rem;">
                                            <i class="fa-solid fa-user"></i>
                                        </div>
                                        <h4>Admin</h4>
                                        <p>Administrador</p>
                                    </div>
                                </div>
                                <div style="flex: 2;">
                                    <h4 style="margin-bottom: 15px;">Información del Usuario</h4>
                                    <form>
                                        <div style="margin-bottom: 15px;">
                                            <label style="display: block; margin-bottom: 5px;">Nombre</label>
                                            <input type="text" value="Admin" style="width: 100%; padding: 10px; border-radius: 8px; border: 1px solid #ddd;">
                                        </div>
                                        <div style="margin-bottom: 15px;">
                                            <label style="display: block; margin-bottom: 5px;">Correo</label>
                                            <input type="email" value="admin@surtidorados.com" style="width: 100%; padding: 10px; border-radius: 8px; border: 1px solid #ddd;">
                                        </div>
                                        <div style="margin-bottom: 15px;">
                                            <label style="display: block; margin-bottom: 5px;">Teléfono</label>
                                            <input type="tel" style="width: 100%; padding: 10px; border-radius: 8px; border: 1px solid #ddd;">
                                        </div>
                                        <button type="submit" style="background: #ff0000; color: white; border: none; padding: 10px 20px; border-radius: 8px; cursor: pointer;">
                                            <i class="fa-solid fa-save" style="margin-right: 8px;"></i>Guardar Cambios
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    `;
                    break;
                case 'configuracion':
                    pageTitle.textContent = 'Configuración';
                    contentArea.innerHTML = `
                        <div class="dashboard-card">
                            <h3 class="card-title">Configuración del Sistema</h3>
                            <p>Ajustes generales:</p>
                            <div style="margin-top: 20px;">
                                <div style="margin-bottom: 15px;">
                                    <strong>🏪 Información del Restaurante</strong>
                                    <p>Nombre: Surtidorados de Aves El Gran Sabor</p>
                                </div>
                                <div style="margin-bottom: 15px;">
                                    <strong>⚙️ Configuración General</strong>
                                    <p>Tema: Rojo (predeterminado)</p>
                                </div>
                                <div style="margin-bottom: 15px;">
                                    <strong>🔧 Mantenimiento</strong>
                                    <p>Última actualización: Hoy</p>
                                </div>
                            </div>
                        </div>
                    `;
                    break;
            }
        }

        // Auto-collapse sidebar on mobile
        window.addEventListener('resize', function() {
            if (window.innerWidth <= 768) {
                document.getElementById('sidebar').classList.add('collapsed');
            }
        });

        // Initialize mobile view
        if (window.innerWidth <= 768) {
            document.getElementById('sidebar').classList.add('collapsed');
        }

        function cerrarSesion() {
    // 1. Eliminar los datos de sesión
    sessionStorage.removeItem('currentUser');
    sessionStorage.removeItem('loginTime');
    
    // 2. Redirigir al login (index.html)
    window.location.href = 'index.html';
    
    // 3. Opcional: Prevenir comportamiento por defecto del enlace
    return false;
}