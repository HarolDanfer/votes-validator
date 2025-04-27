// validation.js
/**
 * Valida los datos de las encuestas y filtra las encuestas válidas.
 * @param {Encuesta[]} datos - Array de encuestas a validar.
 * @returns {Encuesta[]} Array de encuestas válidas.
 */
export function validarDatosEncuesta(datos) {
  const datosValidos = datos.filter(
    (persona) =>
      esEdadValida(persona.edad) &&
      esRespuestaValida(persona.respuestas) &&
      esNombreValido(persona.nombre)
  );
  return datosValidos;
}

/**
 * Verifica si la edad es válida.
 * @param {number} edad - Edad del participante.
 * @returns {boolean} True si la edad es válida, false en caso contrario.
 */
function esEdadValida(edad) {
  return typeof edad === "number" && Number.isInteger(edad) && edad > 0;
}

/**
 * Verifica si las respuestas son válidas.
 * @param {Object.<string, string>} respuestas - Objeto con las respuestas.
 * @returns {boolean} True si las respuestas son válidas, false en caso contrario.
 */
function esRespuestaValida(respuestas) {
  return Object.values(respuestas).every(
    (r) => r !== "" && typeof r === "string"
  );
}

/**
 * Verifica si el nombre es válido.
 * @param {string} nombre - Nombre del participante.
 * @returns {boolean} True si el nombre es válido, false en caso contrario.
 */
function esNombreValido(nombre) {
  return typeof nombre === "string" && /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/.test(nombre);
}
