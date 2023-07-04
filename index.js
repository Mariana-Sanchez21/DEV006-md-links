const {
  turnOrKeepPath,
  pathExists,
  isFile,
  getFileExtension,
  readFile,
  extractLinksFromFile,
  validateLinks,
} = require('./miniFunctions');


function mdLinks(filePath, options) {
  return new Promise(function (resolve, reject) {
    const absRoute = turnOrKeepPath(filePath);

    if (!pathExists(absRoute)) {
      reject("Error: La ruta no existe");
    } else {
      if (isFile(absRoute)) {
        const isMdExtension = getFileExtension(absRoute);

        if (isMdExtension !== ".md") {
          reject("Error: Tu archivo no es Markdown");
        }
      }

      readFile(absRoute)
        .then((content) => {
          const links = extractLinksFromFile(content, absRoute);
          if (options && options.validate === false) {
            resolve(links);
          } else if (options && options.validate === true) {
            return validateLinks(links)
              .then((validatedLinks) => {
                resolve(validatedLinks);
              });
          } else {
            resolve(links);
          }
        })
        .catch((error) => {
          reject(error);
        });
    }
  });
}


// mdLinks(process.argv[2], { validate: false })
//   .then((result) => {
//     console.log(result);
//   })
//   .catch((error) => {
//     console.error("Error:", error);
//   });



module.exports = mdLinks;
