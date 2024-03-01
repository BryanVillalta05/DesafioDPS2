"use client"
import React from 'react';

const Store = ({ products, add }) => {
    return (
        <div className="store">
            {products.map((product) => (
                <div key={product.id} className="product-card">
                    <img src={product.img} alt={product.nom} />
                    <h3>{product.nom}</h3>
                    <p>{product.desc}</p>
                    <p>Precio: ${product.prec}</p>
                    <button onClick={() => add(product)}>Agregar al carrito</button>
                </div>
            ))}
        </div>
    );
};

export default Store;
