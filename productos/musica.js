
const logo = document.querySelector('.logo img');
const audio = new Audio('Rain Rain Go Away - Everet Almond.mp3');

const logoClickedEvent = new CustomEvent('logoClicked');

logo.addEventListener('logoClicked', () => {
    if (audio.paused) { 
        audio.play();
    } else { 
        const userConfirm = confirm('¿Deseas detener la música?');
        if (userConfirm) {
            audio.pause();
            audio.currentTime = 0; // Reinicia la música al principio
        }
    }
});

logo.addEventListener('click', () => {
    logo.dispatchEvent(logoClickedEvent);
});
