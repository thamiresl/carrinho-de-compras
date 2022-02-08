const ol = document.querySelector('.cart__items');
let sumTotal = 0;

function takePrice() {
  const cart = document.querySelector('.cart');
  const createParagraph = document.createElement('p');
  const createSpan = document.createElement('span');

  createParagraph.innerHTML = 'Sub-total: <strong>R$ </strong>';
  createSpan.className = 'total-price';
  cart.appendChild(createParagraph);
  createParagraph.appendChild(createSpan);
}

function sum() {
  const totalPrice = document.querySelector('.total-price');
  let textOl = ol.innerText;
  let resultSum = 0;

  textOl = textOl.match(/\$[0-9]*.[0-9]*/g); 

  if (textOl === 0 || textOl === null) {
    totalPrice.innerText = 0;
  } else {
    textOl.forEach((price) => {
      resultSum += +price.slice(1);
    });
    sumTotal = resultSum;

    totalPrice.innerText = +sumTotal.toFixed(2);
  }
}

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
  sum();     
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
        sum();
      });
    });
}

function getLocalStorage() {
  const saved = getSavedCartItems();

  if (saved) {
    ol.innerHTML = saved;
    document.querySelectorAll('.cart__item').forEach((li) => {
      li.addEventListener('click', cartItemClickListener);
      sum();
    });
  }
}

function removeItems() {
  ol.innerHTML = '';
  saveLocalStorage();
  sum();
}
const buttonRemove = document.querySelector('.empty-cart');
buttonRemove.addEventListener('click', removeItems);

function loadingText() {
  const sectionText = document.createElement('section');
  sectionText.textContent = 'carregando...';
  sectionText.className = 'loading';
  document.querySelector('.items').appendChild(sectionText);
}

function loadingRemove() {
  document.querySelector('.loading').remove();
}

window.onload = async () => {
  takePrice();
  loadingText();
  await addItemList();
  eventButtons();
  getLocalStorage();
  loadingRemove();
  sum();
};

// Function eventButtons com ajuda do Roberval Filho (monitoria summer)
// Function bolinha com ajuda do Erik Lima - Turma 19 A
