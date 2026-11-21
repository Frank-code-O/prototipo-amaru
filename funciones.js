/* Prototipo académico Amaru.
 * Los datos están en datos.js y el lector de cámara opcional en camara.js. */

const { fichas, puntosQR, pantallas, fuentesVisita } = AMARU_DATOS;
const fichaPorId = new Map(fichas.map((ficha) => [ficha.id, ficha]));
const puntoPorCodigo = new Map(puntosQR.map((punto) => [punto.qrCode, punto]));
const pantallaPorId = new Map(pantallas.map((pantalla) => [pantalla.id, pantalla]));
const CLAVE_VISITA = 'amaru_puntos_v3';
const TOTAL_PUNTOS = puntosQR.length;
const ESPACIO_SVG = 'http://www.w3.org/2000/svg';
const ANCHO_MAPA = 1041;
const ALTO_MAPA = 1510;
const MAX_ZOOM = 8;

const $ = (id) => document.getElementById(id);
const mapa = $('mapArtwork');
const selectorQR = $('qrStopSelect');
const estadoMapa = { escala: 1, x: 0, y: 0, punteros: new Map(), anterior: null, pellizco: null };
let puntoSeleccionado = puntosQR[0];
let temporizadores = [];
let puntosVisitados = cargarProgreso();

/* Elementos de interfaz */
function crearElemento(tipo, texto, clase) {
  const elemento = document.createElement(tipo);
  if (texto !== undefined && texto !== null) elemento.textContent = texto;
  if (clase) elemento.className = clase;
  return elemento;
}

function agregarBoton(contenedor, texto, alPulsar, secundario = false) {
  const boton = crearElemento('button', texto, secundario ? 'secondary' : '');
  boton.type = 'button';
  boton.addEventListener('click', alPulsar);
  contenedor.appendChild(boton);
  return boton;
}

function agregarEnlace(contenedor, texto, destino) {
  const enlace = crearElemento('a', texto, 'nativeLink');
  enlace.href = destino;
  if (/^https?:/i.test(destino)) {
    enlace.target = '_blank';
    enlace.rel = 'noopener noreferrer';
  }
  contenedor.appendChild(enlace);
  return enlace;
}

/* Progreso. Conserva el formato anterior de localStorage: ["Punto 01", ...]. */
function cargarProgreso() {
  try {
    const guardado = JSON.parse(localStorage.getItem(CLAVE_VISITA) || '[]');
    if (!Array.isArray(guardado)) return new Set();
    return new Set(puntosQR.filter((punto) => guardado.includes(punto.nombre) || guardado.includes(punto.qrCode)).map((punto) => punto.qrCode));
  } catch {
    return new Set();
  }
}

function guardarProgreso() {
  try {
    const nombres = puntosQR.filter((punto) => puntosVisitados.has(punto.qrCode)).map((punto) => punto.nombre);
    localStorage.setItem(CLAVE_VISITA, JSON.stringify(nombres));
  } catch {
    // El prototipo sigue funcionando durante la sesión si el navegador bloquea el almacenamiento.
  }
}

function reiniciarProgreso() {
  puntosVisitados.clear();
  puntoSeleccionado = puntosQR[0];
  guardarProgreso();
}

function buscarPuntoPorCodigo(valor) {
  return puntoPorCodigo.get(String(valor || '').trim().toUpperCase());
}

function limpiarAvisosQR() {
  $('qrError').textContent = '';
  $('qrError').classList.remove('qrNotice');
  $('cameraMessage').textContent = '';
  $('simStatus').textContent = 'Listo para simular';
  $('cameraMessage').classList.remove('qrNotice');
  $('simStatus').classList.remove('qrNotice');
}

function registrarCodigo(valor, origen = 'manual') {
  limpiarAvisosQR();
  const punto = buscarPuntoPorCodigo(valor);
  if (!punto) {
    $('qrError').textContent = `Código no reconocido. Solo se aceptan los ${TOTAL_PUNTOS === 9 ? 'nueve' : TOTAL_PUNTOS} puntos del recorrido.`;
    return false;
  }
  if (puntosVisitados.has(punto.qrCode)) {
    const aviso = `${punto.nombre} ya fue registrado en esta visita. El avance no cambia.`;
    const mensaje = origen === 'simulacion' ? $('simStatus')
      : origen === 'camara' ? $('cameraMessage') : $('qrError');
    mensaje.textContent = aviso;
    mensaje.classList.add('qrNotice');
    return false;
  }
  puntoSeleccionado = punto;
  puntosVisitados.add(punto.qrCode);
  guardarProgreso();
  $('visitTitle').textContent = 'Visita registrada';
  $('visitMessage').textContent = `Se registró ${punto.nombre}. Avance: ${puntosVisitados.size}/${TOTAL_PUNTOS}. Los demás puntos siguen pendientes.`;
  show('mapa');
  enfocarCoordenadas(punto.coordenadas);
  mostrarContextoMapa(`Punto registrado: ${punto.nombre}`);
  return true;
}

