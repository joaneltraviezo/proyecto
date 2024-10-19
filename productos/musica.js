// Obtener el elemento del logotipo y el archivo de audio
const logo = document.querySelector('.logo img');
const audio = new Audio('Rain Rain Go Away - Everet Almond.mp3');

// Crear el evento personalizado 'logoClicked'
const logoClickedEvent = new CustomEvent('logoClicked');

// Manejar el evento personalizado 'logoClicked' para reproducir o detener la música
logo.addEventListener('logoClicked', () => {
    if (audio.paused) { // Si la música está pausada, comienza a reproducir
        audio.play();
    } else { // Si la música ya está sonando, preguntar al usuario si desea detenerla
        const userConfirm = confirm('¿Deseas detener la música?');
        if (userConfirm) {
            audio.pause();
            audio.currentTime = 0; // Reinicia la música al principio
        }
    }
});

// Agregar el evento de clic al logotipo para despachar el evento personalizado
logo.addEventListener('click', () => {
    logo.dispatchEvent(logoClickedEvent);
});
