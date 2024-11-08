// Usuarios predefinidos
const predefinedUsers = [
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

// Variable para almacenar el token generado
let generatedToken = '';

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
        if (user.role === 'admin') {
            // Si el usuario es administrador, redirigir a la página de administración
            document.getElementById('verify-token-btn').addEventListener('click', function() {
                const tokenInput = document.getElementById('token').value;

                if (tokenInput === generatedToken) {
                    alert('Token correcto, redirigiendo a la página de administración...');
                    window.location.href = 'admin.html'; // Redirige al panel de administración
                } else {
                    alert('Código de seguridad incorrecto, inténtalo de nuevo.');
                }
            });
        } else {
            // Si el usuario es normal, redirigir a la página principal
            document.getElementById('verify-token-btn').addEventListener('click', function() {
                const tokenInput = document.getElementById('token').value;

                if (tokenInput === generatedToken) {
                    alert('Token correcto, redirigiendo a la página principal...');
                    window.location.href = 'index.html'; // Redirige a la página principal
                } else {
                    alert('Código de seguridad incorrecto, inténtalo de nuevo.');
                }
            });
        }
    } else {
        alert('Usuario o contraseña incorrectos');
    }
});

// Función para generar un código de seguridad aleatorio de 4 dígitos
function generateSecurityToken() {
    const token = Math.floor(1000 + Math.random() * 9000); // Código de 4 dígitos
    alert(`Tu código de seguridad es: ${token}`); // En la vida real, el token se enviaría por correo
    return token.toString();
}