/* Pantallas y navegación */
function ocultarPantallas() {
  ['screen', 'homeScreen', 'mapScreen', 'qrLive', 'listLive', 'visitLive', 'servicesLive', 'nativeScreen', 'ficheQrAction']
    .forEach((id) => { $(id).style.display = 'none'; });
}

function actualizarNavegacion(id) {
  document.querySelectorAll('.screenNav button').forEach((boton) => {
    if (boton.dataset.go === id) boton.setAttribute('aria-current', 'page');
    else boton.removeAttribute('aria-current');
  });
}

function actualizarPanel(id, titulo) {
  const panel = $('actions');
  panel.replaceChildren();
  $('screenTitle').textContent = titulo;

  function acceso(texto, destino) {
    agregarBoton(panel, texto, () => show(destino));
  }
  if (id === 'inicio') {
    acceso('Explorar el mapa', 'mapa');
    acceso('Información y cómo llegar', 'informacion');
    acceso('Ver recorrido sugerido', 'recorrido');
  } else if (id === 'mapa') {
    acceso('Seleccionar un animal', 'animal');
    acceso('Ver ficha Alpacas (boceto web)', 'alpacas');
    acceso('Seleccionar zona Los Andes', 'zona');
    acceso('Buscar un animal', 'busqueda');
    acceso('Abrir Aviario tropical', 'grupo_aviario');
    acceso('Abrir Reptiles', 'grupo_reptiles');
    acceso('Abrir Serpientes', 'grupo_serpientes');
    acceso('Escanear QR', 'qr');
    acceso('Ver recorrido', 'recorrido');
    acceso('Información y cómo llegar', 'informacion');
    acceso('Iniciar nueva visita', 'reinicio');
    fichas.forEach((ficha) => acceso(`Ficha ${ficha.orden}: ${ficha.nombreMapa}`, ficha.id));
  } else if (id === 'zona') {
    acceso('Abrir Oso andino', 'animal');
    acceso('Volver al mapa', 'mapa');
  } else if (id === 'recorrido') {
    acceso('Ver lista paso a paso', 'lista');
    acceso('Volver al mapa', 'mapa');
  } else if (id === 'lista') {
    acceso('Ver recorrido en mapa', 'recorrido');
    acceso('Volver al mapa', 'mapa');
  } else if (id === 'qr') {
    renderSelectorLateral(panel);
  } else if (id === 'visitado') {
    acceso('Volver al mapa', 'mapa');
  } else if (id === 'reiniciado') {
    acceso('Volver al mapa', 'mapa');
  } else if (fichaPorId.has(id) || id === 'informacion' || id === 'reinicio') {
    agregarBoton(panel, 'Volver al mapa', () => show('mapa'), true);
  }
  $('status').textContent = fichaPorId.has(id) || id === 'informacion' || id === 'reinicio'
    ? `Prototipo académico · ${puntosVisitados.size}/${TOTAL_PUNTOS} puntos visitados`
    : `Pantalla: ${titulo} · Paradas QR visitadas en esta visita: ${puntosVisitados.size}/${TOTAL_PUNTOS}.`;
}

function show(destino) {
  const id = destino === 'busqueda' ? 'lista' : destino;
  if (id !== 'qr') {
    lectorCamara.detener();
    cancelarSimulacion();
  }
  if ('speechSynthesis' in window) speechSynthesis.cancel();
  if (id === 'reiniciado') reiniciarProgreso();

  ocultarPantallas();
  actualizarNavegacion(id);
  const ficha = fichaPorId.get(id);
  const pantalla = pantallaPorId.get(id);
  const titulo = ficha ? ficha.nombre : (pantalla?.nombre || id);

  if (ficha) {
    renderFicha(ficha);
  } else if (id === 'informacion') {
    renderInformacion();
  } else if (id === 'reinicio') {
    renderConfirmacionReinicio();
  } else if (id === 'inicio') {
    renderInicio();
  } else if (['mapa', 'zona', 'recorrido', 'reiniciado'].includes(id)) {
    renderMapa(id);
  } else if (id === 'lista') {
    renderLista();
  } else if (id === 'qr') {
    renderLectorQR();
  } else if (id === 'servicios') {
    $('servicesLive').style.display = 'block';
  } else if (id === 'visitado') {
    $('visitLive').style.display = 'block';
  } else if (pantalla?.wireframe) {
    mostrarWireframe(pantalla);
  } else {
    show('inicio');
    return;
  }
  actualizarPanel(id, titulo);
}

