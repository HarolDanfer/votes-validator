// stats.js
/**
 * @typedef {Object} Encuesta
 * @property {string} nombre - El nombre del participante.
 * @property {number} edad - La edad del participante.
 * @property {Object.<string, string>} respuestas - Las respuestas a las preguntas, donde la clave es la pregunta (e.g., "p1") y el valor es la respuesta.
 */

/**
 * Calcula la edad promedio de los participantes en las encuestas válidas.
 * @param {Encuesta[]} datos - Array de encuestas válidas.
 * @returns {number} La edad promedio.
 */
export function calcularEdadPromedio(datos) {
  let edadPromedio =
    datos.reduce((promedio, encuesta) => promedio + encuesta.edad, 0) /
    datos.length;
  return edadPromedio;
}

/**
 * Calcula el conteo de respuestas por cada pregunta.
 * @param {Encuesta[]} datos - Array de encuestas válidas.
 * @returns {Object.<string, Object.<string, number>>} Un objeto con el conteo de cada respuesta por pregunta.
 */
export function calcularRespuestas(datos) {
  return datos.reduce((acumulador, { respuestas }) => {
    for (const [pregunta, respuesta] of Object.entries(respuestas)) {
      acumulador[pregunta] = acumulador[pregunta] || {};
      acumulador[pregunta][respuesta] =
        (acumulador[pregunta][respuesta] || 0) + 1;
    }
    return acumulador;
  }, {});
}

/**
 * Calcula el porcentaje de cada respuesta por pregunta.
 * @param {Object.<string, Object.<string, number>>} conteoRespuestas - Conteo de respuestas por pregunta.
 * @param {number} totalValidos - Número total de encuestas válidas.
 * @returns {Object.<string, Object.<string, string>>} Un objeto con los porcentajes de cada respuesta por pregunta.
 */
export function calcularPorcentaje(respuestasContadas, totalValidos) {
  const resultadosPorcentaje = {};
  if (totalValidos === 0) {
    return resultadosPorcentaje;
  }
  for (const [pregunta, respuestasConteo] of Object.entries(
    respuestasContadas
  )) {
    resultadosPorcentaje[pregunta] = {};
    for (const [respuesta, conteo] of Object.entries(respuestasConteo)) {
      const porcentajeNumerico = (conteo / totalValidos) * 100;
      resultadosPorcentaje[pregunta][respuesta] = `${porcentajeNumerico.toFixed(
        0
      )}%`;
    }
  }
  return resultadosPorcentaje;
}
