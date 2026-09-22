// Carrusel de portafolio — RG Nieto
// Componente Front-End: Carrusel (Persona 2)
// Funciona sin librerías externas: mueve el track con CSS transform.

document.addEventListener("DOMContentLoaded", function () {
    const carrusel = document.querySelector("[data-carrusel]");
    if (!carrusel) return;

    const track = carrusel.querySelector(".carrusel-track");
    const slides = Array.from(carrusel.querySelectorAll(".carrusel-slide"));
    const botonAnterior = carrusel.querySelector("[data-carrusel-anterior]");
    const botonSiguiente = carrusel.querySelector("[data-carrusel-siguiente]");
    const contenedorPuntos = carrusel.querySelector("[data-carrusel-puntos]");

    let indiceActual = 0;
    let temporizador = null;

    // Genera un punto de navegación por cada slide
    slides.forEach((_, indice) => {
        const punto = document.createElement("button");
        punto.classList.add("carrusel-punto");
        punto.setAttribute("aria-label", "Ir a la diapositiva " + (indice + 1));
        if (indice === 0) punto.classList.add("activo");
        punto.addEventListener("click", () => irADiapositiva(indice));
        contenedorPuntos.appendChild(punto);
    });

    const puntos = Array.from(contenedorPuntos.querySelectorAll(".carrusel-punto"));

    function actualizarVista() {
        track.style.transform = "translateX(-" + indiceActual * 100 + "%)";
        puntos.forEach((punto, indice) => {
            punto.classList.toggle("activo", indice === indiceActual);
        });
    }

    function irADiapositiva(indice) {
        indiceActual = (indice + slides.length) % slides.length;
        actualizarVista();
        reiniciarAutoplay();
    }

    function siguiente() {
        irADiapositiva(indiceActual + 1);
    }

    function anterior() {
        irADiapositiva(indiceActual - 1);
    }

    function iniciarAutoplay() {
        temporizador = setInterval(siguiente, 6000);
    }

    function reiniciarAutoplay() {
        clearInterval(temporizador);
        iniciarAutoplay();
    }

    if (botonSiguiente) botonSiguiente.addEventListener("click", siguiente);
    if (botonAnterior) botonAnterior.addEventListener("click", anterior);

    carrusel.addEventListener("mouseenter", () => clearInterval(temporizador));
    carrusel.addEventListener("mouseleave", iniciarAutoplay);

    actualizarVista();
    iniciarAutoplay();
});
