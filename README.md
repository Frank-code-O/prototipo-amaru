# Prototipo de visitantes del Bioparque Amaru

Propuesta académica de interfaz móvil. El mapa permite abrir fichas educativas y simular el registro de nueve puntos QR. Dos fichas ofrecen una muestra de lectura en voz alta. El funcionamiento y la ubicación de los puntos son una propuesta académica.

## Archivos principales

- `index.html`: estructura y controles de la interfaz.
- `estilos.css`: presentación de las pantallas.
- `datos.js`: las 24 fichas y los 9 puntos QR independientes, con sus coordenadas y recursos. Cada punto incluye referencias del tramo, sin convertir los animales en códigos QR.
- `funciones.js`: navegación, fichas, mapa, progreso y simulación de lectura.
- `camara.js`: lectura opcional con cámara y `BarcodeDetector`, separada de la simulación.
- Las imágenes, los archivos SVG y `codigos_demostracion/` son necesarios para el funcionamiento y deben conservarse en sus carpetas.

## Reinicio y registro de puntos

En Inicio y Recorrido, «Reiniciar visita» permite borrar el avance tras una confirmación, sin tiempo de espera. Cada QR se registra una sola vez por visita; si se intenta leer otra vez, aparece un aviso y el avance no cambia. Al reiniciar se pueden registrar de nuevo los nueve puntos.
