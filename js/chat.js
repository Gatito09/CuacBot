const contenedorChat = document.getElementById("chatContenido");

// funcion para enviar mensajes
const inputTexto = document.getElementById("inputTexto");
const btnEnviar = document.querySelector(".entradaTexto .contEntradaTexto iconify-icon");

let chatNum = 1;

function cargarMensaje(mensaje) {
    const div = document.createElement("div");

    div.classList.add("burbujaMe", `nmBurbuja${chatNum}`);

    div.innerHTML = `<p>${mensaje}</p>`;

    if (contenedorChat.firstChild) {
        contenedorChat.insertBefore(div, contenedorChat.firstChild);
    } else {
        contenedorChat.appendChild(div);
    }
    chatNum++;
}
btnEnviar.addEventListener("click", () => {
    const mensaje = inputTexto.value.trim().toLowerCase();
    if (mensaje) {
        cargarMensaje(mensaje);
        procesamientoTexto(mensaje);
        inputTexto.value = "";
    } else {
        return
    }
})
inputTexto.addEventListener("keypress", (e) => {
    if (e.key == "Enter") {
        const mensaje = inputTexto.value.trim().toLowerCase();
        if (mensaje) {
            cargarMensaje(mensaje);
            procesamientoTexto(mensaje);
            inputTexto.value = "";
        } else {
            return
        }
    }
})

// funcion para responder mensajes
chatReplyNum = 1
function responderMensaje(respuesta) {
    const div = document.createElement("div");
    div.classList.add("burbujaBot", `nmBurbuja${chatReplyNum}`);

    const parrafo = document.createElement("p");
    div.appendChild(parrafo);

    if (contenedorChat.firstChild) {
        contenedorChat.insertBefore(div, contenedorChat.firstChild);
    } else {
        contenedorChat.appendChild(div);
    }
    chatReplyNum++;

    let i = 0;
    let intervalo = setInterval(() => {
        if (i < respuesta.length) {
            parrafo.innerHTML += respuesta.charAt(i);
            i++;
        } else {
            clearInterval(intervalo);
        }
    }, 80);

    
}

function procesamientoTexto(mensajeEnviado) {
    fetch('json/respuestas.json')
    .then(response => response.json())
    .then(respJson => {
        let respuesta = respJson[mensajeEnviado];

        if (!respuesta & mensajeEnviado || !respJson[mensajeEnviado]) {
            respuesta = "Disculpa pero no entendi tu mensaje. ¿Podrías intentarlo de otra manera? 🧐";
        }

        responderMensaje(respuesta)

        console.log(respJson[mensajeEnviado])
    })
}
