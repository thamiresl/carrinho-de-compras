require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

describe('2 - Teste a função fecthItem', () => {
  it ('Verificar ser fecthItem é uma fução', () => {
    expect(typeof fetchItem).toBe('function');
  });

  it ('Espera receber a função fetch', async () => {
    expect.assertions(1);

    const itemFetch = await fetchItem('MLB1615760527');
    expect(fetch).toBeCalled(); 
  });

  it ('Verificar retorno do endpoint', async () => {
    expect.assertions(1);

    const url = 'https://api.mercadolibre.com/items/MLB1615760527';
    const endpointFecth = await fetchItem('MLB1615760527');
    expect(fetch).toBeCalledWith(url); 
  });

  it ('Verificar se o retorno da função fetchItem com o argumento "MLB1615760527" é igual ao objeto "item"', async () => {
    const variavel = await fetchItem('MLB1615760527');
    expect(variavel).toEqual(item);
  });

  it('Verificar se ao chamar a função fetchItem sem argumento, retorna uma mensagem de erro', async () => {
    try {
      await fetchItem();
    } catch (error) {
      expect(error).toEqual(new Error('You must provide an url'));
    }
  });
});





