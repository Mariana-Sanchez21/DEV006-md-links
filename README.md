# Markdown Links

## Índice

* [1. Descripción](#1-Descripcion)
* [2. Modo de uso](#2-Modo-de-uso)
* [3. Flujograma de trabajo ](#3-Flujograma-de-trabajo)
* [4. Mejoras](#4-Mejoras)

***

## 1. Descripción

El formato Markdown es una sintaxis ligera y sencilla de usar para formatear texto en plataformas como sitios web, foros, blogs y más. Es muy común encontrar varios archivos en ese formato en cualquier tipo de repositorio (empezando por el tradicional `README.md`).

Este proyecto es una libreria en npm en la cual se puede leer el estado de los links que un archivo de Markdown contenga. Esto con el objetivo de obtener informacion del link como la URL, el texto asignado, y la ruta de este. Tambien se pueden validar los links y saber el estado de respuesta del servidor y tambien si el link esta ok(funciona) o fail(no funciona). A continuacion, un ejemplo de los resultados

No validados
![sinvalidar](https://github.com/Mariana-Sanchez21/DEV006-md-links/assets/116685936/97503d48-c7aa-45c1-87fb-34a2f3696b57)

Validados
![validado](https://github.com/Mariana-Sanchez21/DEV006-md-links/assets/116685936/bb30017d-dd17-4c08-a656-57807134648e)

## 2. Modo de uso

La libreria se puede instalar via

`npm i @marianasanchez/md-links`

El proyecto se basa en la funcion mdLinks ubicada en el archivo index.js. A continuacion se debe remplazar el 'process.argv[2]' por la ruta del archivo .md y cambiar el argumento de validacion dependiendo de si se desea saber el estado o no, usando true o false.

![modo de uso](https://github.com/Mariana-Sanchez21/DEV006-md-links/assets/116685936/43ae39bf-a050-4a1d-ac6f-90fd8c260b21)



**mdLinks(path, options)**

Argumentos
path: Ruta absoluta o relativa al archivo. Si la ruta pasada es relativa, se resolvera como relativa automaticamente.
options: Un objeto con únicamente la siguiente propiedad:
validate: Booleano que determina si se desea validar los links encontrados.

Con validate:false :

href: URL encontrada.
text: Texto de la URL.
file: Ruta del archivo donde se encontró el link.
Con validate:true :

href: URL encontrada.
text: Texto de la URL.
file: Ruta del archivo donde se encontró el link.
status: Código de respuesta HTTP.
ok: Mensaje fail en caso de fallo u ok en caso de éxito.



## 3. Flujograma de trabajo

Se realizo el siguiente flujograma para entender la ruta de trabajo para el desarrollo del proyecto.

[Flujograma](https://miro.com/app/board/uXjVM_biNG0=/?share_link_id=247400022019)

## 4. Mejoras

Actualmente el proyecto no tiene soporte de lectura de directorios, a futuro se planea implementar esta caracteristica.