function mostrarWireframe(pantalla) {
  const imagen = $('screen');
  imagen.src = pantalla.wireframe;
  imagen.alt = `Wireframe: ${pantalla.nombre}`;
  imagen.style.display = 'block';
}

function renderInicio() {
  $('homeScreen').style.display = 'flex';
  $('homeProgressCount').textContent = `${puntosVisitados.size}/${TOTAL_PUNTOS}`;
  $('homeProgressBar').style.width = `${puntosVisitados.size / TOTAL_PUNTOS * 100}%`;
}

function renderLista() {
  $('listLive').style.display = 'block';
  $('animalSearch').value = '';
  $('routeSummary').textContent = `${puntosVisitados.size}/${TOTAL_PUNTOS} puntos registrados. Las fichas se consultan de manera independiente.`;
  const animales = $('routeRows');
  const puntos = $('pointRows');
  animales.replaceChildren();
  puntos.replaceChildren();

  fichas.forEach((ficha) => {
    const fila = crearElemento('div', null, 'routeRow animalRow');
    const info = crearElemento('div');
    info.append(crearElemento('strong', ficha.nombreLista), crearElemento('small', 'Ficha educativa'));
    const boton = crearElemento('button', 'Ficha');
    boton.type = 'button';
    boton.addEventListener('click', () => show(ficha.id));
    fila.append(info, boton);
    animales.appendChild(fila);
  });
  puntosQR.forEach((punto) => {
    const fila = crearElemento('div', null, 'routeRow');
    const info = crearElemento('div');
    const estado = crearElemento('small', puntosVisitados.has(punto.qrCode) ? '✓ Registrado' : 'Pendiente');
    if (puntosVisitados.has(punto.qrCode)) estado.className = 'done';
    info.append(crearElemento('strong', punto.nombre), crearElemento('small', punto.referencia), estado);
    fila.appendChild(info);
    puntos.appendChild(fila);
  });
}

function filtrarAnimales(texto) {
  const consulta = texto.trim().toLocaleLowerCase('es');
  document.querySelectorAll('#routeRows .animalRow').forEach((fila) => {
    fila.hidden = !fila.querySelector('strong').textContent.toLocaleLowerCase('es').includes(consulta);
  });
}

/* Fichas educativas */
function prepararPantallaNativa(titulo) {
  const contenedor = $('nativeScreen');
  contenedor.replaceChildren();
  contenedor.style.display = 'block';
  contenedor.scrollTop = 0;
  const cabecera = crearElemento('div', null, 'nativeHead');
  const volver = agregarBoton(cabecera, '←', () => show('mapa'), true);
  volver.classList.add('backButton');
  volver.setAttribute('aria-label', 'Volver al mapa');
  cabecera.appendChild(crearElemento('h2', titulo));
  contenedor.appendChild(cabecera);
  return contenedor;
}

function crearTablaFicha(ficha) {
  const tabla = crearElemento('table', null, 'animalTable');
  tabla.appendChild(crearElemento('caption', ficha.especies.length > 1 ? 'Información de los animales de esta parada' : 'Alimentación y origen natural'));
  const encabezado = crearElemento('thead');
  const filaEncabezado = crearElemento('tr');
  ['Animal', 'Qué come', 'Dónde vive / origen'].forEach((titulo) => {
    const celda = crearElemento('th', titulo);
    celda.scope = 'col';
    filaEncabezado.appendChild(celda);
  });
  encabezado.appendChild(filaEncabezado);
  tabla.appendChild(encabezado);
  const cuerpo = crearElemento('tbody');
  ficha.especies.forEach((especie) => {
    const fila = crearElemento('tr');
    const nombre = crearElemento('th', especie.nombre);
    nombre.scope = 'row';
    const dieta = crearElemento('td', especie.dieta);
    dieta.dataset.label = 'Qué come';
    const habitat = crearElemento('td', especie.habitat);
    habitat.dataset.label = 'Dónde vive / origen';
    fila.append(nombre, dieta, habitat);
    cuerpo.appendChild(fila);
  });
  tabla.appendChild(cuerpo);
  return tabla;
}

