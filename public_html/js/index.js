// BOTONES INICIALES

/*
 * Funcionalidad del botón principal.
 */
function botonInicial() {
    $("#comenzar").fadeIn("slow");

    $("#comenzar").click(function () {
        $("#comenzar").fadeOut("slow", function () {
            $("#boton-ver").slideDown();
            $("#boton-crear").slideDown();
        });


    });
}

$(document).ready(function () {
    cargarEstilo();
    botonInicial();
    seleccionTema();
});