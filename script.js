const mensajes = [
  "[INFO] Obteniendo dirección IP...",
  "[INFO] Localización GPS en curso...",
  "[ALERTA] Posible actividad sospechosa detectada",
  "[INFO] Accediendo a cámara y micrófono...",
  "[INFO] Escaneando red local...",
  "[INFO] Determinando ubicación aproximada...",
  "[ALERTA] Coordenadas encontradas: 19.4326° N, 99.1332° W",
  "[SISTEMA] Enviando reporte a las autoridades...",
  "[ERROR] El intento de ocultarse ha fallado.",
  "[SISTEMA] Se recomienda no cerrar esta ventana.",
];

let i = 0;
const contenedor = document.getElementById("mensajes");

function mostrarMensaje() {
  if (i < mensajes.length) {
    const div = document.createElement("div");
    div.className = "mensaje";
    div.textContent = mensajes[i];
    contenedor.appendChild(div);
    i++;
    setTimeout(mostrarMensaje, 1500);
  }
}

setTimeout(mostrarMensaje, 2000);