function agregarFuentesFicha(contenedor, ficha) {
  const especiesConFuente = ficha.especies.filter((especie) => especie.mostrarFuente && especie.fuente);
  if (!especiesConFuente.length) return;
  const detalles = crearElemento('details', null, 'sourceDetails');
  detalles.appendChild(crearElemento('summary', 'Fuentes consultadas'));
  especiesConFuente.forEach((especie) => {
    const parrafo = crearElemento('p');
    const enlace = crearElemento('a', `${especie.nombre} · ${especie.fuente.nombre}`);
    enlace.href = especie.fuente.url;
    enlace.target = '_blank';
    enlace.rel = 'noopener noreferrer';
    parrafo.appendChild(enlace);
    detalles.appendChild(parrafo);
  });
  detalles.appendChild(crearElemento('p', 'Consulta: 16 de noviembre de 2026. Los enlaces externos requieren internet.'));
  contenedor.appendChild(detalles);
}

function textoParaVoz(ficha) {
  const especies = ficha.especies.map((especie) => {
    const nombreRepetido = ficha.especies.length === 1
      && especie.nombre.trim().toLocaleLowerCase('es') === ficha.nombre.trim().toLocaleLowerCase('es');
    return `${nombreRepetido ? '' : `${especie.nombre}. `}Qué come: ${especie.dieta} Dónde vive: ${especie.habitat}`;
  });
  return `${ficha.nombre}. ${especies.join(' ')}. Cómo vive: ${ficha.comportamiento}`;
}

function agregarLecturaEnVozAlta(contenedor, ficha) {
  const aviso = crearElemento('p', 'Ejemplo de lectura en voz alta; la voz depende del dispositivo.', 'nativeNote');
  contenedor.appendChild(aviso);
  agregarBoton(contenedor, 'Escuchar ficha', () => {
    if (!('speechSynthesis' in window)) {
      aviso.textContent = 'La lectura en voz alta no está disponible en este dispositivo.';
      return;
    }
    speechSynthesis.cancel();
    const lectura = new SpeechSynthesisUtterance(textoParaVoz(ficha));
    lectura.lang = 'es-EC';
    speechSynthesis.speak(lectura);
  }, true);
  agregarBoton(contenedor, 'Detener lectura', () => {
    if ('speechSynthesis' in window) speechSynthesis.cancel();
  }, true);
}

function renderFicha(ficha) {
  const contenedor = prepararPantallaNativa('Ficha educativa');
  contenedor.appendChild(crearElemento('h2', ficha.nombre));
  contenedor.appendChild(crearElemento('p', 'Ficha educativa · información disponible sin conexión', 'nativeNote'));
  if (ficha.foto) {
    const imagen = crearElemento('img');
    imagen.src = ficha.foto;
    imagen.alt = `Fotografía referencial de ${ficha.nombre}`;
    imagen.className = 'cardPhoto';
    contenedor.append(imagen, crearElemento('p', 'Fotografía referencial', 'photoLabel'));
  }
  contenedor.appendChild(crearTablaFicha(ficha));
  const comportamiento = crearElemento('section', null, 'serviceCard');
  comportamiento.append(crearElemento('strong', 'Cómo vive'), crearElemento('p', ficha.comportamiento));
  contenedor.appendChild(comportamiento);
  ficha.especies.filter((especie) => especie.nombreCientifico).forEach((especie) => {
    contenedor.appendChild(crearElemento('p', `${especie.nombre}: ${especie.nombreCientifico}`, 'nativeNote'));
  });
  contenedor.appendChild(crearElemento('p', ficha.nota, 'nativeNote'));
  agregarFuentesFicha(contenedor, ficha);
  if (ficha.lecturaEnVozAlta) agregarLecturaEnVozAlta(contenedor, ficha);
  agregarBoton(contenedor, 'Volver al mapa', () => show('mapa'));
}

function renderConfirmacionReinicio() {
  const contenedor = prepararPantallaNativa('Nueva visita');
  contenedor.appendChild(crearElemento('p', 'Se borrarán los puntos registrados en este navegador. Puedes comenzar otra visita.'));
  agregarBoton(contenedor, 'Confirmar nueva visita', () => show('reiniciado'));
  agregarBoton(contenedor, 'Cancelar', () => show('mapa'), true);
}

/* Información general */
function renderInformacion() {
  const contenedor = prepararPantallaNativa('Información');
  const secciones = [
    ['Horario', 'Lunes a domingo · 09:00 a 18:00'],
    ['Entradas', 'Adultos (18–64): $10 · Jóvenes (13–17): $7 · Niños (2–12): $6 · Desde 65 años: $5'],
    ['Cómo llegar', 'Autopista Cuenca–Azogues, km 10,5, frente al Hospital del Río. Acceso por 600 m de vía lastrada.'],
    ['Duración y recomendaciones', 'Visita aproximada: 4 horas. Senderos naturales con subidas y bajadas; usa calzado cómodo.'],
    ['Charlas y actividades', 'Consulta en el bioparque la programación disponible durante tu visita.'],
    ['Biorregiones', 'Andes, Mágico Bosque Seco, Amazonía, Islas Encantadas y África Salvaje. Son divisiones temáticas del parque.']
  ];
  secciones.forEach(([titulo, texto]) => {
    const tarjeta = crearElemento('section', null, 'serviceCard');
    tarjeta.append(crearElemento('strong', titulo), crearElemento('p', texto));
    if (titulo === 'Cómo llegar') {
      agregarEnlace(tarjeta, 'Abrir Google Maps ↗', 'https://www.google.com/maps/search/?api=1&query=Zool%C3%B3gico+Amaru+Cuenca+Ecuador');
      tarjeta.appendChild(crearElemento('small', 'Requiere internet.'));
    }
    contenedor.appendChild(tarjeta);
  });
  contenedor.append(crearElemento('h2', 'Información y ayuda'), crearElemento('p', 'Comunícate con Amaru para consultas de visita. La ubicación física del punto de información y de primeros auxilios para visitantes está por confirmar.'));
  ['0969956055', '0995681677', '0993781679'].forEach((telefono) => agregarEnlace(contenedor, `Llamar al ${telefono}`, `tel:${telefono}`));
  agregarBoton(contenedor, 'Ver servicios para visitantes', () => show('servicios'), true);
  agregarBoton(contenedor, 'Iniciar nueva visita', () => show('reinicio'), true);
  contenedor.appendChild(crearElemento('p', 'Datos contrastados con Horarios y precios y Cómo llegar de Amaru, el 16 de noviembre de 2026.', 'nativeNote'));
  agregarEnlace(contenedor, 'Fuente: horarios y precios', fuentesVisita.horarios.url);
  agregarEnlace(contenedor, 'Fuente: cómo llegar', fuentesVisita.llegar.url);
}

function prepararServicios() {
  const ayuda = crearElemento('div', null, 'serviceCard');
  ayuda.append(crearElemento('strong', 'Información y ayuda'), crearElemento('small', 'Atención de consultas de visita. Ubicación física por confirmar.'));
  agregarBoton(ayuda, 'Consultar contacto', () => show('informacion'), true);
  $('servicesLive').insertBefore(ayuda, $('serviceBack'));
}

/* Mapa, marcadores, zoom y desplazamiento */
function mostrarContextoMapa(texto) {
  $('mapContext').textContent = texto;
  $('mapContext').style.display = texto ? 'block' : 'none';
}

function crearMarcadorAnimal(ficha, coordenada) {
  const circulo = document.createElementNS(ESPACIO_SVG, 'circle');
  circulo.setAttribute('cx', coordenada.x);
  circulo.setAttribute('cy', coordenada.y);
  circulo.setAttribute('r', coordenada.radio);
  circulo.setAttribute('fill', 'transparent');
  circulo.setAttribute('tabindex', '0');
  circulo.setAttribute('role', 'button');
  circulo.setAttribute('aria-label', `Abrir ficha: ${ficha.nombreMapa}`);
  circulo.style.pointerEvents = 'all';
  circulo.style.cursor = 'pointer';
  const titulo = document.createElementNS(ESPACIO_SVG, 'title');
  titulo.textContent = `Abrir ficha: ${ficha.nombreMapa}`;
  circulo.appendChild(titulo);
  circulo.addEventListener('click', () => show(ficha.id));
  circulo.addEventListener('keydown', (evento) => {
    if (evento.key === 'Enter' || evento.key === ' ') {
      evento.preventDefault();
      show(ficha.id);
    }
  });
  return circulo;
}

