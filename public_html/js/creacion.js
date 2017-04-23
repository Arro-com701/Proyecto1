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

function forma() {
    $("#selectorForma").change(function () {
        almohadonNuevo.forma = $("#selectorForma option:selected").text().toLowerCase();
        actualizarAlmohadon();
        actualizarPrecio();
    });
}

function cambiarModelo() {
    almohadonNuevo.modelo = $(this).attr("id");
    actualizarAlmohadon();
    actualizarPrecio();
    $('#myModal').modal('hide');
}

function cambiarColor() {
    almohadonNuevo.color = $(this).attr("id");
    actualizarAlmohadon();
    actualizarPrecio();
}

var baseSRC = "img/almohadones/";

var almohadonNuevo = {
    "modelo": "botoncentral",
    "forma": "cuadrado",
    "color": "rojo"
};

function actualizarAlmohadon() {
    var newSRC = baseSRC + almohadonNuevo.modelo + "_" + almohadonNuevo.forma + "_" + almohadonNuevo.color + ".jpg";
    $("#almohadon").attr("src", newSRC);
}

//Almohadón por defecto

function setAlmohadonPorDefecto() {
    almohadonNuevo.modelo = "modelo1";
    almohadonNuevo.forma = "cuadrado";
    almohadonNuevo.color = "azul";
    actualizarAlmohadon();
}

$(document).ready(function () {
    cargarEstilo();
    seleccionTema();
    setAlmohadonPorDefecto();
    forma();
    cargarConfiguracionOpciones();
});


function cargarConfiguracionOpciones() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            cargarOpcionesForma(this.responseXML);
            cargarOpcionesColor(this.responseXML);
            cargarOpcionesModelo(this.responseXML);
        }
    };
    xhttp.open("GET", "../opciones.xml", true);
    xhttp.send();
}

function cargarOpcionesForma(xml) {
    var opciones = xml.getElementsByTagName("forma")[0].getElementsByTagName("opcion");
    for (i = 0; i < opciones.length; i++) {
        $("#selectorForma").append("<option>" + opciones[i].childNodes[0].nodeValue + "</option>");
    }
}

function cargarOpcionesColor(xml) {
    var opciones = xml.getElementsByTagName("color")[0].getElementsByTagName("opcion");
    for (i = 0; i < opciones.length; i++) {
        var boton = $("<button id=\"" + opciones[i].getElementsByTagName("nombre")[0].childNodes[0].nodeValue + "\"" + " type=\"" + "button" + "\"" + "></button>");
        $("#botonesColores").append(boton);
        boton.addClass("btn");
        boton.css("background-color", opciones[i].getElementsByTagName("rgb")[0].childNodes[0].nodeValue);
        boton.css("border-color", "#ccc");
        boton.css("margin-right", "5px");
        boton.click(cambiarColor);
    }
}

function cargarOpcionesModelo(xml) {
    var opciones = xml.getElementsByTagName("modelo")[0].getElementsByTagName("opcion");
    for (i = 0; i < opciones.length; i++) {
        var div = $("<div class=\"" + "col-md-4 portfolio-item\"" + ">");
        var link = $("<a href=\"#\" " + "id=\"" + opciones[i].childNodes[0].nodeValue + "\">");
        var imagen = $("<img/>");
        imagen.addClass("img-responsive");
        imagen.attr("src", "img/almohadones/" + opciones[i].childNodes[0].nodeValue + "_cuadrado_azul.jpg");
        link.append(imagen);
        div.append(link);   
        $("#opcionesModelos").append(div);
        link.click(cambiarModelo);
    }
}