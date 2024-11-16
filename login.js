// Usuarios predefinidos
let predefinedUsers = JSON.parse(sessionStorage.getItem('predefinedUsers')) || [
    {
        email: 'joan@example.com',
        username: 'joan1322',
        password: 'contraseña123',
        role: 'user' // Rol de usuario normal
    },
    {
        email: 'admin@example.com',
        username: 'admin123',
        password: 'adminpass',
        role: 'admin' // Rol de administrador
    }
];

// Guardar usuarios en sessionStorage si no están ya presentes
if (!sessionStorage.getItem('predefinedUsers')) {
    sessionStorage.setItem('predefinedUsers', JSON.stringify(predefinedUsers));
}

// Evento para manejar el botón de "Recuperar Contraseña"
document.getElementById('forgot-password-btn').addEventListener('click', function() {
    const emailOrUsername = document.getElementById('username').value;

    // Buscar el usuario en la lista de usuarios predefinidos
    const user = predefinedUsers.find(u => u.email === emailOrUsername || u.username === emailOrUsername);

    const passwordResult = document.getElementById('password-result');

    if (user) {
        // Si el usuario es encontrado, redirigir a la página de cambio de contraseña
        alert('Usuario encontrado. Redirigiendo a la página de cambio de contraseña...');
        window.location.href = 'cambiar_contraseña.html'; // Redirige a la nueva página
    } else {
        // Si no se encuentra al usuario, mostrar un mensaje de error
        passwordResult.style.display = 'block';
        passwordResult.textContent = 'Usuario no encontrado.';
        passwordResult.style.color = 'red'; // Cambiar color a rojo si el usuario no se encuentra
    }
});

// Evento al enviar el formulario de login
document.getElementById('login-form').addEventListener('submit', function(e) {
    e.preventDefault(); // Evita que el formulario se envíe automáticamente

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Buscar al usuario en la lista de usuarios predefinidos
    const user = predefinedUsers.find(u => (u.email === username || u.username === username) && u.password === password);

    // Validación del usuario y la contraseña
    if (user) {
        alert('Login exitoso. Se enviará un código de seguridad.');

        // Genera y muestra el token de seguridad
        generatedToken = generateSecurityToken();
        document.getElementById('login-form').style.display = 'none';
        document.getElementById('token-section').style.display = 'block'; 

        // Redirigir dependiendo del rol del usuario
        document.getElementById('verify-token-btn').addEventListener('click', function() {
            const tokenInput = document.getElementById('token').value;

            if (tokenInput === generatedToken) {
                if (user.role === 'admin') {
                    alert('Token correcto, redirigiendo a la página de administración...');
                    window.location.href = 'admin.html'; // Redirige al panel de administración
                } else {
                    alert('Token correcto, redirigiendo a la página principal...');
                    window.location.href = 'index.html'; // Redirige a la página principal
                }
            } else {
                alert('Código de seguridad incorrecto, inténtalo de nuevo.');
            }
        });
    } else {
        alert('Usuario o contraseña incorrectos');
    }
});

// Evento para manejar el botón de "Cambiar Contraseña"
document.getElementById('change-password-btn').addEventListener('click', function() {
    const newPassword = document.getElementById('new-password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    const resultMessage = document.getElementById('change-password-result');
    const emailOrUsername = document.getElementById('username').value; // Suponiendo que se pasa desde la página de cambio

    if (newPassword && confirmPassword) {
        if (newPassword === confirmPassword) {
            // Buscar el usuario en la lista de usuarios predefinidos
            const userIndex = predefinedUsers.findIndex(u => u.email === emailOrUsername || u.username === emailOrUsername);

            if (userIndex !== -1) {
                // Actualizar la contraseña del usuario
                predefinedUsers[userIndex].password = newPassword;
                sessionStorage.setItem('predefinedUsers', JSON.stringify(predefinedUsers));

                resultMessage.style.display = 'block';
                resultMessage.textContent = 'Contraseña cambiada exitosamente.';
                resultMessage.style.color = 'green';

                // Redirigir al login después de un cambio exitoso
                setTimeout(() => {
                    window.location.href = 'login.html';
                }, 2000);
            } else {
                resultMessage.style.display = 'block';
                resultMessage.textContent = 'Usuario no encontrado.';
                resultMessage.style.color = 'red';
            }
        } else {
            resultMessage.style.display = 'block';
            resultMessage.textContent = 'Las contraseñas no coinciden.';
            resultMessage.style.color = 'red';
        }
    } else {
        resultMessage.style.display = 'block';
        resultMessage.textContent = 'Por favor, completa ambos campos.';
        resultMessage.style.color = 'red';
    }
});

// Función para generar un código de seguridad aleatorio de 4 dígitos
function generateSecurityToken() {
    const token = Math.floor(1000 + Math.random() * 9000); // Código de 4 dígitos
    alert(`Tu código de seguridad es: ${token}`); // En la vida real, el token se enviaría por correo
    return token.toString();
}