function crearMarcaVisitada(punto) {
  const { x, y } = punto.coordenadas;
  const circulo = document.createElementNS(ESPACIO_SVG, 'circle');
  Object.entries({ cx: x + 10, cy: y - 13, r: 10, fill: '#fff', stroke: '#245e40', 'stroke-width': 3 })
    .forEach(([atributo, valor]) => circulo.setAttribute(atributo, valor));
  circulo.style.pointerEvents = 'none';
  const texto = document.createElementNS(ESPACIO_SVG, 'text');
  Object.entries({ x: x + 10, y: y - 9, 'text-anchor': 'middle', fill: '#245e40', 'font-size': 13, 'font-weight': 'bold' })
    .forEach(([atributo, valor]) => texto.setAttribute(atributo, valor));
  texto.style.pointerEvents = 'none';
  texto.textContent = '✓';
  return [circulo, texto];
}

function renderMarcadores() {
  const capa = $('visitedMapOverlay');
  capa.replaceChildren();
  fichas.forEach((ficha) => ficha.coordenadas.forEach((coordenada) => capa.appendChild(crearMarcadorAnimal(ficha, coordenada))));
  puntosQR.filter((punto) => puntosVisitados.has(punto.qrCode)).forEach((punto) => capa.append(...crearMarcaVisitada(punto)));
}

function renderMapa(id) {
  $('mapScreen').style.display = 'flex';
  const titulos = { mapa: 'Mapa del Bioparque', zona: 'Explora el mapa', recorrido: 'Recorrido sugerido', reiniciado: 'Mapa del Bioparque' };
  const ayudas = { mapa: '', zona: 'Selecciona un punto para consultar información.', recorrido: 'Circuito circular · nueve puntos QR. Consulta la lista paso a paso.', reiniciado: 'Nueva visita iniciada.' };
  $('mapTitle').textContent = titulos[id];
  mostrarContextoMapa(ayudas[id]);
  const filtros = document.querySelectorAll('#mapFilters span');
  filtros[0].classList.toggle('selected', ['mapa', 'zona', 'reiniciado'].includes(id));
  filtros[1].classList.remove('selected');
  filtros[2].classList.toggle('selected', id === 'recorrido');
  $('visitCount').textContent = `Visitados: ${puntosVisitados.size}/${TOTAL_PUNTOS}`;
  renderMarcadores();
}

function limitarDesplazamiento() {
  const marco = mapa.parentElement;
  const maxX = marco.clientWidth * (estadoMapa.escala - 1) / 2;
  const maxY = marco.clientHeight * (estadoMapa.escala - 1) / 2;
  estadoMapa.x = Math.max(-maxX, Math.min(maxX, estadoMapa.x));
  estadoMapa.y = Math.max(-maxY, Math.min(maxY, estadoMapa.y));
}

function dibujarMapa() {
  const marco = mapa.parentElement;
  const ancho = marco.clientWidth;
  const alto = marco.clientHeight;
  if (!ancho || !alto) return;
  limitarDesplazamiento();
  mapa.style.width = `${ancho * estadoMapa.escala}px`;
  mapa.style.height = `${alto * estadoMapa.escala}px`;
  mapa.style.left = `${(ancho - ancho * estadoMapa.escala) / 2 + estadoMapa.x}px`;
  mapa.style.top = `${(alto - alto * estadoMapa.escala) / 2 + estadoMapa.y}px`;
  mapa.style.transform = 'none';
}

function cambiarZoom(factor) {
  estadoMapa.escala = Math.max(1, Math.min(MAX_ZOOM, estadoMapa.escala * factor));
  if (estadoMapa.escala === 1) { estadoMapa.x = 0; estadoMapa.y = 0; }
  dibujarMapa();
}

function enfocarCoordenadas({ x, y }) {
  const marco = mapa.parentElement.getBoundingClientRect();
  const proporcion = Math.min(marco.width / ANCHO_MAPA, marco.height / ALTO_MAPA);
  estadoMapa.escala = 3;
  estadoMapa.x = -(x - ANCHO_MAPA / 2) * proporcion * 3;
  estadoMapa.y = -(y - ALTO_MAPA / 2) * proporcion * 3;
  dibujarMapa();
}

function distanciaPunteros() {
  const [primero, segundo] = [...estadoMapa.punteros.values()];
  return Math.hypot(primero.x - segundo.x, primero.y - segundo.y);
}

function iniciarGesto(evento) {
  if (evento.target.closest?.('circle')) return;
  mapa.setPointerCapture(evento.pointerId);
  estadoMapa.punteros.set(evento.pointerId, { x: evento.clientX, y: evento.clientY });
  if (estadoMapa.punteros.size === 1) {
    estadoMapa.anterior = { x: evento.clientX, y: evento.clientY };
    estadoMapa.pellizco = null;
  } else if (estadoMapa.punteros.size === 2) {
    estadoMapa.pellizco = { distancia: distanciaPunteros(), escala: estadoMapa.escala };
    estadoMapa.anterior = null;
  }
}

