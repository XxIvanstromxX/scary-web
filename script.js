// Función para obtener información del dispositivo
async function obtenerInformacionDispositivo() {
  const info = {
    navegador: navigator.userAgent,
    plataforma: navigator.platform,
    idioma: navigator.language,
    cookiesHabilitadas: navigator.cookieEnabled ? "SÍ" : "NO",
    anchoPantalla: window.screen.width,
    altoPantalla: window.screen.height,
    memoriaDisponible: navigator.deviceMemory
      ? `${navigator.deviceMemory} GB`
      : "No disponible",
    conexion: navigator.connection
      ? navigator.connection.effectiveType || "Desconocida"
      : "No disponible",
    bateria: "Obteniendo...",
    horaLocal: new Date().toLocaleTimeString(),
    fechaLocal: new Date().toLocaleDateString(),
  };

  // Intentar obtener nivel de batería
  try {
    if ("getBattery" in navigator) {
      const bateria = await navigator.getBattery();
      info.bateria = `${Math.round(bateria.level * 100)}%`;
    } else {
      info.bateria = "No disponible";
    }
  } catch (error) {
    info.bateria = "No disponible";
  }

  return info;
}

// Función para obtener la IP pública
async function obtenerIP() {
  try {
    const respuesta = await fetch("https://api.ipify.org?format=json");
    const datos = await respuesta.json();
    return datos.ip;
  } catch (error) {
    return "No se pudo obtener la IP";
  }
}

// Array de mensajes iniciales
const mensajesFijos = [
  "[INFO] Iniciando programa de rastreo avanzado...",
  "[INFO] Estableciendo conexión segura...",
  "[SISTEMA] Acceso concedido al sistema principal",
  "[ALERTA] Objetivo detectado en la red",
  "[INFO] Comenzando extracción de datos en tiempo real...",
];

// Elemento contenedor de mensajes
const contenedor = document.getElementById("mensajes");
let contador = 0;

// Función para mostrar mensajes
function mostrarMensaje(texto, tipoMensaje = "info") {
  const div = document.createElement("div");
  div.className = `mensaje ${tipoMensaje}`;
  div.textContent = texto;
  contenedor.appendChild(div);
  // Auto-scroll hacia abajo
  div.scrollIntoView({ behavior: "smooth" });
}

// Función principal que gestiona toda la secuencia
async function iniciarSimulacion() {
  // Mostrar mensajes iniciales
  const mostrarMensajesIniciales = () => {
    if (contador < mensajesFijos.length) {
      mostrarMensaje(mensajesFijos[contador]);
      contador++;
      setTimeout(mostrarMensajesIniciales, 700);
    } else {
      // Cuando terminan los mensajes fijos, comienza la "recolección" de datos
      iniciarRecoleccionDatos();
    }
  };

  setTimeout(mostrarMensajesIniciales, 1000);
}

// Recolectar y mostrar datos reales
async function iniciarRecoleccionDatos() {
  // Primero mostrar un mensaje de carga
  mostrarMensaje("[INFO] Recopilando datos del objetivo...");

  // Obtener IP
  const ip = await obtenerIP();
  setTimeout(() => {
    mostrarMensaje(`[DATOS] Dirección IP identificada: ${ip}`, "importante");
  }, 2000);

  // Obtener resto de información
  const infoDispositivo = await obtenerInformacionDispositivo();

  // Mostrar datos con retrasos para efecto dramático
  setTimeout(() => {
    mostrarMensaje(
      `[DATOS] Sistema operativo detectado: ${infoDispositivo.plataforma}`,
      "importante"
    );
  }, 3500);

  setTimeout(() => {
    mostrarMensaje(`[DATOS] Navegador: ${infoDispositivo.navegador}`);
  }, 5000);

  setTimeout(() => {
    mostrarMensaje(
      `[DATOS] Resolución de pantalla: ${infoDispositivo.anchoPantalla}x${infoDispositivo.altoPantalla}`
    );
  }, 6500);

  setTimeout(() => {
    mostrarMensaje(`[DATOS] Idioma configurado: ${infoDispositivo.idioma}`);
  }, 8000);

  setTimeout(() => {
    mostrarMensaje(`[DATOS] Nivel de batería: ${infoDispositivo.bateria}`);
  }, 9500);

  setTimeout(() => {
    mostrarMensaje(
      `[DATOS] Hora local del objetivo: ${infoDispositivo.horaLocal}`
    );
  }, 11000);

  setTimeout(() => {
    mostrarMensaje(
      "[ALERTA] Todos los datos han sido extraídos con éxito",
      "alerta"
    );
  }, 12500);
}

// Iniciar la simulación cuando se cargue la página
window.onload = iniciarSimulacion;
