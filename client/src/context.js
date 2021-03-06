import React, { useState, useEffect } from 'react';

const AppContext = React.createContext();

const AppProvider = (props) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const existingCart = JSON.parse(localStorage.getItem('cart_items'));
    if (existingCart && existingCart.length) {
      setCart(existingCart);
    }
  }, []);

  const addToCart = (item, size, quantity) => {
    const updatedCart = [...cart];
    const index = updatedCart.findIndex(
      (cartItem) => cartItem.product.id === item._id && cartItem.size === size
    );
    if (index > -1) {
      updatedCart[index] = {
        ...updatedCart[index],
        qty: updatedCart[index].qty + quantity,
      };
    } else {
      updatedCart.push({
        product: {
          id: item._id,
          name: item.name,
          price: item.price,
          image: item.images[0],
        },
        size,
        qty: quantity,
      });
    }
    setCart(updatedCart);
    localStorage.setItem('cart_items', JSON.stringify(updatedCart));
  };

  const increment = (item) => {
    const updatedCart = cart.map((cartItem) =>
      cartItem.product.id === item.product.id && cartItem.size === item.size
        ? { ...cartItem, qty: cartItem.qty + 1 }
        : cartItem
    );
    setCart(updatedCart);
    localStorage.setItem('cart_items', JSON.stringify(updatedCart));
  };

  const decrement = (item) => {
    if (
      cart.find(
        (cartItem) =>
          cartItem.product.id === item.product.id &&
          cartItem.size === item.size &&
          cartItem.qty === 1
      )
    ) {
      return remove(item);
    }
    const updatedCart = cart.map((cartItem) =>
      cartItem.product.id === item.product.id && cartItem.size === item.size
        ? { ...cartItem, qty: cartItem.qty - 1 }
        : cartItem
    );
    setCart(updatedCart);
    localStorage.setItem('cart_items', JSON.stringify(updatedCart));
  };

  const remove = (item) => {
    const updatedCart = cart.filter(
      (cartItem) =>
        !(
          cartItem.product.id === item.product.id && cartItem.size === item.size
        )
    );
    setCart(updatedCart);
    if (updatedCart.length) {
      localStorage.setItem('cart_items', JSON.stringify(updatedCart));
    } else {
      localStorage.removeItem('cart_items');
    }
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem('cart_items');
  };

  return (
    <AppContext.Provider
      value={{ cart, addToCart, increment, decrement, remove, clearCart }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };
