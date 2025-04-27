# Simulador de Encuestas con Resultados Dinámicos

## Descripción
Título del proyecto: "Simulador de Encuestas con Resultados Dinámicos" En el mundo real, las empresas, ONGs y medios digitales usan encuestas para recopilar opiniones y tomar decisiones. Muchas veces los datos se almacenan en archivos .txt o .json, y deben ser procesados para obtener estadísticas útiles. Este proyecto consiste en construir un sistema capaz de leer, validar y analizar resultados de encuestas, generando un resumen de respuestas por pregunta

## Cómo probar el proyecto
- Clonar el repositorio:
   ```bash
   git clone git@github.com:HarolDanfer/votes-validator.git
- Asegurarse que dentro del proyecto exista el archivo `data/datos.json`

- Para probar el proyecto ejecutar:

    ```
    node src/main.js
    ```
- El programa indicara con el exito el fin de la ejecución con la siguiente salida:
    ```
    Archivo guardado con éxito.
    ```
- El proyecto generara un archivo de salida con el nombre y ruta `output/resultados.json` , en caso ya tengas el archivo, se sobrescribirá. 