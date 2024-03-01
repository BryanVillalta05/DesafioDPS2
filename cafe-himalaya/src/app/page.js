"use client"
import React, { useState } from 'react';
import Navbar from '../components/navbar';
import Store from '../components/store';
import Cart from '../components/cart';
import { data } from '../data/data';

const App = () => {
  const [cart, setCart] = useState([]);

  const add = (prod) => {
    const eitem = cart.find((item) => item.id === prod.id);

    if (eitem) {
      setCart((prevCart) =>
        prevCart.map((item) =>
          item.id === eitem.id ? { ...item, cant: item.cant + 1 } : item
        )
      );
    } else {
      setCart((prevCart) => [...prevCart, { ...prod, cant: 1 }]);
    }
    vercar();
  };

  const remv = (prodid) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== prodid));
  };

  const ucant = (prodid, ncant) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === prodid ? { ...item, cant: parseInt(ncant, 10) } : item
      )
    );
  };
  
  const [cartVisible, setCartVisible] = useState(false);

  const vercar = () => {
    setCartVisible(!cartVisible);
  };
  const cerrcart = () => {
    setCartVisible(false);
  };


  return (
    <div className="app">
      <Navbar vercar={vercar} />
      <div className="content">
        <Store products={data} add={add}  />
        {cartVisible && <Cart cart={cart} remv={remv} ucant={ucant} cerrcart={cerrcart} />}
      </div>
    </div>
  );
};

export default App;