function moverGesto(evento) {
  if (!estadoMapa.punteros.has(evento.pointerId)) return;
  estadoMapa.punteros.set(evento.pointerId, { x: evento.clientX, y: evento.clientY });
  if (estadoMapa.punteros.size === 2 && estadoMapa.pellizco) {
    estadoMapa.escala = Math.max(1, Math.min(MAX_ZOOM, estadoMapa.pellizco.escala * distanciaPunteros() / Math.max(1, estadoMapa.pellizco.distancia)));
    dibujarMapa();
  } else if (estadoMapa.punteros.size === 1 && estadoMapa.anterior) {
    estadoMapa.x += evento.clientX - estadoMapa.anterior.x;
    estadoMapa.y += evento.clientY - estadoMapa.anterior.y;
    estadoMapa.anterior = { x: evento.clientX, y: evento.clientY };
    dibujarMapa();
  }
}

function finalizarGesto(evento) {
  estadoMapa.punteros.delete(evento.pointerId);
  estadoMapa.anterior = estadoMapa.punteros.size === 1 ? [...estadoMapa.punteros.values()][0] : null;
  estadoMapa.pellizco = null;
}

/* Simulación QR: el código del punto seleccionado es la única fuente de verdad. */
function llenarSelectorQR(selector) {
  selector.replaceChildren();
  puntosQR.forEach((punto) => {
    const estado = puntosVisitados.has(punto.qrCode) ? ' · Registrado' : '';
    const opcion = crearElemento('option', `${punto.nombre} · ${punto.referencia}${estado}`);
    opcion.value = punto.qrCode;
    selector.appendChild(opcion);
  });
  selector.value = puntoSeleccionado.qrCode;
}

function actualizarSimulacion() {
  const punto = buscarPuntoPorCodigo(selectorQR.value);
  if (!punto) return;
  puntoSeleccionado = punto;
  $('simQrImage').src = punto.imagen;
  $('simQrImage').alt = `Código QR de ejemplo del punto ${punto.orden}`;
  $('qrCodeInput').value = punto.qrCode;
}

function cancelarSimulacion() {
  temporizadores.forEach(clearTimeout);
  temporizadores = [];
  $('simFrame').classList.remove('scanning', 'simSuccess');
  $('simStatus').textContent = 'Listo para simular';
  $('simStatus').classList.remove('qrNotice');
  $('qrSimulate').disabled = false;
  $('qrSimulate').textContent = 'Simular escaneo';
  selectorQR.disabled = false;
}

function iniciarSimulacion() {
  const punto = buscarPuntoPorCodigo(selectorQR.value);
  if (!punto) return;
  lectorCamara.detener();
  cancelarSimulacion();
  limpiarAvisosQR();
  if (puntosVisitados.has(punto.qrCode)) {
    registrarCodigo(punto.qrCode, 'simulacion');
    return;
  }
  $('simFrame').classList.add('scanning');
  $('simStatus').textContent = 'Simulando lectura…';
  $('qrSimulate').disabled = true;
  $('qrSimulate').textContent = 'Escaneando…';
  selectorQR.disabled = true;
  temporizadores.push(setTimeout(() => {
    $('simFrame').classList.remove('scanning');
    $('simFrame').classList.add('simSuccess');
    $('simStatus').textContent = '✓ Código reconocido. Abriendo mapa…';
    temporizadores.push(setTimeout(() => registrarCodigo(punto.qrCode, 'simulacion'), 1300));
  }, 1800));
}

function renderLectorQR() {
  $('qrLive').style.display = 'block';
  $('qrLive').scrollTop = 0;
  limpiarAvisosQR();
  llenarSelectorQR(selectorQR);
  selectorQR.value = puntoSeleccionado.qrCode;
  actualizarSimulacion();
}

