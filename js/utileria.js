// FUNCIONES OBLIGATORIAS
function validarCorreo(correo) {
  var expresion = /^[A-Za-z0-9._+-]+@[A-Za-z0-9-]+\.[A-Za-z]+$/;
  return expresion.test(correo);
}
function soloLetras(texto) {
  var expresion = /^[A-Za-zÁÉÍÓÚáéíóúÑñ ]+$/;
  var coincide = expresion.test(texto);

  var textoSinEspacios = texto.trim();

  if (coincide === true && textoSinEspacios !== "") {
    return true;
  } 
  else {
    return false;
  }
}
function validarLongitud(numero, maxLongitud){
    const texto = String(numero).trim();
    const esSoloDigitos = /^\d+$/.test(texto);
    return esSoloDigitos && texto.length <= maxLongitud;
}
function calcularEdad(fechaNacimiento) {
  var nacimiento = new Date(fechaNacimiento + "T00:00:00");
  var hoy = new Date();

  var anioNacimiento = nacimiento.getFullYear();
  var mesNacimiento = nacimiento.getMonth();
  var diaNacimiento = nacimiento.getDate();

  var anioActual = hoy.getFullYear();
  var mesActual = hoy.getMonth();
  var diaActual = hoy.getDate();

  var edad = anioActual - anioNacimiento;

  if (mesActual < mesNacimiento) {
    edad = edad - 1;
  } else {
    if (mesActual === mesNacimiento) {
      if (diaActual < diaNacimiento) {
        edad = edad - 1;
      }
    }
  }

  return edad;
}
function esMayorDeEdad(fechaNacimiento) {
  var edad = calcularEdad(fechaNacimiento);

  if (edad >= 18) {
    return true;
  } else {
    return false;
  }
}
function validarPassword(password) {
  var tieneMinuscula = false;
  var tieneMayuscula = false;
  var tieneNumero = false;
  var tieneEspecial = false;

  var caracteresEspeciales = "!@#$%^&*()_+-=[]{};:'\",.<>/?";

  for (var i = 0; i < password.length; i++) {
    var caracter = password.charAt(i);

    if (caracter >= "a" && caracter <= "z") {
      tieneMinuscula = true;
    }

    if (caracter >= "A" && caracter <= "Z") {
      tieneMayuscula = true;
    }

    if (caracter >= "0" && caracter <= "9") {
      tieneNumero = true;
    }

    if (caracteresEspeciales.indexOf(caracter) !== -1) {
      tieneEspecial = true;
    }
  }

  var longitudValida = false;

  if (password.length >= 8) {
    longitudValida = true;
  }

  if (tieneMinuscula === true && tieneMayuscula === true && tieneNumero === true && tieneEspecial === true && longitudValida === true) {
    return true;
  } else {
    return false;
  }
  
}


//FUNCIONES PROPIAS
function obtenerNombreDeUsuario(correo) {
  var posicionArroba = correo.indexOf("@");
  var nombreUsuario = "";

  if (posicionArroba !== -1) {
    nombreUsuario = correo.substring(0, posicionArroba);
  } else {
    nombreUsuario = correo;
  }

  return nombreUsuario;
}
function obtenerAvatarPorLetra(letra) {
  var letraMayuscula = letra.toUpperCase();
  var rutaImagen = "";

  if (letraMayuscula === "A" || letraMayuscula === "B" || letraMayuscula === "C" || letraMayuscula === "D" || letraMayuscula === "E") {
    rutaImagen = "img/avatar1.jpeg";
  } else {
    if (letraMayuscula === "F" || letraMayuscula === "G" || letraMayuscula === "H" || letraMayuscula === "I" || letraMayuscula === "J") {
      rutaImagen = "img/avatar2.jpeg";
    } else {
      if (letraMayuscula === "K" || letraMayuscula === "L" || letraMayuscula === "M" || letraMayuscula === "N" || letraMayuscula === "O") {
        rutaImagen = "img/avatar3.jpeg";
      } else {
        if (letraMayuscula === "P" || letraMayuscula === "Q" || letraMayuscula === "R" || letraMayuscula === "S" || letraMayuscula === "T") {
          rutaImagen = "img/avatar4.jpeg";
        } else {
          rutaImagen = "img/avatar5.jpeg";
        }
      }
    }
  }

  return rutaImagen;
}