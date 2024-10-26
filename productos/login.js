// Usuario predefinido
const predefinedUser = {
    email: 'joan@example.com',
    username: 'joan1322',
    password: 'contraseña123'
};

// Variable para almacenar el token generado
let generatedToken = '';

// Evento al enviar el formulario de login
document.getElementById('login-form').addEventListener('submit', function(e) {
    e.preventDefault(); // Evita que el formulario se envíe automáticamente

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Validación del correo o nombre de usuario y contraseña
    if ((username === predefinedUser.email || username === predefinedUser.username) && password === predefinedUser.password) {
        alert('Login exitoso. Se enviará un código de seguridad.');

        // Genera y muestra el token de seguridad
        generatedToken = generateSecurityToken();
        document.getElementById('login-form').style.display = 'none'; // Oculta el formulario de login
        document.getElementById('token-section').style.display = 'block'; // Muestra la sección del token
    } else {
        alert('Usuario o contraseña incorrectos');
    }
});

// Función para generar un código de seguridad aleatorio de 6 dígitos
function generateSecurityToken() {
    const token = Math.floor(1000 + Math.random() * 9000); // Código de 6 dígitos
    alert(`Tu código de seguridad es: ${token}`); // En la vida real, el token se enviaría por correo
    return token.toString();
}

// Evento para verificar el token
document.getElementById('verify-token-btn').addEventListener('click', function() {
    const tokenInput = document.getElementById('token').value;

    if (tokenInput === generatedToken) {
        alert('Token correcto, redirigiendo a la página principal...');
        window.location.href = 'index.html'; // Redirigir a index.html
    } else {
        alert('Código de seguridad incorrecto, inténtalo de nuevo.');
    }
});
