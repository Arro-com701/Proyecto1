// ESTILO DE LA PÁGINA

/*
 * Carga el último estilo seleccionado (recordado por el browser).
 */
function cargarEstilo() {
    // Los valores en setEstilo son por la ubicación de las css
    // en index.html
    if (localStorage.tema === "Tema 1")
        setEstilo(2);
    else
        setEstilo(3);
}

/*
 * Deshabilita los dos estilos existentes para el tema de la página.
 */
function deshabilitarEstilos() {
    document.styleSheets[2].disabled = true;
    document.styleSheets[3].disabled = true;
}

/*
 * Setea el estilo correspondiente al parámetro.
 */
function setEstilo(n) {
    deshabilitarEstilos();
    document.styleSheets[n].disabled = false;
}

/*
 * Permite seleccionar el tema a través del menú dropdown.
 */
function seleccionTema() {
    $(".dropdown-menu li a").click(function () {
        var seleccion = ($(this).text());
        localStorage.setItem("tema", seleccion);
        cargarEstilo();
    });
}