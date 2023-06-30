const { turnOrKeepPath, getFileExtension, readFile } = require('../miniFunctions');
const mdLinks = require('../index');
const path = require('path');
const fs = require('fs');
const axios = require('axios');

// TEST PARA TRANFORMAR UNA RUTA
describe('turnOrKeepPath', () => {
  it('Should convert relative paths to absolute paths', () => {
    const currentPath = 'Dir1/README copy 2.md';
    const expectedPath = 'C:/Users/Samsung/Desktop/Laboratoria/CuartoProyecto/DEV006-md-links/Dir1/README copy 2.md';

    const result = turnOrKeepPath(currentPath);

    expect(result).toBe(expectedPath);
  });
});

// TEST PARA OBTENER LA EXTENSION DEL ARCHIVO
describe('getFileExtension', () => {
  it('Should return the file extension', () => {
    const filePath = 'Dir1/README copy 2.md';
    const expectedExtension = '.md';

    const result = getFileExtension(filePath);

    expect(result).toBe(expectedExtension);
  });
});

// TEST PARA LEER UN ARCHIVO
describe('readFile', () => {
  it('Should return the content of the file', async () => {
    const absPath = 'Dir1/pruebadecontenido.md';
    const expectedContent = 'Esta es una prueba para leer contenido';

    const content = await readFile(absPath);

    expect(content.trim()).toEqual(expectedContent);
  });
});

// TEST PARA MDLINKS
describe('mdLinks', () => {
  it('Should be a function', () => {
    expect(typeof mdLinks).toEqual('function');
  });

  it('Should return an error when path does not exist', () => {
    const brokenPath = 'Dir1/README1broken.md';
    return expect(mdLinks(brokenPath)).rejects.toEqual("Error: La ruta no existe");
  });

  it('Should resolve with validated links when options.validate is true', async () => {
    const route = 'Dir1/READMEunLink.md';
    const options = { validate: true };

    // Mock axios
    jest.mock('axios', () => ({
      get: jest.fn((href) => {
        if (href === 'https://es.wikipedia.org/wiki/Markdown') {
          return Promise.resolve({ status: 200 });
        }
        // Add an else condition to return a rejected promise if the href doesn't match any expected URL
        return Promise.reject(new Error('Not Found'));
      })
    }));

    const resultingArray = [
      {
        href: 'https://es.wikipedia.org/wiki/Markdown',
        text: 'Markdown',
        file: 'C:/Users/Samsung/Desktop/Laboratoria/CuartoProyecto/DEV006-md-links/Dir1/READMEunLink.md',
        status: 200,
        ok: 'ok'
      }
    ];

    const result = await mdLinks(route, options);

    expect(result).toEqual(resultingArray);
  });

  it('Should return an empty array when there are no links', async () => {
    const noLinksPath = 'Dir1/READMEnolinks.md';
    const result = await mdLinks(noLinksPath);

    expect(result).toEqual([]);
  });

  it('Should return an error when the file is not .md', () => {
    const notMdFile = 'Dir1/Test1.html';
    return expect(mdLinks(notMdFile)).rejects.toEqual("Error: Tu archivo no es Markdown");
  });
});
