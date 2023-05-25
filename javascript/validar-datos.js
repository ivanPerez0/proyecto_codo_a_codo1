window.addEventListener('load', () => {
    // const form = document.querySelector("#formulario")
    const form = document.getElementById("formulario")
    const nombre = document.getElementById("nombre")
    const mail = document.getElementById('mail')
    const telefono = document.getElementById('telefono')
    const asunto = document.getElementById('asunto')
    const descripcion = document.getElementById('descripcion')
    const metodo = document.getElementById('metodo')


    form.addEventListener('submit', function (e) {
        
     if (validaCampos()!="FormularioValido")
        e.preventDefault()
    })

    const validaCampos = () => {
        //capturar los valores ingresados por el usuario
        const nombreValor = nombre.value.trim()
        const mailValor = mail.value.trim()
        const telefonoValor = telefono.value.trim()
        const asuntoValor = asunto.value.trim()

        //validando campo nombre

        validar = validarNombre(nombreValor)
        if (validar != true) {
            validaFalla(nombre, validar)
        } else {
            validaOk(nombre)
        }

        //validando campo mail

        validar = validarCorreo(mailValor)
        if (validar != true) {
            validaFalla(mail, validar)
        } else {
            validaOk(mail)
        }


        //validando telefono
        validar = validarTelefono(telefonoValor)
        if (validar != true) {
            validaFalla(telefono, validar)
        } else {
            validaOk(telefono)
        }
        //validando asunto
        validar = validarAsunto(asuntoValor)
        if (validar != true) {
            validaFalla(asunto, validar)
        } else {

            validaOk(asunto)
        }

        //validando envio total: todos los campos tienen valores y no salio entonces envia formulario
        if (nombreValor && mailValor && telefonoValor && asuntoValor) {
            console.log("xaqui paso")
            return "FormularioValido"
         
        }

    }

    const validaFalla = (input, msje) => {
        const formControl = input.parentElement
        const aviso = formControl.querySelector('span')
        aviso.innerText = msje

        formControl.className = 'form-control falla'
    }
    const validaOk = (input, msje) => {
        const formControl = input.parentElement
        const aviso = formControl.querySelector('span')
        aviso.innerText = ""
        formControl.className = 'form-control ok'
    }


})




//++++++++++en esta sección se crean las funciones de validación de los campos del formulario++++++++++++
//validar campo nombre
function validarNombre(datos) {
    let valido;
    // validar que tenga datos o no este vacio
    if (valido = validarNoVacio(datos)) {
        // valida que los datos sean letras o espacio
        if (valido = validarCadenas(datos)) {
            formValido = true;
            return formValido;
        }
        else {
            alerta = "Formato no valido, sólo debe contener letras";
            formValido = false;
            return alerta;
        }
    }
    else {
        alerta = "El campo esta vacio";
        formValido = false;
        return alerta;
    }
}
//validar campo mail

function validarCorreo(datos) {

    if (valido = validarNoVacio(datos)) {
        //valida que el mail tenga el formato correo
        let expr = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;

        if (!expr.test(datos)) {

            alerta = "Mail con formato no valido"
            formValido = false
            return alerta
        }
        else {
            formValido = true
            return formValido

        }
    }
    else {
        alerta = "El campo esta vacio";
        formValido = false;
        return alerta;
    }

}
//validar campo telefono
function validarTelefono(datos) {
    if (valido = validarNoVacio(datos)) {
        //valida que el telefono tenga el formato correcto
        let expr = /^(\+?\d{0,3}?)(\s?\d{0,3}?)(\s?\d{8}?)$/;
        //    if (!validarNumeros(datos))
        if (!expr.test(datos)) {
            alerta = "Formato no valido"
            formValido = false
            return alerta
        }
        else {
            formValido = true
            return formValido
        }
    }
    else {
        alerta = "El campo esta vacio";
        formValido = false;
        return alerta;
    }
}
//validar campo asunto
function validarAsunto(datos) {

    //Validar que al menos coloque el asunto de su consulta
    if (valido = validarNoVacio(datos)) {
        formValido = true
        return formValido

    }
    else {
        alerta = "Debe indicar el motivo de su consulta"
        formValido = false
        return alerta
    }

}
// //++++++++++en esta sección se crean las funciones de validación de usos generales++++++++++++

//Esta funcion valida que el nombre haya introducido datos
function validarNoVacio(campo) {
    let datos;
    if (campo) {
        datos = true;
        return datos;
    }
    else {
        datos = false;
        return datos;
    }

}
//Esta funcion valida que el usuario haya introducido solo letras o espacios
function validarCadenas(cadena) {
    let x, c;
    for (x = 0; x < cadena.length; x++) {
        c = cadena.charAt(x);
        // Si no está entre a y z, ni entre A y Z, ni es un espacio
        if (!((c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z') || c == ' ')) {
            return false;
        }
    }
    return true;
}

//Esta funcion valida que el usuario haya introducido solo numeros    
function validarNumeros(cadena) {
    let x, c;
    for (x = 0; x < cadena.length; x++) {
        c = cadena.charAt(x);
        // Si no está entre 0 y 9, ni es un espacio
        if (!((c >= '0' && c <= '9') || c == ' ')) {
            return false;
        }
    }
    return true;
}

// Esta funcion devuelve la posicion del caracter señalado o false si el mismo no esta presente   
function validarCaracter(cadena, caracter) {
    let x, c;
    for (x = 0; x < cadena.length; x++) {
        c = cadena.charAt(x);
        // validar que tenga un arroba y obtener la ubicacion
        if (c == caracter) {
            posicion = x;
            return (posicion);
        }
    }
    return false;
}

