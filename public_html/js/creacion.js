// PANEL DE CREACIÓN DE ALMOHADÓN

function actualizarAlmohadon() {
    var newSRC = baseSRC + almohadonNuevo.modelo + "_" + almohadonNuevo.forma + "_" + almohadonNuevo.color + ".jpg";
    $("#almohadon").attr("src", newSRC);
}

function forma() {
    $("#selectorForma").change(function () {
        almohadonNuevo.forma = $("#selectorForma option:selected").text().toLowerCase();
        actualizarAlmohadon();
        console.log(almohadonNuevo.forma);
    });
}

function modelo() {
    $(".modal a").click(function () {
        almohadonNuevo.modelo = $(this).attr("id");
        actualizarAlmohadon();
        $('#myModal').modal('hide');
    });
}

function botonesColores() {
    $("#botonRojo").click(function () {
        almohadonNuevo.color = "rojo";
        actualizarAlmohadon();
    });

    $("#botonAzul").click(function () {
        almohadonNuevo.color = "azul";
        actualizarAlmohadon();
    });

    $("#botonVerde").click(function () {
        almohadonNuevo.color = "verde";
        actualizarAlmohadon();
    });

    $("#botonBeige").click(function () {
        almohadonNuevo.color = "beige";
        actualizarAlmohadon();
    });

    $("#botonRosa").click(function () {
        almohadonNuevo.color = "rosa";
        actualizarAlmohadon();
    });

    $("#botonVioleta").click(function () {
        almohadonNuevo.color = "violeta";
        actualizarAlmohadon();
    });
}

var baseSRC = "img/almohadones/";

var almohadonNuevo = {
    "modelo": "botoncentral",
    "forma": "cuadrado",
    "color": "rojo"
};

//Almohadón por defecto

function setAlmohadonPorDefecto() {
    almohadonNuevo.modelo = "liso";
    almohadonNuevo.forma = "cuadrado";
    almohadonNuevo.color = "azul";
    actualizarAlmohadon();
}

$(document).ready(function () {
    cargarEstilo();
    botonesColores();
    seleccionTema();
    setAlmohadonPorDefecto();
    forma();
    modelo();
});