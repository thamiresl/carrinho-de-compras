const ol = document.querySelector('.cart__items');

function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
}

function saveLocalStorage() {
  const olList = document.querySelector('.cart__items').innerHTML;
  saveCartItems(olList);
}

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

function cartItemClickListener(event) {
  event.target.remove(); 
  saveLocalStorage();     
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

async function addItemList() {
  const addItem = await fetchProducts('computador');
  addItem.results.forEach((element) => {
    const obj = {
      sku: element.id,
      name: element.title,
      image: element.thumbnail,
    };
    const section = document.querySelector('.items');
    section.appendChild(createProductItemElement(obj));
  });
}

function eventButtons() {
  const items = document.querySelectorAll('.item');
    items.forEach((item) => {
      const sku = getSkuFromProductItem(item);
      const button = item.querySelector('button');
      button.addEventListener('click', async () => {
        const objeto = await fetchItem(sku);
        const createObj = {
          sku: objeto.id,
          name: objeto.title,
          salePrice: objeto.price,
        };
        ol.appendChild(createCartItemElement(createObj));
        saveLocalStorage();
      });
    });
}

function getLocalStorage() {
  const saved = getSavedCartItems();

  if (saved) {
    ol.innerHTML = saved;
    document.querySelectorAll('.cart__item').forEach((li) => {
      li.addEventListener('click', cartItemClickListener);
    });
  }
}

function removeItems() {
  ol.innerHTML = '';
  saveLocalStorage();
}
const buttonRemove = document.querySelector('.empty-cart');
buttonRemove.addEventListener('click', removeItems);

window.onload = async () => {
  await addItemList();
  eventButtons();
  getLocalStorage();
};

// Function eventButtons com ajuda do Roberval Filho (monitoria summer)
