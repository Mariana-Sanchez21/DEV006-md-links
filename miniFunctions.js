const path = require('path');
const fs = require('fs');

//FUNCION: ES LA RUTA ABSOLUTA?
function isAbsolutePath(filePath) {
    const currentPath = path.isAbsolute(filePath);
    return currentPath;
}

//FUNCION: TRANSFORMAR LA RUTA A ABSOLUTA O DEJARLA IGUAL
function turnOrKeepPath(currentPath) {
    let absolutePath = '';

    if (path.isAbsolute(currentPath)) {
        console.log('This path is absolute');
        absolutePath = currentPath.replace(/\\/g, '/');
    } else {
        console.log('This path is relative');
        absolutePath = path.resolve(__dirname, currentPath).replace(/\\/g, '/');
    }

    return absolutePath;
}

//FUNCION:  LA RUTA EXISTE?
function pathExists(absolutePath) {
    return fs.existsSync(absolutePath);
}

//FUNCION:  ES UN DIRECTORIO O ES UN ARCHIVO?
function fileOrDirectory(path) {
    return fs.statSync(path).isFile();
}

//FUNCION OBTENER LA EXTENSION DEL ARCHIVO
function getFileExtension(existingPath) {
    const extension = path.extname(existingPath);
    console.log('This is the extension:', extension);
    return extension;
}

//FUNCION LEER EL ARCHIVO
function readFile(filePath) {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf-8', (error, fileContent) => {
            if (error) {
                reject(error);
            } else {
                resolve(fileContent);
            }
        });
    });
}



readFile('C:/Users/Samsung/Desktop/Laboratoria/CuartoProyecto/DEV006-md-links/Dir1/README copy 5.md')
    .then((content) => {
        console.log('File content:', content);
    })
    .catch((error) => {
        console.error('Error:', error);
    });

//FUNCION EXTRAER LOS LINKS

// function extractLinksFromFile(filePath) {
//     const fileContent= "(https://es.wikipedia.org/wiki/Markdown) "
//     const regex = /<a\s+(?:[^>]*?\s+)?href=(["'])(.*?)\1/g;
//     const links = [];
//     let match;
  
//     while ((match = regex.exec(fileContent)) !== null) {
//         const text = match[2];
//         const URL = match[2];
//         links.push({ href: URL, text: text, file: filePath });
//     }
  
//     return links;
// }

// extractLinksFromFile(fileContent, filePath)
//     .then((links) => {
//         console.log('Links:', links);
//     });



module.exports = {
    isAbsolutePath,
    turnOrKeepPath,
}


