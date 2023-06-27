const { turnOrKeepPath,
  getFileExtension,
  readFile,
 } = require('../miniFunctions');
const path = require('path');

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

//TEST PARA LEER EL ARCHIVO
