const { turnOrKeepPath, getFileExtension, readFile } = require('../miniFunctions');
const mdLinks = require('../index');
const path = require('path');
const fs = require('fs');
const axios = require('axios');

// TEST PARA TRANFORMAR UNA RUTA
describe('turnOrKeepPath', () => {
  it('Should convert relative paths to absolute paths', () => {
    const currentPath = 'Pruebas/pruebadecontenido.md';
    const expectedPath = 'C:/Users/Samsung/Desktop/Laboratoria/CuartoProyecto/DEV006-md-links/Pruebas/pruebadecontenido.md';

    const result = turnOrKeepPath(currentPath);

    expect(result).toBe(expectedPath);
  });
});

// TEST PARA OBTENER LA EXTENSION DEL ARCHIVO
describe('getFileExtension', () => {
  it('Should return the file extension', () => {
    const filePath = 'Pruebas/README copy 2.md';
    const expectedExtension = '.md';

    const result = getFileExtension(filePath);

    expect(result).toBe(expectedExtension);
  });
});

// TEST PARA LEER UN ARCHIVO
describe('readFile', () => {
  it('Should return the content of the file', (done) => {
    const absPath = 'Pruebas/pruebadecontenido.md';
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

// TEST PARA MDLINKS
describe('mdLinks', () => {
  it('Should be a function', () => {
    expect(typeof mdLinks).toEqual('function');
  });

  it('Should return an error when path does not exist', () => {
    const brokenPath = 'Pruebas/README1broken.md';
    return expect(mdLinks(brokenPath)).rejects.toEqual("Error: La ruta no existe");
  });

  it('Should resolve with validated links when options.validate is true', (done) => {
    const route = 'Pruebas/READMEunLink.md';
    const options = { validate: true };
  
    // Mock axios
    jest.mock('axios', () => ({
      get: jest.fn((href) => {
        if (href === 'https://es.wikipedia.org/wiki/Markdown') {
          return Promise.resolve({ status: 200 });
        }
      })
    }));
  
    const resultingArray = [
      {
        href: 'https://es.wikipedia.org/wiki/Markdown',
        text: 'Markdown',
        file: 'C:/Users/Samsung/Desktop/Laboratoria/CuartoProyecto/DEV006-md-links/Pruebas/READMEunLink.md',
        status: 200,
        ok: 'ok'
      }
    ];
  
    mdLinks(route, options)
      .then((result) => {
        expect(result).toEqual(resultingArray);
        done();
      })
      .catch((error) => {
        done(error);
      });
  });
  
  it('Should return an empty array when there are no links', (done) => {
    const noLinksPath = 'Pruebas/READMEnolinks.md';
    mdLinks(noLinksPath)
      .then((result) => {
        expect(result).toEqual([]);
        done();
      })
      .catch((error) => {
        done(error);
      });
  });
  
  it('Should return an error when the file is not .md', () => {
    const notMdFile = 'Pruebas/Test1.html';
    return expect(mdLinks(notMdFile)).rejects.toEqual("Error: Tu archivo no es Markdown");
  });
});
