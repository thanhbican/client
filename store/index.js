export const state = () => ({
  //State
  cart: [],
  cartLength: 0,
  sale: 0
});

export const actions = {
  addProductToCart({ state, commit }, product) {
    const cartProduct = state.cart.find(prod => prod._id === product._id);
    if (!cartProduct) {
      commit("pushProductToCart", product);
    } else {
      commit("incrementProductQty", cartProduct);
    }

    commit("incrementCardLength");
  }
};

export const mutations = {
  pushProductToCart(state, product) {
    product.quantity = 1;
    state.cart.push(product);
  },
  incrementProductQty(state, product) {
    product.quantity++;
    let indexOfProduct = state.cart.indexOf(product);
    state.cart.splice(indexOfProduct, 1, product);
  },
  incrementCardLength(state) {
    state.cartLength = 0;
    if (state.cart.length > 0) {
      state.cart.map(product => {
        state.cartLength += product.quantity;
      });
    }
  },

  changeQuantity(state, { product, quantity }) {
    let cartProduct = state.cart.find(prod => prod._id === product._id);
    cartProduct.quantity = quantity;

    state.cartLength = 0;
    if (state.cart.length > 0) {
      state.cart.map(product => {
        state.cartLength += product.quantity;
      });
    }
    let indexOfProduct = state.cart.indexOf(product);
    state.cart.splice(indexOfProduct, 1, product);
  },

  removeProduct(state, product) {
    state.cartLength -= product.quantity;
    let indexOfProduct = state.cart.indexOf(product);
    state.cart.splice(indexOfProduct, 1);
  },
  changeTotalSave(state, sale) {
    state.sale = sale;
  },
  resetState(state) {
    (state.cart = []), (state.cartLength = 0), (state.sale = 0);
  }
};

export const getters = {
  getCartLength(state) {
    return state.cartLength;
  },
  getCart(state) {
    return state.cart;
  },
  getTotal(state) {
    let total = 0;
    state.cart.map(prod => (total += prod.quantity * prod.price));
    return total;
  },
  getTotalSave(state) {
    let total = 0;
    state.cart.map(prod => (total += prod.quantity * prod.price));
    return total * (1 - state.sale);
  },
  getSale(state) {
    return state.sale;
  }
};
