  // Backend simulado - Base de datos de usuarios
        const users = [
            { username: 'admin', password: 'admin123' },
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
                        window.location.href = 'form.html';
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

        // Verificar si ya hay una sesión activa al cargar la página
        window.addEventListener('load', function() {
            const currentUser = sessionStorage.getItem('currentUser');
            if (currentUser) {
                // Ya hay una sesión activa, redirigir
                window.location.href = 'form.html';
            }
        });