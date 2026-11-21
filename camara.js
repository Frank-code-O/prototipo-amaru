/* Lector opcional de QR con la cámara del navegador.
 * La simulación funciona de forma independiente en funciones.js. */
function crearLectorCamara({ video, alCambiarEstado, alInformar, esCodigoValido, alLeer }) {
  let flujo = null;
  let animacion = null;
  let sesion = 0;

  function detener() {
    sesion += 1;
    if (animacion !== null) cancelAnimationFrame(animacion);
    animacion = null;
    if (flujo) flujo.getTracks().forEach((pista) => pista.stop());
    flujo = null;
    video.srcObject = null;
    video.hidden = true;
    alCambiarEstado(false);
  }

  async function detectar(detector, sesionActual) {
    if (!flujo || sesionActual !== sesion) return;
    try {
      const codigos = await detector.detect(video);
      if (sesionActual !== sesion) return;
      if (codigos.length) {
        const valor = String(codigos[0].rawValue || '').trim();
        if (esCodigoValido(valor)) {
          detener();
          alLeer(valor);
          return;
        }
        alInformar('Código no reconocido. Enfoca un QR del recorrido.');
      }
    } catch {
      // Algunos navegadores rechazan fotogramas mientras el vídeo se inicia.
    }
    if (flujo && sesionActual === sesion) {
      animacion = requestAnimationFrame(() => detectar(detector, sesionActual));
    }
  }

  async function iniciar() {
    detener();
    const sesionActual = sesion;
    alInformar('');

    if (!window.isSecureContext || !navigator.mediaDevices?.getUserMedia) {
      alInformar('La cámara requiere un contexto seguro (HTTPS o localhost) y un navegador compatible. Puedes usar la simulación.');
      return;
    }
    if (!('BarcodeDetector' in window)) {
      alInformar('Este navegador no admite la lectura QR integrada. Usa un navegador compatible o la simulación.');
      return;
    }

    try {
      const detector = new BarcodeDetector({ formats: ['qr_code'] });
      const nuevoFlujo = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: { ideal: 'environment' } },
        audio: false
      });
      if (sesionActual !== sesion) {
        nuevoFlujo.getTracks().forEach((pista) => pista.stop());
        return;
      }
      flujo = nuevoFlujo;
      video.srcObject = flujo;
      video.hidden = false;
      await video.play();
      if (sesionActual !== sesion) return;
      alCambiarEstado(true);
      alInformar('Enfoca el código del punto.');

      detectar(detector, sesionActual);
    } catch {
      if (sesionActual !== sesion) return;
      detener();
      alInformar('No se pudo abrir la cámara. Revisa el permiso o usa la simulación.');
    }
  }

  return { iniciar, detener };
}
