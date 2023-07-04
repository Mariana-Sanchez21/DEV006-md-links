const path = require('path');
const fs = require('fs');
const axios = require('axios');

const initialRoute ='Pruebas/READMEbroken.md';

// Función: ¿Es una ruta absoluta?
function isAbsolutePath(route) {
  const currentPath = path.isAbsolute(route);
  return currentPath;
}

// Función: Transformar la ruta a absoluta o dejarla igual
function turnOrKeepPath(currentPath) {
  let absolutePath = '';

  if (path.isAbsolute(currentPath)) {
    absolutePath = currentPath.replace(/\\/g, '/');
  } else {
    absolutePath = path.resolve(__dirname, currentPath).replace(/\\/g, '/');
  }

  return absolutePath;
}

const absPath = turnOrKeepPath(initialRoute);


// Función: ¿La ruta existe?
function pathExists(absPath) {
  return fs.existsSync(absPath);
}



// Función: ¿Es un archivo?
function isFile(absPath) {
  return fs.statSync(absPath).isFile();
}

// Función: Obtener la extensión del archivo
function getFileExtension(absPath) {
  const extension = path.extname(absPath);
  return extension;
}

const fileExt = getFileExtension(absPath);


// Función: Leer el archivo
function readFile(absPath) {
  return new Promise((resolve, reject) => {
    fs.readFile(absPath, 'utf-8', (error, fileContent) => {
      if (error) {
        reject(error);
      } else {
        resolve(fileContent);
      }
    });
  });
}

// Función: Extraer los links
function extractLinksFromFile(content, filePath) {
  const regex = /\[([^\]]+)\]\((http[s]?:\/\/[^\)]+)\)/g;
  const links = [];
  let match;

  while ((match = regex.exec(content)) !== null) {
    const text = match[1];
    const URL = match[2];
    links.push({ href: URL, text: text, file: filePath });
  
  }

  return links;
}




readFile(absPath)
  .then((content) => {
    const links = extractLinksFromFile(content, absPath);
    return validateLinks(links);
  })
  .then((validatedLinks) => {
  })
  .catch((error) => {
    console.error('Error:', error);
  });

// Función: Validar links
function validateLinks(links) {
  const promises = links.map((link) => {
    return axios
      .get(link.href)
      .then((response) => {
        if (response.status >= 200 && response.status < 300) {
          return {
            href: link.href,
            text: link.text,
            file: link.file,
            status: response.status,
            ok: 'ok',
          };
        } else {
          return {
            href: link.href,
            text: link.text,
            file: link.file,
            status: response.status,
            ok: 'fail',
          };
        }
      })
      .catch((error) => {
        return {
          href: link.href,
          text: link.text,
          file: link.file,
          status: error.response.status,
          ok: 'fail',
        };
      });
  });

  return Promise.all(promises); 
}



module.exports = {
    isAbsolutePath,
    turnOrKeepPath,
    pathExists,
    isFile,
    getFileExtension,
    readFile,
    extractLinksFromFile,
    validateLinks,
}