function renderSelectorLateral(panel) {
  const ayuda = crearElemento('p', 'Elige el punto para simular su lectura:', 'controlHint');
  const selector = crearElemento('select');
  selector.setAttribute('aria-label', 'Punto QR de demostración');
  llenarSelectorQR(selector);
  selector.addEventListener('change', () => {
    const punto = buscarPuntoPorCodigo(selector.value);
    if (!punto) return;
    puntoSeleccionado = punto;
    selectorQR.value = punto.qrCode;
    limpiarAvisosQR();
    cancelarSimulacion();
    actualizarSimulacion();
  });
  panel.append(ayuda, selector);
  agregarBoton(panel, 'Simular lectura del QR seleccionado', () => {
    selectorQR.value = selector.value;
    actualizarSimulacion();
    iniciarSimulacion();
  });
  agregarBoton(panel, 'Volver al mapa', () => show('mapa'));
}

const lectorCamara = crearLectorCamara({
  video: $('qrCamera'),
  alCambiarEstado: (activo) => {
    $('stopCamera').hidden = !activo;
    $('startCamera').hidden = activo;
  },
  alInformar: (mensaje) => {
    $('cameraMessage').textContent = mensaje;
    $('cameraMessage').classList.remove('qrNotice');
  },
  esCodigoValido: (codigo) => Boolean(buscarPuntoPorCodigo(codigo)),
  alLeer: (valor) => registrarCodigo(valor, 'camara')
});

/* Los controles se conectan por pantalla para facilitar su mantenimiento. */
function enlazarAccesosPrincipales() {
  $('homeExplore').addEventListener('click', () => show('mapa'));
  $('homeInfo').addEventListener('click', () => show('informacion'));
  $('homeReset').addEventListener('click', () => show('reinicio'));
  $('listReset').addEventListener('click', () => show('reinicio'));
  $('mapScanButton').addEventListener('click', () => show('qr'));
  $('mapSearchButton').addEventListener('click', () => {
    show('lista');
    $('animalSearch').focus();
  });
  $('animalSearch').addEventListener('input', (evento) => filtrarAnimales(evento.target.value));
  $('qrBack').addEventListener('click', () => show('mapa'));
  $('listBack').addEventListener('click', () => show('mapa'));
  $('serviceBack').addEventListener('click', () => show('mapa'));
  $('visitMap').addEventListener('click', () => show('mapa'));
  $('visitRoute').addEventListener('click', () => show('lista'));
}

function enlazarControlesQR() {
  $('qrValidate').addEventListener('click', () => registrarCodigo($('qrCodeInput').value));
  $('qrSimulate').addEventListener('click', iniciarSimulacion);
  $('startCamera').addEventListener('click', () => {
    limpiarAvisosQR();
    lectorCamara.iniciar();
  });
  $('stopCamera').addEventListener('click', () => lectorCamara.detener());
  selectorQR.addEventListener('change', () => {
    limpiarAvisosQR();
    cancelarSimulacion();
    actualizarSimulacion();
  });
  llenarSelectorQR(selectorQR);
}

function enlazarBarrasYFiltros() {
  document.querySelectorAll('.screenNav button').forEach((boton) => boton.addEventListener('click', () => show(boton.dataset.go)));
  document.querySelectorAll('.mapNav span').forEach((boton, indice) => boton.addEventListener('click', () => show(['mapa', 'lista', 'informacion'][indice])));
  document.querySelectorAll('#mapFilters span').forEach((boton, indice) => {
    const activar = () => show(['lista', 'servicios', 'recorrido'][indice]);
    boton.addEventListener('click', activar);
    boton.addEventListener('keydown', (evento) => {
      if (evento.key === 'Enter' || evento.key === ' ') {
        evento.preventDefault();
        activar();
      }
    });
  });
}

function enlazarControlesMapa() {
  $('mapZoomIn').addEventListener('click', () => cambiarZoom(1.35));
  $('mapZoomOut').addEventListener('click', () => cambiarZoom(1 / 1.35));
  mapa.addEventListener('pointerdown', iniciarGesto);
  mapa.addEventListener('pointermove', moverGesto);
  mapa.addEventListener('pointerup', finalizarGesto);
  mapa.addEventListener('pointercancel', finalizarGesto);
  mapa.addEventListener('wheel', (evento) => {
    evento.preventDefault();
    cambiarZoom(evento.deltaY < 0 ? 1.15 : 1 / 1.15);
  }, { passive: false });
  mapa.addEventListener('dblclick', (evento) => {
    evento.preventDefault();
    cambiarZoom(1.35);
  });
  new ResizeObserver(dibujarMapa).observe(mapa.parentElement);
}

function enlazarControles() {
  enlazarAccesosPrincipales();
  enlazarControlesQR();
  enlazarBarrasYFiltros();
  enlazarControlesMapa();
  prepararServicios();
}

enlazarControles();
show('inicio');
