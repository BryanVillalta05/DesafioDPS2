"use client"
import React from 'react';

const Cart = ({ cart, remv, ucant, cerrcart }) => {
    const tot = () => {
        return cart.reduce((total, item) => total + item.prec * item.cant, 0).toFixed(2);
    };

    return (
        <div className="cart">
            <h2>Carrito‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ 
                ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ ‎ 
                ‎ ‎ ‎ ‎ ‎ 
            <button onClick={() => cerrcart()}>X</button></h2>
            
            {cart.length === 0 ? (
                <p>El carrito está vacío</p>
            ) : (
                <>
                    {cart.map((item) => (
                        <div key={item.id} className="cart-item">
                            <img src={item.img} alt={item.nom} />
                            <div>
                                <h3>{item.nom}</h3>
                                <p>Precio: ${item.prec}</p>
                                <label>Cantidad:</label>
                                <input
                                    type="number"
                                    min="1"
                                    value={item.cant}
                                    onChange={(e) => ucant(item.id, e.target.value)}
                                />
                                <button onClick={() => remv(item.id)}>Eliminar</button>
                            </div>
                        </div>
                    ))}
                    <div className="total">Total: ${tot()}</div>
                </>
            )}
        </div>
    );
};

export default Cart;
