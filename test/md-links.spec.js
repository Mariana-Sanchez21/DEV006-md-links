const { turnOrKeepPath,
  getFileExtension,
  readFile,
 } = require('../miniFunctions');
 const mdLinks= require ('../index')
const path = require('path');
const fs= require ('fs')
const axios= require('axios')

// jest.mock('axios'), ()=>({
//   get: (href)=>promiseHooks.resolve({status:400})
// });

//TEST PARA TRANFORMAR UNA RUTA
describe('turnOrKeepPath', () => {
  it('Should convert relative paths to absolute paths', () => {
    const currentPath = 'Dir1/README copy 2.md';
    const expectedPath = 'C:/Users/Samsung/Desktop/Laboratoria/CuartoProyecto/DEV006-md-links/Dir1/README copy 2.md';

    const result = turnOrKeepPath(currentPath);

    expect(result).toBe(expectedPath);
  });
});

//TEST PARA OBTENER LA EXTENSION DEL ARCHIVO
describe('getFileExtension', () => {
  it('Should return the file extension', () => {
    const filePath = 'Dir1/README copy 2.md';
    const expectedExtension = '.md';

    const result = getFileExtension(filePath);

    expect(result).toBe(expectedExtension);
  });
});

//TEST PARA LEER UN ARCHIVO
describe('readFile', () => {
  it('should return the content of the file', (done) => {
    const absPath = 'Dir1/pruebadecontenido.md';
    const expectedContent = 'Esta es una prueba para leer contenido';
    

    readFile(absPath)
      .then((content) => {
       
        expect(content.trim()).toEqual(expectedContent);
        done();
      })
      .catch((error) => {
        done(error);
      });
  });
});


//TEST PARA MDLINKS


describe('mdLinks', () => {
  it('Should be a function', () => {
    expect(typeof mdLinks).toEqual('function');
  });
});

it('should return an error when path does not exist', () => {
  const brokenPath = 'Dir1/README1broken.md';
  return expect(mdLinks(brokenPath)).rejects.toEqual("Error: La ruta no existe");
});


it('should resolve with validated links when options.validate is true', () => {
    const route = 'Dir1/READMEbroken.md';
    const options = { validate: true };
    const resultingArray=

[
  {
    href: 'https://curriculum.laboratoria.la/es/topics/javascript/04-arrays',
    text: 'Arreglos',
    file: 'C:/Users/Samsung/Desktop/Laboratoria/CuartoProyecto/DEV006-md-links/Dir1/READMEbroken.md',
    status: 200,
    ok: 'ok'
  },
  {
    href: 'https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/',
    text: 'Array - MDN',
    file: 'C:/Users/Samsung/Desktop/Laboratoria/CuartoProyecto/DEV006-md-links/Dir1/READMEbroken.md',
    status: 200,
    ok: 'ok'
  },
  {
    href: 'https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Globakl_Objects/Array/sort',
    text: 'Array.prototype.sort() - MDN',
    file: 'C:/Users/Samsung/Desktop/Laboratoria/CuartoProyecto/DEV006-md-links/Dir1/READMEbroken.md',
    status: 404,
    ok: 'fail'
  },
  {
    href: 'https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach',
    text: 'Array.prototype.forEach() - MDN',
    file: 'C:/Users/Samsung/Desktop/Laboratoria/CuartoProyecto/DEV006-md-links/Dir1/READMEbroken.md',
    status: 200,
    ok: 'ok'
  },
  {
    href: 'https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/map',
    text: 'Array.prototype.map() - MDN',
    file: 'C:/Users/Samsung/Desktop/Laboratoria/CuartoProyecto/DEV006-md-links/Dir1/READMEbroken.md',
    status: 200,
    ok: 'ok'
  },
  {
    href: 'https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/filter',
    text: 'Array.prototype.filter() - MDN',
    file: 'C:/Users/Samsung/Desktop/Laboratoria/CuartoProyecto/DEV006-md-links/Dir1/READMEbroken.md',
    status: 200,
    ok: 'ok'
  },
  {
    href: 'https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/jArray/Reduce',
    text: 'Array.prototype.reduce() - MDN',
    file: 'C:/Users/Samsung/Desktop/Laboratoria/CuartoProyecto/DEV006-md-links/Dir1/READMEbroken.md',
    status: 404,
    ok: 'fail'
  }
]

    return expect(mdLinks(route, options)).resolves.toEqual(resultingArray);
      
    });

    it('Should return empty array when there are no links', () => {
      const noLinksPath = 'Dir1/READMEnolinks.md';
      return expect(mdLinks(noLinksPath)).resolves.toEqual([]);
    });

    it('Should return an error when the file is not .md', () => {
      const notMdFile = 'Dir1/Test1.html';
      return expect(mdLinks(notMdFile)).rejects.toEqual("Error: Tu archivo no es Markdown");
    });