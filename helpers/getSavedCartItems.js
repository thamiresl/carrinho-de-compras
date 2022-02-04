const getSavedCartItems = () => {
  const getInfo = localStorage.getItem('cartItems');
  return getInfo;
};

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}

// Ajuda Paula Ribeiro turma 19 - c