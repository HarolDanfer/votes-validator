// main.js
import { leerJsonEncuesta } from "./fileReader.js";
import { validarDatosEncuesta } from "./validation.js";
import { calcularEdadPromedio, calcularRespuestas, calcularPorcentaje } from "./stats.js";
import { formatearResultados } from "./formatter.js";
import fs from "fs";

/**
 * Procesa las encuestas desde un archivo JSON y genera un archivo de resultados.
 * @param {string} rutaArchivo - Ruta del archivo JSON con los datos de las encuestas.
 */
async function procesarEncuestas(rutaArchivo) {
  try {
    let datos = await leerJsonEncuesta(rutaArchivo);
    const encuestasValidas = validarDatosEncuesta(datos);
    let edadPromedio = calcularEdadPromedio(encuestasValidas);
    let conteoRespuestas = calcularRespuestas(encuestasValidas);
    let respuestasPorcentaje = calcularPorcentaje(conteoRespuestas, encuestasValidas.length);
    const resumen = formatearResultados(datos, encuestasValidas, edadPromedio, respuestasPorcentaje)
    await fs.promises.writeFile(
        "output/resultados.json",
        JSON.stringify(resumen, null, 2),
        "utf-8"
      );
    console.log("Archivo guardado con éxito.")
  } catch (error) {
    console.error(error.message);
  }
}

procesarEncuestas("data/datos.json");
