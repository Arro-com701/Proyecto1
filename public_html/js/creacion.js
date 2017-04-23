// PRECIO

var precioModelos = {};
var precioFormas = {};
var precioColores = {};
var hayTexto = false;

$("#botonPrecio").click(function () {
    actualizarPrecio();
});

/*
 * Actualiza los valores del precio
 */
function actualizarPrecio() {
    var precioModelo = precioModelos[almohadonNuevo.modelo];
    var precioForma = precioFormas[almohadonNuevo.forma];
    var precioColor = precioColores[almohadonNuevo.color];
    var precioTexto = 0;
    if (hayTexto)
        precioTexto = 50;
    var total = parseFloat(precioModelo)+parseFloat(precioForma)+parseFloat(precioColor)+parseFloat(precioTexto);
    $("#precioModelo").text("$"+precioModelo);
    $("#precioForma").text("$"+precioForma);
    $("#precioColor").text("$"+precioColor);
    $("#precioTexto").text("$"+precioTexto);
    $("#precioTotal").text("$"+total);
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
        hayTexto = true;
    });

    // botón para borrar texto
    $("#borrarTexto").click(function () {
        almohadonNuevo.texto = "";
        actualizarAlmohadon();
        $("#agregarTexto").prop("disabled", false);
        $("#borrarTexto").prop("disabled", true);
        hayTexto = false;
    });
}

/*
 * Cambiar la forma según la opción seleccionada.
 */
function forma() {
    $("#selectorForma").change(function () {
        almohadonNuevo.forma = $("#selectorForma option:selected").text().toLowerCase();
        actualizarAlmohadon();
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
        var nombreForma = opciones[i].getElementsByTagName("nombre")[0].childNodes[0].nodeValue;
        var forma = primeraMayuscula(nombreForma);
        $("#selectorForma").append("<option>" + forma + "</option>");

        // actualiza el objeto de precios para las formas
        var precio = opciones[i].getElementsByTagName("precio")[0].childNodes[0].nodeValue;
        precioFormas[nombreForma] = precio;
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
        var nombreColor = opciones[i].getElementsByTagName("nombre")[0].childNodes[0].nodeValue;
        // botón para elegir el color
        var boton = $("<button>");
        boton.attr("id", nombreColor);
        boton.attr("type", "button");
        boton.addClass("btn");
        boton.css("background-color", opciones[i].getElementsByTagName("rgb")[0].childNodes[0].nodeValue); // recupero el rgb del xml
        boton.css("border-color", "#ccc");
        boton.css("margin-right", "5px");
        // funcion para cambiar el color al clickear
        boton.click(function () {
            almohadonNuevo.color = $(this).attr("id");
            actualizarAlmohadon();
        });
        // Agrego el botón
        $("#botonesColores").append(boton);
        
        // actualiza el objeto de precios para las colores
        var precio = opciones[i].getElementsByTagName("precio")[0].childNodes[0].nodeValue;
        precioColores[nombreColor] = precio;
    }
}

/*
 * Carga a partir del xml las opciones para distintos modelos
 */
function cargarOpcionesModelo(xml) {
    var opciones = xml.getElementsByTagName("modelo")[0].getElementsByTagName("opcion");
    for (i = 0; i < opciones.length; i++) {
        var nombreModelo = opciones[i].getElementsByTagName("nombre")[0].childNodes[0].nodeValue;
        // div contenedor
        var div = $("<div>");
        div.addClass("col-md-4");
        // links contenedores
        var link = $("<a>");
        link.attr("href", "#");
        link.attr("id", nombreModelo );
        // imagen con modelo
        var imagen = $("<img/>");
        imagen.addClass("img-responsive");
        var formaPorDefecto = xml.getElementsByTagName("forma")[0].getElementsByTagName("opcion")[0].getElementsByTagName("nombre")[0].childNodes[0].nodeValue;
        var colorPorDefecto = xml.getElementsByTagName("color")[0].getElementsByTagName("opcion")[0].getElementsByTagName("nombre")[0].childNodes[0].nodeValue;
        imagen.attr("src", "img/almohadones/" + nombreModelo + "_" + formaPorDefecto + "_" + colorPorDefecto + ".png");

        // conecto los elementos
        link.append(imagen);
        div.append(link);
        $("#opcionesModelos").append(div);
        // Función para cambiar el modelo al clickear
        link.click(function () {
            almohadonNuevo.modelo = $(this).attr("id");
            actualizarAlmohadon();
            $('#myModal').modal('hide');
        });
        
        // actualiza el objeto de precios para los modelos
        var precio = opciones[i].getElementsByTagName("precio")[0].childNodes[0].nodeValue;
        precioModelos[nombreModelo] = precio;
    }
}

/* 
 * Setea a partir del xml el almohadón por defecto
 */

function setAlmohadonPorDefecto(xml) {
    almohadonNuevo.modelo = xml.getElementsByTagName("modelo")[0].getElementsByTagName("opcion")[0].getElementsByTagName("nombre")[0].childNodes[0].nodeValue;
    almohadonNuevo.forma = xml.getElementsByTagName("forma")[0].getElementsByTagName("opcion")[0].getElementsByTagName("nombre")[0].childNodes[0].nodeValue;
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