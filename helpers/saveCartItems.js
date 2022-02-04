const saveCartItems = (list) => {
  const saveInfo = localStorage.setItem('cartItems', list);
  return saveInfo;
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
