// formatter.js
/**
 * @typedef {Object} ResumenEncuestas
 * @property {number} total de participantes - Total de encuestas procesadas.
 * @property {number} Participantes válidos - Número de encuestas válidas.
 * @property {number} Participantes inválidos - Número de encuestas inválidas.
 * @property {number} Promedio de edad - Edad promedio de los participantes válidos.
 * @property {Object.<string, Object.<string, string>>} Resultados por pregunta - Porcentajes de respuestas por pregunta.
 */

/**
 * Formatea los resultados de las encuestas en un objeto legible.
 * @param {Encuesta[]} datos - Array de todas las encuestas.
 * @param {Encuesta[]} encuestasValidas - Array de encuestas válidas.
 * @param {number} edadPromedio - Edad promedio de los participantes válidos.
 * @param {Object.<string, Object.<string, string>>} respuestasPorcentaje - Porcentajes de respuestas por pregunta.
 * @returns {ResumenEncuestas} Un objeto con el resumen de los resultados.
 */
export function formatearResultados(datos, encuestasValidas, edadPromedio, respuestasPorcentaje) {
    return {
          "total de participantes": datos.length,
          "Participantes válidos": encuestasValidas.length,
          "Participantes inválidos": datos.length - encuestasValidas.length,
          "Promedio de edad": edadPromedio,
          "Resultados por pregunta": respuestasPorcentaje,
        }
}