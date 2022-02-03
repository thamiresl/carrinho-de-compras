require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fecthProducts', () => {
  it ('Verificar ser fetchProducts é uma fução', () => {
    expect(typeof fetchProducts).toBe('function');
  });

  it ('Espera receber a função fetch', async () => {
      expect.assertions(1);

      const compFetch = await fetchProducts('computador');
      expect(fetch).toBeCalled(); 
  });

  it ('Verificar retorno do endpoint', async () => {
      expect.assertions(1);

      const url = 'https://api.mercadolibre.com/sites/MLB/search?q=computador';
      const endpointFecth = await fetchProducts('computador');
      expect(fetch).toBeCalledWith(url); 
  });

  it ('Verificar se o retorno da função fetchProducts com o argumento "computador" é igual ao objeto "computadorSearch"', async () => {
    const variavel = await fetchProducts('computador');
    expect(variavel).toEqual(computadorSearch);
  });

  it('Verificar se ao chamar a função fetchProducts sem argumento, retorna uma mensagem de erro', async () => {
    try {
      await fetchProducts();
    } catch (error) {
      expect(error).toEqual(new Error('You must provide an url'));
    }
  });

});
