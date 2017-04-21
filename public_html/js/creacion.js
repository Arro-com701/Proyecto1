// PANEL DE CREACIÓN DE ALMOHADÓN

function actualizarAlmohadon() {
    var newSRC = baseSRC + almohadonNuevo.modelo + "_" + almohadonNuevo.forma + "_" + almohadonNuevo.color + ".jpg";
    $("#almohadon").attr("src", newSRC);
}

function actualizarPrecio() {
    var total = actualizarPrecioForma()+actualizarPrecioModelo()+actualizarPrecioColor();
    $("#precioTotal").text("$"+total);
}

function actualizarPrecioForma() {
    if (almohadonNuevo.forma === "cuadrado") {
        $("#precioForma").text("$0");
        return 0;
    }
    if (almohadonNuevo.forma === "curvo") {
        $("#precioForma").text("$20");
        return 20;
    }
    if (almohadonNuevo.forma === "rectangular") {
        $("#precioForma").text("$10");
        return 10;
    }
}

function actualizarPrecioModelo() {
    if (almohadonNuevo.modelo === "modelo1") {
        $("#precioModelo").text("$140");
        return 140;
    }
    if (almohadonNuevo.modelo === "modelo2") {
        $("#precioModelo").text("$160");
        return 160;
    }
    if (almohadonNuevo.modelo === "modelo3") {
        $("#precioModelo").text("$185");
        return 185;
    }
}

function actualizarPrecioColor() {
    if (almohadonNuevo.color === "azul") {
        $("#precioColor").text("$10");
        return 10;
    }
    if (almohadonNuevo.color === "rojo") {
        $("#precioColor").text("$10");
        return 10;
    }
    if (almohadonNuevo.color === "verde") {
        $("#precioColor").text("$20");
        return 20;
    }
    if (almohadonNuevo.color === "violeta") {
        $("#precioColor").text("$20");
        return 20;
    }
    if (almohadonNuevo.color === "beige") {
        $("#precioColor").text("$5");
        return 5;
    }
    if (almohadonNuevo.color === "rosa") {
        $("#precioColor").text("$10");
        return 10;
    }
}

function forma() {
    $("#selectorForma").change(function () {
        almohadonNuevo.forma = $("#selectorForma option:selected").text().toLowerCase();
        actualizarAlmohadon();
        actualizarPrecio();
    });
}

function modelo() {
    $(".modal a").click(function () {
        almohadonNuevo.modelo = $(this).attr("id");
        actualizarAlmohadon();
        actualizarPrecio();
        $('#myModal').modal('hide');
    });
}

//RESUMIR ESTO ASI PUEDO ESCRIBIR UNA FUNCION SOLA
function botonesColores() {
    $("#botonRojo").click(function () {
        almohadonNuevo.color = "rojo";
        actualizarAlmohadon();
        actualizarPrecio();
    });

    $("#botonAzul").click(function () {
        almohadonNuevo.color = "azul";
        actualizarAlmohadon();
        actualizarPrecio();
    });

    $("#botonVerde").click(function () {
        almohadonNuevo.color = "verde";
        actualizarAlmohadon();
        actualizarPrecio();
    });

    $("#botonBeige").click(function () {
        almohadonNuevo.color = "beige";
        actualizarAlmohadon();
        actualizarPrecio();
    });

    $("#botonRosa").click(function () {
        almohadonNuevo.color = "rosa";
        actualizarAlmohadon();
        actualizarPrecio();
    });

    $("#botonVioleta").click(function () {
        almohadonNuevo.color = "violeta";
        actualizarAlmohadon();
        actualizarPrecio();
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
    almohadonNuevo.modelo = "modelo1";
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