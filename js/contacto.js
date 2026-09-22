/* ============================================================
   RG Nieto - Validación del formulario de contacto
   Autor: Persona 3
   ============================================================ */

   document.addEventListener('DOMContentLoaded', function () {

    // Referencias a los elementos del DOM
    const formulario   = document.getElementById('formulario');
    const alertaExito  = document.getElementById('alertaExito');
    const alertaError  = document.getElementById('alertaError');

    // Si no estamos en la página de contacto, salimos sin errores
    if (!formulario) return;

    // ------------------------------------------------------------
    // Validación del formulario al enviar
    // ------------------------------------------------------------
    formulario.addEventListener('submit', function (evento) {
        evento.preventDefault();
        evento.stopPropagation();

        // Ocultamos alertas previas
        alertaExito.classList.add('d-none');
        alertaError.classList.add('d-none');

        // Validación nativa del navegador + Bootstrap
        if (!formulario.checkValidity()) {
            formulario.classList.add('was-validated');
            alertaError.classList.remove('d-none');
            alertaError.scrollIntoView({ behavior: 'smooth', block: 'center' });
            return;
        }

        // Si pasa la validación, simulamos el envío exitoso
        formulario.classList.remove('was-validated');
        formulario.reset();

        alertaExito.classList.remove('d-none');
        alertaExito.scrollIntoView({ behavior: 'smooth', block: 'center' });

        // Ocultamos la alerta de éxito después de 6 segundos
        setTimeout(function () {
            alertaExito.classList.add('d-none');
        }, 6000);
    });

    // ------------------------------------------------------------
    // Validación en vivo mientras el usuario escribe
    // ------------------------------------------------------------
    const campos = formulario.querySelectorAll('input, select, textarea');

    campos.forEach(function (campo) {
        campo.addEventListener('blur', function () {
            if (campo.checkValidity()) {
                campo.classList.remove('is-invalid');
                campo.classList.add('is-valid');
            } else {
                campo.classList.remove('is-valid');
                campo.classList.add('is-invalid');
            }
        });

        campo.addEventListener('input', function () {
            if (campo.checkValidity()) {
                campo.classList.remove('is-invalid');
                campo.classList.add('is-valid');
            }
        });
    });

});