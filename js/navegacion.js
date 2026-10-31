// Navegación y buscador — RG Nieto (Sprint III, Persona 1)
// 1. Menú desplegable en pantallas pequeñas (botón "Menú").
// 2. Submenú "Productos" accesible con clic, teclado y tecla Escape.
// 3. Buscador: desde cualquier página envía la búsqueda al Inicio
//    (index.html?q=...) y allí filtra las tarjetas de producto.

document.addEventListener("DOMContentLoaded", function () {

    /* ---------- Menú principal en móvil ---------- */

    const navegacion = document.querySelector(".navegacion");
    const botonMenu = document.querySelector(".menu-boton");

    if (navegacion && botonMenu) {
        botonMenu.addEventListener("click", function () {
            const abierto = navegacion.classList.toggle("abierta");
            botonMenu.setAttribute("aria-expanded", abierto);
            botonMenu.querySelector("i").className = abierto ? "fa-solid fa-xmark" : "fa-solid fa-bars";
        });

        // Al elegir un enlace, se cierra el menú (útil al saltar a una sección del Inicio)
        navegacion.querySelectorAll(".menu a").forEach(function (enlace) {
            enlace.addEventListener("click", function () {
                navegacion.classList.remove("abierta");
                botonMenu.setAttribute("aria-expanded", "false");
                botonMenu.querySelector("i").className = "fa-solid fa-bars";
                cerrarSubmenus();
            });
        });
    }

    /* ---------- Submenú "Productos" ---------- */

    const submenus = document.querySelectorAll(".submenu");

    function cerrarSubmenus() {
        submenus.forEach(function (submenu) {
            submenu.classList.remove("abierto");
            submenu.querySelector(".submenu-boton").setAttribute("aria-expanded", "false");
        });
    }

    submenus.forEach(function (submenu) {
        const boton = submenu.querySelector(".submenu-boton");
        boton.addEventListener("click", function (evento) {
            evento.stopPropagation();
            const abierto = submenu.classList.toggle("abierto");
            boton.setAttribute("aria-expanded", abierto);
        });
    });

    document.addEventListener("click", function (evento) {
        if (!evento.target.closest(".submenu")) cerrarSubmenus();
    });

    document.addEventListener("keydown", function (evento) {
        if (evento.key === "Escape") cerrarSubmenus();
    });

    /* ---------- Buscador de productos ---------- */

    const parametros = new URLSearchParams(window.location.search);
    const termino = (parametros.get("q") || "").trim();
    const campoBusqueda = document.querySelector("#buscar");
    const resultado = document.querySelector("#resultado-busqueda");

    if (campoBusqueda && termino) campoBusqueda.value = termino;

    // Solo el Inicio tiene el catálogo de productos que se filtra
    if (!resultado || !termino) return;

    // Quita tildes y mayúsculas para comparar ("audifonos" encuentra "audífonos")
    function normalizar(texto) {
        return texto.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
    }

    const palabras = normalizar(termino).split(/\s+/);
    const secciones = document.querySelectorAll("main > section");
    let coincidencias = 0;

    secciones.forEach(function (seccion) {
        const titulo = normalizar(seccion.querySelector("h2") ? seccion.querySelector("h2").textContent : "");
        const nombreSeccion = normalizar(seccion.id || "");
        const tarjetas = seccion.querySelectorAll(".tarjeta");
        let visiblesEnSeccion = 0;

        tarjetas.forEach(function (tarjeta) {
            const texto = normalizar(tarjeta.textContent) + " " + titulo + " " + nombreSeccion;
            const coincide = palabras.every(function (palabra) {
                return texto.includes(palabra);
            });
            tarjeta.hidden = !coincide;
            if (coincide) visiblesEnSeccion++;
        });

        seccion.hidden = visiblesEnSeccion === 0;
        coincidencias += visiblesEnSeccion;
    });

    const mensaje = resultado.querySelector("p");
    const textoBuscado = document.createElement("strong");
    textoBuscado.textContent = "«" + termino + "»";

    if (coincidencias > 0) {
        mensaje.textContent = coincidencias + (coincidencias === 1 ? " resultado" : " resultados") + " para ";
        mensaje.appendChild(textoBuscado);
    } else {
        mensaje.textContent = "No encontramos productos para ";
        mensaje.appendChild(textoBuscado);
        mensaje.append(". Escríbenos por WhatsApp y te ayudamos a encontrarlo.");
        secciones.forEach(function (seccion) {
            seccion.hidden = false;
            seccion.querySelectorAll(".tarjeta").forEach(function (tarjeta) {
                tarjeta.hidden = false;
            });
        });
    }

    document.body.classList.add("busqueda-activa");
    resultado.hidden = false;
    resultado.scrollIntoView({ behavior: "smooth", block: "start" });
});
