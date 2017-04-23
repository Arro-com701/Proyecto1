// PRECIO

function actualizarPrecio() {
    var total = actualizarPrecioForma() + actualizarPrecioModelo() + actualizarPrecioColor();
    $("#precioTotal").text("$" + total);
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

// ruta base para las imagenes de almohadones
var baseSRC = "img/almohadones/";

// json del almohadon mostrado
var almohadonNuevo = {
    "modelo": "botoncentral",
    "forma": "cuadrado",
    "color": "rojo",
    "texto": ""
};

/*
 * Actualiza el almohadon con las opciones seleccionadas.
 */
function actualizarAlmohadon() {
    var newSRC = baseSRC + almohadonNuevo.modelo + "_" + almohadonNuevo.forma + "_" + almohadonNuevo.color + ".png";
    actualizarCanvas(newSRC);
}

/*
 * Actualiza el canvas.
 */
function actualizarCanvas(src) {
    var canvas = document.getElementById('myCanvas');
    var context = canvas.getContext('2d');
    var imageObj = new Image();
    context.clearRect(0, 0, canvas.width, canvas.height); // reinicia el canvas
    imageObj.onload = function () {
        context.drawImage(imageObj, 0, 0, 350, 350);
        context.font = '32px VTKS EMBROIDERY';
        context.fillText(almohadonNuevo.texto, 70, 220, 210);
    };
    imageObj.src = src;
}

/*
 * Contiene las funciones para la funcionalidad de agregar y borrar texto
 */
function texto() {
    $("#borrarTexto").prop("disabled", true); // inicialmente deshabilitado

    // botón para agregar texto
    $("#agregarTexto").click(function () {
        almohadonNuevo.texto = $("#texto").val();
        actualizarAlmohadon();
        $("#agregarTexto").prop("disabled", true);
        $("#borrarTexto").prop("disabled", false);
    });

    // botón para borrar texto
    $("#borrarTexto").click(function () {
        almohadonNuevo.texto = "";
        actualizarAlmohadon();
        $("#agregarTexto").prop("disabled", false);
        $("#borrarTexto").prop("disabled", true);
    });
}

/*
 * Cambiar la forma según la opción seleccionada.
 */
function forma() {
    $("#selectorForma").change(function () {
        almohadonNuevo.forma = $("#selectorForma option:selected").text().toLowerCase();
        actualizarAlmohadon();
        actualizarPrecio();
    });
}

// CONFIGURACIÓN A PARTIR DE XML

/*
 * Obtiene el xml del servidor y lo utiliza para inicializar las opciones
 * de las distintas características
 */
function cargarConfiguracionOpciones() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            cargarOpcionesForma(this.responseXML);
            cargarOpcionesColor(this.responseXML);
            cargarOpcionesModelo(this.responseXML);
            // Coloca un almohadón inicial
            setAlmohadonPorDefecto(this.responseXML);
        }
    };
    xhttp.open("GET", "../opciones.xml", true);
    xhttp.send();
}


/*
 * Carga a partir del xml las opciones para las distintas formas
 */
function cargarOpcionesForma(xml) {
    var opciones = xml.getElementsByTagName("forma")[0].getElementsByTagName("opcion");
    for (i = 0; i < opciones.length; i++) {
        var forma = primeraMayuscula(opciones[i].childNodes[0].nodeValue);
        $("#selectorForma").append("<option>" + forma + "</option>");
    }
}

/*
 * Devuelve la cadena con el primer caracter en mayúscula
 */
function primeraMayuscula(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

/*
 * Carga a partir del xml las opciones para los distintos colores
 */
function cargarOpcionesColor(xml) {
    var opciones = xml.getElementsByTagName("color")[0].getElementsByTagName("opcion");
    for (i = 0; i < opciones.length; i++) {
        // botón para elegir el color
        var boton = $("<button>");
        boton.attr("id", opciones[i].getElementsByTagName("nombre")[0].childNodes[0].nodeValue);
        boton.attr("type", "button");
        boton.addClass("btn");
        boton.css("background-color", opciones[i].getElementsByTagName("rgb")[0].childNodes[0].nodeValue); // recupero el rgb del xml
        boton.css("border-color", "#ccc");
        boton.css("margin-right", "5px");
        // funcion para cambiar el color al clickear
        boton.click(function () {
            almohadonNuevo.color = $(this).attr("id");
            actualizarAlmohadon();
            actualizarPrecio();
        });
        // Agrego el botón
        $("#botonesColores").append(boton);
    }
}

/*
 * Carga a partir del xml las opciones para distintos modelos
 */
function cargarOpcionesModelo(xml) {
    var opciones = xml.getElementsByTagName("modelo")[0].getElementsByTagName("opcion");
    for (i = 0; i < opciones.length; i++) {
        // div contenedor
        var div = $("<div>");
        div.addClass("col-md-4");
        // links contenedores
        var link = $("<a>");
        link.attr("href", "#");
        link.attr("id", opciones[i].childNodes[0].nodeValue);
        // imagen con modelo
        var imagen = $("<img/>");
        imagen.addClass("img-responsive");
        imagen.attr("src", "img/almohadones/" + opciones[i].childNodes[0].nodeValue + "_cuadrado_azul.jpg");

        // conecto los elementos
        link.append(imagen);
        div.append(link);
        $("#opcionesModelos").append(div);
        // Función para cambiar el modelo al clickear
        link.click(function () {
            almohadonNuevo.modelo = $(this).attr("id");
            actualizarAlmohadon();
            actualizarPrecio();
            $('#myModal').modal('hide');
        });
    }
}

/* 
 * Setea a partir del xml el almohadón por defecto
 */

function setAlmohadonPorDefecto(xml) {
    almohadonNuevo.modelo = xml.getElementsByTagName("modelo")[0].getElementsByTagName("opcion")[0].childNodes[0].nodeValue;
    almohadonNuevo.forma = xml.getElementsByTagName("forma")[0].getElementsByTagName("opcion")[0].childNodes[0].nodeValue;
    almohadonNuevo.color = xml.getElementsByTagName("color")[0].getElementsByTagName("opcion")[0].getElementsByTagName("nombre")[0].childNodes[0].nodeValue;
    actualizarAlmohadon();
}

// MAIN

/*
 * Función inicial al cargar el documento
 */
$(document).ready(function () {
    cargarEstilo();
    seleccionTema();
    cargarConfiguracionOpciones();
    forma();
    texto();
});