// fileReader.js
import { readFile } from "fs/promises";
import path from "path";

/**
 * Lee y valida un archivo JSON de encuestas.
 * @param {string} rutaArchivo - Ruta del archivo JSON.
 * @returns {Promise<Encuesta[]>} Una promesa que resuelve con el array de encuestas.
 */
export async function leerJsonEncuesta(rutaArchivo) {
  validarExtension(rutaArchivo);
  const contenidoArchivo = await readFile(rutaArchivo, "utf-8");
  let datos;
  try {
    datos = JSON.parse(contenidoArchivo);
  } catch (error) {
    throw new Error(
      "Error de archivo: El archivo JSON no tiene un formato correcto"
    );
  }
  validarEsArray(datos);
  validarObjetosArray(datos);
  validarCamposRequeridos(datos);
  validarRespuestaEsObjeto(datos);
  validarCampoRespuesta(datos);
  return datos;
}

/**
 * Valida que la extensión del archivo sea .json.
 * @param {string} rutaArchivo - Ruta del archivo a validar.
 * @throws {Error} Si la extensión no es .json.
 */
function validarExtension(rutaArchivo) {
  if (path.extname(rutaArchivo).toLowerCase() !== ".json") {
    throw new Error("Error de archivo: El archivo no tiene extensión .json");
  }
}

/**
 * Valida que los datos sean un array.
 * @param {any} datos - Datos leídos del archivo JSON.
 * @throws {Error} Si los datos no son un array.
 */
function validarEsArray(datos) {
  if (!Array.isArray(datos)) {
    throw new Error("Error de contenido: Se esperaba un array JSON [] en la raíz.");
  }
}

/**
 * Valida que cada objeto en el array tenga los campos requeridos: "nombre", "edad" y "respuestas".
 * @param {Object[]} datos - Array de objetos a validar.
 * @throws {Error} Si algún objeto no tiene todos los campos requeridos.
 */
function validarCamposRequeridos(datos) {
  const camposRequeridos = ["nombre", "edad", "respuestas"];

  const invalidos = datos.filter((encuesta) =>
    camposRequeridos.some((campo) => !Object.hasOwn(encuesta, campo))
  );

  if (invalidos.length > 0) {
    throw new Error("Error de contenido: Hay encuestas con campos faltantes");
  }
}

/**
 * Valida que todos los elementos del array sean objetos literales.
 * @param {any[]} datos - Array de datos a validar.
 * @throws {Error} Si algún elemento no es un objeto literal.
 */
function validarObjetosArray(datos) {
  datos.forEach((objeto, index) => {
    if (
      typeof objeto !== "object" ||
      objeto === null ||
      Array.isArray(objeto)
    ) {
      throw new Error(`Error de contenido: El elemento en el índice ${index} no es un objeto literal.`);
    }
  });
}

/**
 * Valida que cada objeto en el array tenga los campos requeridos: "nombre", "edad" y "respuestas".
 * @param {Object[]} datos - Array de objetos a validar.
 * @throws {Error} Si algún objeto no tiene todos los campos requeridos.
 */
function validarCampoRespuesta(datos) {
  const clavesEsperadas = ["p1", "p2", "p3"];

  datos.forEach((persona, index) => {
    clavesEsperadas.forEach((clave) => {
      if (!(clave in persona.respuestas)) {
        throw new Error(`Error de contenido: Falta la clave ${clave} en 'respuestas' del indice (${index})`);
      }
    });
  });
}

/**
 * Valida que el campo "respuestas" de cada objeto sea un objeto literal.
 * @param {Object[]} datos - Array de objetos a validar.
 * @throws {Error} Si el campo "respuestas" no es un objeto literal en algún objeto.
 */
function validarRespuestaEsObjeto(datos) {
  datos.forEach((encuesta, index) => {
    if (!esObjetoLiteral(encuesta)) {
      throw new Error(`Error de contenido: En el indice (${index}) el campo respuestas no es un objeto literal`);
    }
  });
}


/**
 * Verifica si un valor es un objeto literal.
 * @param {Object} encuesta - Objeto que contiene el campo "respuestas".
 * @returns {boolean} True si "respuestas" es un objeto literal, false en caso contrario.
 */
function esObjetoLiteral(encuesta) {
  return (
    typeof encuesta.respuestas === "object" &&
    encuesta.respuestas !== null &&
    !Array.isArray(encuesta.respuestas)
  );
}